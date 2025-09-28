import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Picker } from '@react-native-picker/picker'
import Modal from '../../../../../components/Modal/Modal'
import ApiService from '../../../../../services/Api'
import { BACKEND_ROUTES } from '../../../../../constants/routes'
import { COLORS } from '../../../../../constants/colors'

import styles from './styles'
import { Category, Recipe, User } from '../../../../../interfaces/Models'

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
  const [coverUri, setCoverUri] = useState<string | null>(null)
  const [videoUri, setVideoUri] = useState<string | null>(null)
  const [error, setError] = useState('')

  // Limpiar formulario al cerrar modal
  useEffect(() => {
    if (!visible) {
      setCourseData({
        title: '',
        description: '',
        duration: '00:00:00',
        price: '',
        category: '',
        user: '',
        recipe: '',
      })
      setCoverUri(null)
      setVideoUri(null)
      setError('')
    }
  }, [visible])

  // Validación mejorada
  const validateFields = () => {
    if (
      !courseData.title ||
      !courseData.description ||
      !courseData.duration ||
      !courseData.price ||
      !courseData.category ||
      !courseData.user ||
      !courseData.recipe
      // !coverUri ||
      // !videoUri
    ) {
      setError('Completa todos los campos')
      return false
    }
    // Validar duración formato HH:MM:SS
    if (!/^\d{2}:\d{2}:\d{2}$/.test(courseData.duration)) {
      setError('La duración debe tener formato HH:MM:SS')
      return false
    }
    // Validar precio positivo
    if (isNaN(Number(courseData.price)) || Number(courseData.price) <= 0) {
      setError('El precio debe ser un número positivo')
      return false
    }
    setError('')
    return true
  }

  // Nuevo método para seleccionar imagen o video
  const pickImageOrVideo = async (
    type: 'image' | 'video',
    setter: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    setError('')
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!permissionResult.granted) {
      setError('Permiso denegado para acceder a la galería')
      return
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: type === 'image' ? ImagePicker.mediaType.Images : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    })

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setter(result.assets[0].uri)
    } else if (!result.canceled) {
      setError('No se pudo obtener el archivo seleccionado')
    }
  }

  const onSubmit = async () => {
    if (!validateFields()) return

    setCreating(true)
    try {
      // 1) Media upload
      const mediaForm = new FormData()
      if (coverUri) {
        mediaForm.append('cover', {
          uri: coverUri,
          name: 'cover.jpg',
          type: 'image/jpeg',
        } as any)
      }
      if (videoUri) {
        mediaForm.append('video', {
          uri: videoUri,
          name: 'video.mp4',
          type: 'video/mp4',
        } as any)
      }

      const mediaResp = await ApiService.post(
        BACKEND_ROUTES.courses_media,
        mediaForm
      ) as { id: number; error?: string }
      if (mediaResp.error) throw new Error(mediaResp.error)


      // 2) Create course
      const body = {
        ...courseData,
        category: Number(courseData.category),
        user: Number(courseData.user),
        recipe: Number(courseData.recipe),
        media: mediaResp.id,
      }
      const courseResp = await ApiService.post(
        BACKEND_ROUTES.courses,
        body
      ) as { id: number; error?: string }
      if (courseResp.error) throw new Error(courseResp.error)

      onClose()
    } catch (e: any) {
      setError(e.message || 'Error creando curso')
    } finally {
      setCreating(false)
    }
  }

  const renderForm = () => (
    <ScrollView contentContainerStyle={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        placeholderTextColor={COLORS.primaryOpaque}
        value={courseData.title}
        onChangeText={t => setCourseData(d => ({ ...d, title: t }))}
      />
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Descripción"
        placeholderTextColor={COLORS.primaryOpaque}
        multiline
        numberOfLines={4}
        value={courseData.description}
        onChangeText={t => setCourseData(d => ({ ...d, description: t }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Duración (HH:MM:SS)"
        placeholderTextColor={COLORS.primaryOpaque}
        value={courseData.duration}
        onChangeText={t => setCourseData(d => ({ ...d, duration: t }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio ($)"
        placeholderTextColor={COLORS.primaryOpaque}
        keyboardType="numeric"
        value={courseData.price}
        onChangeText={t => setCourseData(d => ({ ...d, price: t }))}
      />

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

      <TouchableOpacity
        style={styles.mediaButton}
        onPress={() => pickImageOrVideo('image', setCoverUri)}
        disabled={creating}
      >
        <Text style={styles.mediaText}>
          {coverUri ? 'Carátula seleccionada' : 'Selecciona carátula'}
        </Text>
        {coverUri && (
          <Image
            source={{ uri: coverUri }}
            style={{ width: 80, height: 80, marginTop: 8, borderRadius: 8 }}
          />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.mediaButton}
        onPress={() => pickImageOrVideo('video', setVideoUri)}
        disabled={creating}
      >
        <Text style={styles.mediaText}>
          {videoUri ? 'Vídeo seleccionado' : 'Selecciona vídeo'}
        </Text>
        {videoUri && (
          <Text style={{ fontSize: 12, color: COLORS.primaryOpaque, marginTop: 4 }}>
            {videoUri.split('/').pop()}
          </Text>
        )}
      </TouchableOpacity>

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

      {error ? <Text style={[styles.error, { marginVertical: 8 }]}>{error}</Text> : null}

      <TouchableOpacity
        style={[styles.button, creating && { opacity: 0.5 }]}
        onPress={onSubmit}
        disabled={creating}
      >
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
    <Modal showModal={visible} onClose={onClose}>
      <Text style={styles.header}>Crear nuevo curso</Text>
      {creating ? renderLoading() : renderForm()}
    </Modal>
  )
}