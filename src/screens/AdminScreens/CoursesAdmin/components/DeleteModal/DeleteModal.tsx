// src/modules/admin/components/DeleteCourseModal.tsx
import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import Modal from '../../../../../components/Modal/Modal'
import ApiService from '../../../../../services/Api'
import { BACKEND_ROUTES } from '../../../../../constants/routes'
import { colors } from '../../../../../constants/colors'
import type { RootStackParamList } from '../../../../../navigation/types'

import styles from './styles'

interface Props {
  visible: boolean
  onClose: () => void
  courseId: number | null
}

export default function DeleteCourseModal({
  visible,
  onClose,
  courseId,
}: Props) {
  const [deleting, setDeleting] = useState(false)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const onDelete = async () => {
    if (courseId == null) return
    setDeleting(true)
    try {
      await ApiService.delete(`${BACKEND_ROUTES.courses}/${courseId}`)
      onClose()
      navigation.reset({
        index: 0,
        routes: [{ name: 'CoursesAdmin' }],
      })
    } catch (e) {
      console.warn('Delete error:', e)
      setDeleting(false)
    }
  }

  return (
    <Modal showModal={visible} onClose={onClose}>
      {deleting ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.statusText}>Eliminando curso...</Text>
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.header}>¿Eliminar este curso?</Text>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, styles.cancelBtn]}
              onPress={onClose}
            >
              <Text style={[styles.btnText, styles.cancelText]}>
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.deleteBtn]}
              onPress={onDelete}
            >
              <Text style={[styles.btnText, styles.deleteText]}>
                Eliminar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Modal>
  )
}
