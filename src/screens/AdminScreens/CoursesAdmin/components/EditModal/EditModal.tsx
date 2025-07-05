import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Picker } from '@react-native-picker/picker'
import Modal from '../../../../../components/Modal/Modal'
import ApiService from '../../../../../services/Api'
import { BACKEND_ROUTES } from '../../../../../constants/routes'
import { COLORS } from '../../../../../constants/colors'
import { Category, Recipe, User } from '../../../../../interfaces/Models'

import styles from './styles'

interface Props {
  visible: boolean
  onClose: () => void
  courseId: number | null
  categories: Category[]
  users: User[]
  recipes: Recipe[]
}

export default function EditCourseModal({
  visible,
  onClose,
  courseId,
  categories,
  users,
  recipes,
}: Props) {
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState('')
  const [course, setCourse] = useState<any>(null)
  const [mediaUris, setMediaUris] = useState({ cover: '', video: '' })

  useEffect(() => {
    if (!visible || courseId == null) return
    let mounted = true
    ;(async () => {
      try {
        const resp = await ApiService.get<any>(
          `${BACKEND_ROUTES.courses}/${courseId}`
        )
        if (!mounted) return
        setCourse({
          title: resp.title,
          description: resp.description,
          duration: resp.duration,
          price: String(resp.price),
          category: String(resp.category.id),
          user: String(resp.user.id),
          recipe: String(resp.recipe.id),
          mediaId: resp.media.id,
        })
      } catch (e) {
        setError('Error cargando curso')
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [visible, courseId])

  const pickMedia = async (
    type: ImagePicker.MediaTypeOptions,
    key: 'cover' | 'video'
  ) => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!perm.granted) {
      setError('Permiso denegado')
      return
    }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: type })
    if (result.canceled) return
    setMediaUris(u => ({ ...u, [key]: result.assets && result.assets[0]?.uri ? result.assets[0].uri : '' }))
  }

  const onSubmit = async () => {
    if (!course) return
    setUpdating(true)
    try {
      // 1) Actualizar medios si se cambiaron
      if (mediaUris.cover || mediaUris.video) {
        const form = new FormData()
        if (mediaUris.cover)
          form.append('cover', {
            uri: mediaUris.cover,
            name: 'cover.jpg',
            type: 'image/jpeg',
          } as any)
        if (mediaUris.video)
          form.append('video', {
            uri: mediaUris.video,
            name: 'video.mp4',
            type: 'video/mp4',
          } as any)

        const mediaResp = await ApiService.post(
          `${BACKEND_ROUTES.courses_media}/${course.mediaId}`,
          form
        )
        if (mediaResp.error) throw new Error(mediaResp.error)
        course.mediaId = mediaResp.id
      }

      // 2) Patch curso
      const patched = {
        title: course.title,
        description: course.description,
        duration: course.duration,
        price: Number(course.price),
        category: Number(course.category),
        user: Number(course.user),
        recipe: Number(course.recipe),
        media: course.mediaId,
      }
      const resp = await ApiService.put(
        `${BACKEND_ROUTES.courses}/${courseId}`,
        patched
      )
      if (resp.error) throw new Error(resp.error)
      onClose()
    } catch (e: any) {
      setError(e.message || 'Error actualizando')
    } finally {
      setUpdating(false)
    }
  }

  if (!visible) return null

  return (
    <Modal showModal={visible} onClose={onClose}>
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
            value={course.title}
            onChangeText={(t) => setCourse((c: any) => ({ ...c, title: t }))}
          />
          <TextInput
            style={[styles.input, styles.textarea]}
            multiline
            numberOfLines={4}
            value={course.description}
            onChangeText={(t) => setCourse((c: any) => ({ ...c, description: t }))}
          />
          <TextInput
            style={styles.input}
            value={course.duration}
            onChangeText={(t) => setCourse((c: any) => ({ ...c, duration: t }))}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={course.price}
            onChangeText={(t) => setCourse((c: any) => ({ ...c, price: t }))}
          />

          <Picker
            selectedValue={course.category}
            style={styles.picker}
            onValueChange={v => setCourse((c: any) => ({ ...c, category: v }))}
          >
            {categories.map(c => (
              <Picker.Item key={c.id} label={c.name} value={String(c.id)} />
            ))}
          </Picker>

          <Picker
            selectedValue={course.user}
            style={styles.picker}
            onValueChange={v => setCourse((c: any) => ({ ...c, user: v }))}
          >
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
            onPress={() => pickMedia(ImagePicker.MediaTypeOptions.Images, 'cover')}
          >
            <Text style={styles.mediaText}>
              {mediaUris.cover ? 'Carátula nueva' : 'Cambiar carátula'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mediaButton}
            onPress={() => pickMedia(ImagePicker.MediaTypeOptions.Videos, 'video')}
          >
            <Text style={styles.mediaText}>
              {mediaUris.video ? 'Video nuevo' : 'Cambiar video'}
            </Text>
          </TouchableOpacity>

          <Picker
            selectedValue={course.recipe}
            style={styles.picker}
            onValueChange={v => setCourse((c: any) => ({ ...c, recipe: v }))}
          >
            {recipes.map(r => (
              <Picker.Item key={r.id} label={r.name} value={String(r.id)} />
            ))}
          </Picker>

          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>Guardar cambios</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </Modal>
  )
}
