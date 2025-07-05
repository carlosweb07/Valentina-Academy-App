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
  userId: string | null
}

export default function DeleteUserModal({
  visible,
  onClose,
  userId,
}: Props) {
  const [deleting, setDeleting] = useState(false)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const handleDelete = async () => {
    if (!userId) return
    setDeleting(true)
    try {
      await ApiService.delete(`${BACKEND_ROUTES.users}/${userId}`)
      onClose()
      navigation.reset({ index: 0, routes: [{ name: 'UsersAdmin' }] })
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
          <Text style={styles.status}>Eliminando usuario...</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.header}>¿Eliminar este usuario?</Text>
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
