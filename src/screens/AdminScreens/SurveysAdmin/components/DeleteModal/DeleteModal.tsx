// src/modules/admin/components/DeleteSurveyModal.tsx
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
import { COLORS } from '../../../../../constants/colors'
import type { RootStackParamList } from '../../../../../navigation/types'

import styles from './styles'

interface Props {
  visible: boolean
  onClose: () => void
  surveyId: string | null
}

export default function DeleteSurveyModal({
  visible,
  onClose,
  surveyId,
}: Props) {
  const [deleting, setDeleting] = useState(false)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const handleDelete = async () => {
    if (!surveyId) return
    setDeleting(true)
    try {
      await ApiService.delete(`${BACKEND_ROUTES.surveys}/${surveyId}`)
      onClose()
      navigation.reset({ index: 0, routes: [{ name: 'SurveysAdmin' }] })
    } catch (e) {
      console.warn('Delete error:', e)
      setDeleting(false)
    }
  }

  if (!visible) return null

  return (
    <Modal showModal={visible} onClose={onClose}>
      {deleting ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.status}>Eliminando encuesta...</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.header}>¿Eliminar esta encuesta?</Text>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, styles.cancel]}
              onPress={onClose}
            >
              <Text style={[styles.btnText, styles.cancelText]}>
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.delete]}
              onPress={handleDelete}
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
