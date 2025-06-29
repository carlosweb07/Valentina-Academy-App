import React, { useState } from 'react'
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
import { colors } from '../../../../../constants/colors'

import styles from './styles'

interface Props {
  visible: boolean
  onClose: () => void
}

export default function CreateUserModal({ visible, onClose }: Props) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async () => {
    if (!username || !email || !first || !last || !password) {
      setError('Completa todos los campos')
      return
    }
    setLoading(true)
    setError('')
    try {
      await ApiService.post(BACKEND_ROUTES.users, {
        username,
        email,
        first_name: first,
        last_name: last,
        password,
      })
      onClose()
    } catch (e: any) {
      setError(e.message || 'Error creando usuario')
    } finally {
      setLoading(false)
    }
  }

  if (!visible) return null

  return (
    <Modal showModal={visible} onClose={onClose}>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.status}>Creando usuario...</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.header}>Crear usuario</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor={colors.primaryOpaque}
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.primaryOpaque}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor={colors.primaryOpaque}
            value={first}
            onChangeText={setFirst}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            placeholderTextColor={colors.primaryOpaque}
            value={last}
            onChangeText={setLast}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor={colors.primaryOpaque}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.btnText}>Crear usuario</Text>
          </TouchableOpacity>
        </View>
      )}
    </Modal>
  )
}
