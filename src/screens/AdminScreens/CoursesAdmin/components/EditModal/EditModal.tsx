import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Platform,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Picker } from '@react-native-picker/picker'
import Modal from '../../../../../components/Modal/Modal'
import Api from '../../../../../services/Api'
import { BACKEND_ROUTES } from '../../../../../constants/routes'
import { COLORS } from '../../../../../constants/colors'
import mime from 'mime'
import VideoPickerPlayer from '../Multimedia/SelectVideo'
import styles from './styles'
import { Category, Recipe, User, Course, CourseMedia } from '../../../../../interfaces/Models'

interface Props {
  visible: boolean
  onClose: () => void
  courseId: number | null
  categories: Category[]
  users: User[]
  recipes: Recipe[]
  onSuccess: () => void
}

export default function EditCourseModal({
  visible,
  onClose,
  courseId,
  categories,
  users,
  recipes,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState('')
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    duration: '00:00:00',
    price: '',
    category: '',
    user: '',
    recipe: '',
    mediaId: null as number | null,
  })
  const [cover, setCover] = useState<any>(null)
  const [video, setVideo] = useState<any>(null)

  // Reutiliza normalizeFile del Create
  const normalizeFile = (f: any) => {
    if (!f) return null
    let uri = typeof f === 'string' ? f : f.uri
    if (!uri) return null
    if (Platform.OS === 'android' && !uri.startsWith('file://')) uri = 'file://' + uri
    const name = (f?.name || f?.fileName || uri.split('/').pop() || 'file').toString()
    const type = (f?.type || f?.mimeType || mime.getType(name) || (name.endsWith('.mp4') ? 'video/mp4' : name.endsWith('.jpg') || name.endsWith('.jpeg') ? 'image/jpeg' : 'application/octet-stream')).toString()
    return { uri, name, type }
  }

  useEffect(() => {
    if (!visible || courseId == null) return
    let mounted = true
    ;(async () => {
      setLoading(true)
      setError('')
      try {
        // GET course via Api wrapper (no fetch)
        console.log('GET course -> Api.get calling:', `${BACKEND_ROUTES.courses}/${courseId}`)
        const resp = await Api.get<any>(`${BACKEND_ROUTES.courses}/${courseId}`)
        console.log('GET course response raw:', resp)
        if (!mounted) return

        // resp.recipe puede ser objeto, id, o null -> normalizar a string id o ''
        let recipeVal = ''
        if (resp.recipe != null) {
          if (typeof resp.recipe === 'object') {
            recipeVal = String(resp.recipe.id ?? '')
            console.log('resp.recipe is object, normalized recipeVal:', recipeVal, 'raw recipe:', resp.recipe)
          } else {
            recipeVal = String(resp.recipe)
            console.log('resp.recipe is primitive, recipeVal:', recipeVal, 'raw recipe:', resp.recipe)
          }
        } else {
          console.log('resp.recipe is null/undefined, setting recipeVal to empty string')
        }

        setCourseData({
          title: resp.title ?? '',
          description: resp.description ?? '',
          duration: resp.duration ?? '00:00:00',
          price: resp.price != null ? String(resp.price) : '',
          category: resp.category ? String(resp.category.id ?? resp.category) : '',
          user: resp.user ? String(resp.user.id ?? resp.user) : '',
          recipe: recipeVal,
          mediaId: resp.media ? (resp.media.id ?? resp.media) : null,
        })
        console.log('Course data set from GET:', {
          title: resp.title,
          recipeVal,
          mediaId: resp.media ? (resp.media.id ?? resp.media) : null,
        })
      } catch (e: any) {
        console.error('Error loading course (EditCourseModal)', e)
        setError('Error cargando curso. Revisa URL, auth o wrapper Api.')
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [visible, courseId])

  const onImageSelected = (img: any) => {
    // VideoPickerPlayer returns normalized objects in Create; keep same shape
    console.log('Image picked raw (edit):', img)
    const normalizedImage = {
      uri: img.uri,
      name: img.name || img.fileName || img.uri?.split('/').pop(),
      mimeType: img.mimeType || img.type || 'image/jpeg',
      width: img.width,
      height: img.height,
      fileSize: img.fileSize || img.size,
    }
    console.log('Image selected (edit) normalized:', normalizedImage)
    setCover(normalizedImage)
  }

  const onVideoSelected = (vid: any) => {
    console.log('Video picked raw (edit):', vid)
    const normalizedVideo = {
      uri: vid.uri,
      name: vid.name || vid.fileName || vid.uri?.split('/').pop(),
      mimeType: vid.mimeType || vid.type || 'video/mp4',
      size: vid.size || vid.fileSize,
    }
    console.log('Video selected (edit) normalized:', normalizedVideo)
    setVideo(normalizedVideo)
  }

  const uploadMediaIfNeeded = async (): Promise<number | null> => {
    if (!cover && !video) {
      console.log('uploadMediaIfNeeded: no cover or video selected, skipping upload')
      return null
    }

    const c = normalizeFile(cover)
    const v = normalizeFile(video)
    console.log('uploadMediaIfNeeded normalized files:', { cover: c, video: v })
    if (cover && !c) {
      console.error('uploadMediaIfNeeded: cover present but normalization failed', cover)
      throw new Error('Error normalizando carátula')
    }
    if (video && !v) {
      console.error('uploadMediaIfNeeded: video present but normalization failed', video)
      throw new Error('Error normalizando video')
    }

    const form = new FormData()
    if (c) {
      form.append('cover', { uri: c.uri, name: c.name, type: c.type } as any)
    }
    if (v) {
      form.append('video', { uri: v.uri, name: v.name, type: v.type } as any)
    }

    // Intentar mostrar partes de FormData si están disponibles en RN env
    try {
      // @ts-ignore
      if (form && (form as any)._parts) {
        // @ts-ignore
        console.log('FormData parts before upload (approx):', (form as any)._parts)
      } else {
        console.log('FormData created; parts not inspectable on this platform')
      }
    } catch (inspectErr) {
      console.warn('Could not inspect FormData parts', inspectErr)
    }

    console.log('Uploading media to', BACKEND_ROUTES.courses_media, { cover: c?.name, video: v?.name })
    // Api.post must allow FormData (third arg true follows your create usage)
    const mediaResp = await Api.post<CourseMedia>(BACKEND_ROUTES.courses_media, form, true)
    console.log('Media upload response (edit):', mediaResp)
    if (!mediaResp || typeof mediaResp !== 'object') {
      console.error('Media upload returned unexpected value', mediaResp)
      throw new Error('Respuesta inesperada al subir media')
    }
    if (!('id' in mediaResp)) {
      console.error('Media upload response missing id field', mediaResp)
      throw new Error('No se devolvió id del media subido')
    }
    console.log('Media upload succeeded, id:', mediaResp.id)
    return mediaResp.id
  }

  const onSubmit = async () => {
    setError('')
    // Validaciones mínimas (iguales a create si quieres exigir todo)
    if (!courseData.title || !courseData.description || !courseData.duration || !courseData.price || !courseData.category || !courseData.user) {
      setError('Completa los campos obligatorios')
      return
    }

    setUpdating(true)
    try {
      // 1) subir media si el usuario escogió nuevos archivos
      let mediaIdToUse = courseData.mediaId
      if (cover || video) {
        console.log('onSubmit: new cover/video detected, calling uploadMediaIfNeeded')
        const newMediaId = await uploadMediaIfNeeded()
        console.log('onSubmit: uploadMediaIfNeeded returned:', newMediaId)
        if (!newMediaId) {
          console.error('onSubmit: upload returned no id', newMediaId)
          throw new Error('No se recibió id del media subido')
        }
        mediaIdToUse = newMediaId
      } else {
        console.log('onSubmit: no new media, using existing mediaId:', mediaIdToUse)
      }

      // 2) construir payload (partial update) siguiendo Create
      const priceNum = Number(courseData.price)
      const categoryNum = Number(courseData.category)
      const userNum = Number(courseData.user)
      const recipe = courseData.recipe
      console.log('Converted numeric values:', { priceNum, categoryNum, userNum })

      if (isNaN(priceNum) || isNaN(categoryNum) || isNaN(userNum)) {
        console.error('Numeric conversion failed for price/category/user', { priceNum, categoryNum, userNum })
        throw new Error('Campos numéricos inválidos')
      }

      const payload: any = {
        title: courseData.title.trim(),
        description: courseData.description.trim(),
        duration: courseData.duration,
        price: priceNum,
        category: categoryNum,
        user: userNum,
        recipe: recipe,
      }

      // recipe: aceptar string/number/obj; si está vacío omitimos para no tocarla
      console.log('PATCH payload (edit):', payload, 'to', `${BACKEND_ROUTES.courses}/${courseId}`)
      // 3) PATCH al curso (partial). Usa Api.patch si lo tienes; si no, Api.put puede usarse pero requerirá todos los campos.
      const resp = await Api.put<{ course: Course }>(`${BACKEND_ROUTES.courses}/${courseId}`, payload)
      console.log('Course update response (edit):', resp)
      if (!resp || typeof resp !== 'object') {
        console.error('Unexpected response from course update', resp)
        throw new Error('Respuesta inesperada del servidor al actualizar curso')
      }
      if (!('course' in resp)) {
        console.error('Response missing course property', resp)
        throw new Error('No se devolvió el curso actualizado')
      }

      // éxito: limpiar estado y notificar
      console.log('Course updated successfully:', resp.course)
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
        mediaId: null,
      })
      onClose()
      onSuccess()
    } catch (e: any) {
      console.error('Submit error (edit)', e)
      setError(e.message || 'Error actualizando curso')
    } finally {
      setUpdating(false)
    }
  }

  if (!visible) return null

  return (
    <Modal showModal={visible} setShowModal={onClose} onClose={onClose}>
      <Text style={styles.header}>Editar curso</Text>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : updating ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.statusText}>Actualizando curso...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.form}>
          {error ? <Text style={styles.error}>{error}</Text> : null}

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
              <Picker.Item key={u.id} label={`${u.first_name} ${u.last_name}`} value={String(u.id)} />
            ))}
          </Picker>

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
              console.log('Parent received image:', normalizedImage)
              setCover(normalizedImage)
            }}
            onVideoSelected={(vid) => {
              const normalizedVideo = {
                uri: vid.uri,
                name: vid.name || vid.fileName || vid.uri?.split('/').pop(),
                mimeType: vid.mimeType || vid.type || 'video/mp4',
                size: vid.size || vid.fileSize,
              }
              console.log('Parent received video:', normalizedVideo)
              setVideo(normalizedVideo)
            }}
            disabled={updating}
          />

          <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={updating}>
            <Text style={styles.buttonText}>Guardar cambios</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </Modal>
  )
}
