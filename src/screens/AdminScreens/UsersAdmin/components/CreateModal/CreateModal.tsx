// src/screens/UsersAdmin/components/CreateModal/CreateModal.tsx
import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import Modal from '../../../../../components/Modal/Modal'
import ApiService from '../../../../../services/Api'
import { BACKEND_ROUTES } from '../../../../../constants/routes'
import { COLORS } from '../../../../../constants/colors'
import styles from './styles'
import { ROLES } from '../../../../../constants/roles'

interface Props {
  visible: boolean
  onClose: () => void
}

export default function CreateUserModal({ visible, onClose }: Props) {
  const mountedRef = useRef(true)
  React.useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    role: '',
    password: '',
  })

  const onlyFilled = () =>
    data.username.trim() &&
    data.first_name.trim() &&
    data.last_name.trim() &&
    data.email.trim() &&
    data.role &&
    data.password

  const onSubmit = async () => {
    setError('')
    if (!onlyFilled()) {
      setError('Completa todos los campos obligatorios')
      return
    }

    setCreating(true)
    try {
      const payload = {
        username: data.username,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        role: data.role,
        password: data.password,
      }
      await ApiService.post(BACKEND_ROUTES.users, payload)
      if (!mountedRef.current) return
      setData({ username: '', first_name: '', last_name: '', email: '', role: '', password: '' })
      onClose()
    } catch (e: any) {
      console.error('CreateUserModal error', e)
      setError(e?.message || 'Error creando usuario')
    } finally {
      if (mountedRef.current) setCreating(false)
    }
  }

  if (!visible) return null

  return (
    <Modal showModal={visible} setShowModal={onClose} onClose={onClose}>
      <Text style={styles.header}>Crear usuario</Text>
      {creating ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Creando usuario...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.form}>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Text style={styles.tittle}>Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="username"
            placeholderTextColor={COLORS.primaryOpaque}
            value={data.username}
            onChangeText={t => setData(d => ({ ...d, username: t.trim() }))}
            autoCapitalize="none"
          />

          <Text style={styles.tittle}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor={COLORS.primaryOpaque}
            value={data.first_name}
            onChangeText={t => setData(d => ({ ...d, first_name: t }))}
          />

          <Text style={styles.tittle}>Apellido</Text>
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            placeholderTextColor={COLORS.primaryOpaque}
            value={data.last_name}
            onChangeText={t => setData(d => ({ ...d, last_name: t }))}
          />

          <Text style={styles.tittle}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="email"
            placeholderTextColor={COLORS.primaryOpaque}
            keyboardType="email-address"
            value={data.email}
            onChangeText={t => setData(d => ({ ...d, email: t.trim() }))}
            autoCapitalize="none"
          />

          <Text style={styles.tittle}>Rol</Text>
          <View style={styles.Viewpicker}>
            <Picker
              selectedValue={data.role}
              style={styles.picker}
              onValueChange={v => setData(d => ({ ...d, role: String(v) }))}
            >
              <Picker.Item label="-- Rol --" value="" />
              {Object.keys(ROLES).map((r: any) => (
                <Picker.Item key={r} label={ROLES[r].translate} value={r} />
              ))}
            </Picker>
          </View>

          <Text style={styles.tittle}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="password"
            placeholderTextColor={COLORS.primaryOpaque}
            secureTextEntry
            value={data.password}
            onChangeText={t => setData(d => ({ ...d, password: t.trim() }))}
          />

          <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={creating}>
            <Text style={styles.buttonText}>Crear usuario</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </Modal>
  )
}