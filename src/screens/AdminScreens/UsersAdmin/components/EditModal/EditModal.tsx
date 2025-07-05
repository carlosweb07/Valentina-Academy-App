import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import Modal from '../../../../../components/Modal/Modal'
import ApiService from '../../../../../services/Api'
import { BACKEND_ROUTES } from '../../../../../constants/routes'
import { User } from '../../../../../interfaces/Models'
import { COLORS } from '../../../../../constants/colors'

import styles from './styles'

interface Props {
  visible: boolean
  onClose: () => void
  userId: string | null
}

export default function EditUserModal({ visible, onClose, userId }: Props) {
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState<Partial<User>>({})

  useEffect(() => {
    if (!visible || !userId) return
    let mounted = true
    ;(async () => {
      try {
        const u = await ApiService.get<User>(
          `${BACKEND_ROUTES.users}/${userId}`
        )
        if (!mounted) return
        setUser(u)
      } catch {
        setError('Error cargando usuario')
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [visible, userId])

  const onSubmit = async () => {
    if (!user.username || !user.email) {
      setError('Username y email requeridos')
      return
    }
    setUpdating(true)
    setError('')
    try {
      await ApiService.put(
        `${BACKEND_ROUTES.users}/${userId}`,
        user
      )
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
      {(loading || updating) ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.status}>
            {loading ? 'Cargando...' : 'Actualizando...'}
          </Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.header}>Editar usuario</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={user.username}
            onChangeText={t => setUser(u => ({ ...u, username: t }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={user.email}
            onChangeText={t => setUser(u => ({ ...u, email: t }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={user.first_name}
            onChangeText={t => setUser(u => ({ ...u, first_name: t }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={user.last_name}
            onChangeText={t => setUser(u => ({ ...u, last_name: t }))}
          />
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.btnText}>Guardar cambios</Text>
          </TouchableOpacity>
        </View>
      )}
    </Modal>
  )
}
