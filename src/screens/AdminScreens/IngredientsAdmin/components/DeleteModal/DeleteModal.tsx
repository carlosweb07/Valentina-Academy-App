// src/modules/admin/components/DeleteIngredientModal.tsx
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

import styles from './style'

interface Props {
  visible: boolean
  onClose: () => void
  ingredientId: string | null
}

export default function DeleteIngredientModal({
  visible,
  onClose,
  ingredientId,
}: Props) {
  const [deleting, setDeleting] = useState(false)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const handleDelete = async () => {
    if (!ingredientId) return
    setDeleting(true)
    try {
      await ApiService.delete(`${BACKEND_ROUTES.ingredients}/${ingredientId}`)
      onClose()
      navigation.reset({ index: 0, routes: [{ name: 'IngredientsAdmin' }] })
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
          <Text style={styles.status}>Eliminando ingrediente...</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.header}>¿Eliminar ingrediente?</Text>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, styles.cancel]}
              onPress={onClose}
            >
              <Text style={[styles.btnText, styles.cancelText]}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.delete]}
              onPress={handleDelete}
            >
              <Text style={[styles.btnText, styles.deleteText]}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Modal>
  )
}
