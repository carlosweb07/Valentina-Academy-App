import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Platform,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import Modal from '../../../../../components/Modal/Modal'
import { BACKEND_ROUTES } from '../../../../../constants/routes'
import { COLORS } from '../../../../../constants/colors'
import mime from 'mime'
import VideoPickerPlayer from '../Multimedia/SelectVideo'
import styles from './styles'
import { Category, Course, CourseMedia, Recipe, User } from '../../../../../interfaces/Models'
import Api, { ApiService } from '../../../../../services/Api'

interface Props {
  visible: boolean
  onClose: () => void
  categories: Category[]
  users: User[]
  recipes: Recipe[]
}

export default function CreateModal({
  visible,
  onClose,
  categories,
  users,
  recipes,
}: Props) {
  const [creating, setCreating] = useState(false)
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    duration: '00:00:00',
    price: '',
    category: '',
    user: '',
    recipe: '',
  })
  const [cover, setCover] = useState<any>(null)
  const [video, setVideo] = useState<any>(null)
  const [error, setError] = useState('')

  const normalizeFile = (f: any) => {
    if (!f) return null
    let uri = f.uri
    if (!uri) return null

    if (Platform.OS === 'android' && !uri.startsWith('file://')) {
      uri = 'file://' + uri
    }

    const name = f.name || f.fileName || f.file || uri.split('/').pop() || 'file'
    const type =
      f.mimeType ||
      f.type ||
      mime.getType(name) ||
      (name.endsWith('.mp4') ? 'video/mp4' : name.endsWith('.jpg') || name.endsWith('.jpeg') ? 'image/jpeg' : 'application/octet-stream')

    return { uri, name, type }
  }

  const onSubmit = async () => {
    setError('')
  
    if (
      !courseData.title ||
      !courseData.description ||
      !courseData.duration ||
      !courseData.price ||
      !courseData.category ||
      !courseData.user ||
      !courseData.recipe
    ) {
      setError('Completa todos los campos')
      return
    }
  
    if (!cover || !video) {
      setError('Selecciona imagen y video')
      return
    }
  
    // normalizador más estricto (usa tu normalizeFile si quieres, pero asegúrate name/type/uri)
    const normalizeFileStrict = (f: any) => {
      if (!f || !f.uri) return null
      let uri: string = f.uri
      if (Platform.OS === 'android' && !uri.startsWith('file://')) uri = 'file://' + uri
      const name = (f.name || f.fileName || f.file || uri.split('/').pop() || 'file').toString()
      const type = (f.type || f.mimeType || mime.getType(name) || 'application/octet-stream').toString()
      return { uri, name, type }
    }
  
    setCreating(true)
    try {
      // 1) Normalizar archivos
      const c = normalizeFileStrict(cover)
      const v = normalizeFileStrict(video)
      if (!c || !v) throw new Error('Error normalizando archivos seleccionados')
  
      // 2) Construir FormData para /courses_media con las claves exactas que tu backend usa
      const mediaForm = new FormData()

      mediaForm.append('cover', {
        uri: c.uri,
        name: c.name,
        type: c.type,
      } as any)

      mediaForm.append('video', {
        uri: v.uri,
        name: v.name,
        type: v.type,
      } as any)
  
      // 3) Subir media (manteniendo tu fetch)
      const media = await Api.post<CourseMedia>(BACKEND_ROUTES.courses_media, mediaForm, true)
  
      const mediaId = media?.id
      if (!mediaId) {
        console.error('courses_media did not return id', media)
        throw new Error('No media id returned from server')
      }
  
      // 4) Construir payload para /courses (convertir strings a number donde corresponde)
      const priceNum = Number(courseData.price)
      const categoryNum = Number(courseData.category)
      const userNum = Number(courseData.user)
      const recipe = courseData.recipe
  
      if (isNaN(priceNum) || isNaN(categoryNum) || isNaN(userNum)) {
        throw new Error('Campos numéricos inválidos')
      }
  
      const payload = {
        title: courseData.title.trim(),
        description: courseData.description.trim(),
        duration: courseData.duration, // asegúrate que sea "HH:MM:SS" si tu modelo usa TimeField
        price: priceNum,
        category: categoryNum,
        user: userNum,
        recipe: recipe,
        media: mediaId,
      }
  
      // 5) Crear course (JSON)
      await Api.post<{ course: Course }>(BACKEND_ROUTES.courses, payload)
      // limpiar estado y cerrar modal
      setCover(null)
      setVideo(null)
      setCourseData({
        title: '',
        description: '',
        duration: '00:00:00',
        price: '',
        category: '',
        user: '',
        recipe: '',
      })
      onClose()
    } catch (e: any) {
      console.error('Submit error', e)
      setError(e.message || 'Error creando curso')
    } finally {
      setCreating(false)
    }
  }
  

  const renderForm = () => (
    <ScrollView contentContainerStyle={styles.form}>
      <Text style={styles.tittle}>Título</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={COLORS.primaryOpaque}
        value={courseData.title}
        onChangeText={t => setCourseData(d => ({ ...d, title: t }))}
      />
      <Text style={styles.tittle}>description</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholderTextColor={COLORS.primaryOpaque}
        multiline
        numberOfLines={4}
        value={courseData.description}
        onChangeText={t => setCourseData(d => ({ ...d, description: t }))}
      />
      <Text style={styles.tittle}>duration</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={COLORS.primaryOpaque}
        value={courseData.duration}
        onChangeText={t => setCourseData(d => ({ ...d, duration: t }))}
      />
      <Text style={styles.tittle}>price</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={COLORS.primaryOpaque}
        keyboardType="numeric"
        value={courseData.price}
        onChangeText={t => setCourseData(d => ({ ...d, price: t }))}
      />
      <Text style={styles.tittle}>Categoría</Text>
      <View style={styles.Viewpicker}>
      <Picker
        selectedValue={courseData.category}
        style={styles.picker}
        onValueChange={v => setCourseData(d => ({ ...d, category: v }))}
        >
        <Picker.Item label="-- Categoría --" value="" />
        {categories.map(c => (
          <Picker.Item key={c.id} label={c.name} value={String(c.id)} />
        ))}
      </Picker>
      </View>
      <Text style={styles.tittle}>Autor</Text>
      <View style={styles.Viewpicker}>
      <Picker
        selectedValue={courseData.user}
        style={styles.picker}
        onValueChange={v => setCourseData(d => ({ ...d, user: v }))}
        >
        <Picker.Item label="-- Autor --" value="" />
        {users.map(u => (
          <Picker.Item
          key={u.id}
          label={`${u.first_name} ${u.last_name}`}
          value={String(u.id)}
          />
        ))}
      </Picker>
      </View>
      <Text style={styles.tittle}>Receta</Text>
      <View style={styles.Viewpicker}>
      <Picker
        selectedValue={courseData.recipe}
        style={styles.picker}
        onValueChange={v => setCourseData(d => ({ ...d, recipe: v }))}
        >
        <Picker.Item label="-- Receta --" value="" />
        {recipes.map(r => (
          <Picker.Item key={r.id} label={r.name} value={String(r.id)} />
        ))}
      </Picker>
      </View>

      <VideoPickerPlayer
        onImageSelected={(img) => {
          const normalizedImage = {
            uri: img.uri,
            fileName: img.name || img.fileName || img.uri?.split('/').pop(),
            mimeType: img.mimeType || img.type || 'image/jpeg',
            width: img.width,
            height: img.height,
            fileSize: img.fileSize || img.size,
          }
          setCover(normalizedImage)
        }}
        onVideoSelected={(vid) => {
          const normalizedVideo = {
            uri: vid.uri,
            name: vid.name || vid.fileName || vid.uri?.split('/').pop(),
            mimeType: vid.mimeType || vid.type || 'video/mp4',
            size: vid.size || vid.fileSize,
          }
          setVideo(normalizedVideo)
        }}
        disabled={creating}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={creating}>
        <Text style={styles.buttonText}>Crear Curso</Text>
      </TouchableOpacity>
    </ScrollView>
  )

  const renderLoading = () => (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.loadingText}>Creando curso...</Text>
    </View>
  )

  return (
    <Modal showModal={visible} setShowModal={onClose} onClose={onClose}>
      <Text style={styles.header}>Crear nuevo curso</Text>
      {creating ? renderLoading() : renderForm()}
    </Modal>
  )
}
