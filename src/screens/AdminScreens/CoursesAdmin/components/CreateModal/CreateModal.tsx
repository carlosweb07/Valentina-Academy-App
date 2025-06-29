// src/modules/admin/components/CreateCourseModal.tsx
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
import * as ImagePicker from 'expo-image-picker'
import { Picker } from '@react-native-picker/picker'
import Modal from '../../../../../components/Modal/Modal'
import ApiService from '../../../../../services/Api'
import { BACKEND_ROUTES } from '../../../../../constants/routes'
import { colors } from '../../../../../constants/colors'

import styles from './styles'
import { Category, Recipe, User } from '../../../../../interfaces/App'

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

  const pickMedia = async (
    mediaTypes: ImagePicker.MediaTypeOptions,
    setter: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!perm.granted) {
      setError('Permiso denegado')
      return
    }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes })
    if (!result.canceled) setter(result.assets[0].uri)
  }

  const onSubmit = async () => {
    if (
      !courseData.title ||
      !courseData.description ||
      !courseData.duration ||
      !courseData.price ||
      !courseData.category ||
      !courseData.user ||
      !courseData.recipe ||
      !coverUri ||
      !videoUri
    ) {
      setError('Completa todos los campos')
      return
    }

    setCreating(true)
    try {
      // 1) Media upload
      const mediaForm = new FormData()
      mediaForm.append('cover', {
        uri: coverUri,
        name: 'cover.jpg',
        type: 'image/jpeg',
      } as any)
      mediaForm.append('video', {
        uri: videoUri,
        name: 'video.mp4',
        type: 'video/mp4',
      } as any)

      const mediaResp = await ApiService.post(
        BACKEND_ROUTES.courses_media,
        mediaForm
      )
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
      )
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
        placeholderTextColor={colors.primaryOpaque}
        value={courseData.title}
        onChangeText={t => setCourseData(d => ({ ...d, title: t }))}
      />
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Descripción"
        placeholderTextColor={colors.primaryOpaque}
        multiline
        numberOfLines={4}
        value={courseData.description}
        onChangeText={t => setCourseData(d => ({ ...d, description: t }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Duración (HH:MM:SS)"
        placeholderTextColor={colors.primaryOpaque}
        value={courseData.duration}
        onChangeText={t => setCourseData(d => ({ ...d, duration: t }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio ($)"
        placeholderTextColor={colors.primaryOpaque}
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
        onPress={() => pickMedia(ImagePicker.MediaTypeOptions.Images, setCoverUri)}
      >
        <Text style={styles.mediaText}>
          {coverUri ? 'Carátula seleccionada' : 'Selecciona carátula'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.mediaButton}
        onPress={() => pickMedia(ImagePicker.MediaTypeOptions.Videos, setVideoUri)}
      >
        <Text style={styles.mediaText}>
          {videoUri ? 'Vídeo seleccionado' : 'Selecciona vídeo'}
        </Text>
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

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Crear Curso</Text>
      </TouchableOpacity>
    </ScrollView>
  )

  const renderLoading = () => (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={colors.primary} />
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
