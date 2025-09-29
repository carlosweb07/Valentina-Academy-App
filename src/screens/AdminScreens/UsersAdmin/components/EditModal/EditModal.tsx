import React, { useEffect, useState, useRef } from 'react'
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import Modal from '../../../../../components/Modal/Modal'
import ApiService from '../../../../../services/Api'
import { BACKEND_ROUTES } from '../../../../../constants/routes'
import { COLORS } from '../../../../../constants/colors'
import { ROLES } from '../../../../../constants/roles'
import styles from './styles'

interface Props {
  visible: boolean
  onClose: () => void
  userId: number | null
}

export default function EditUserModal({ visible, onClose, userId }: Props) {
  const mountedRef = useRef(true)
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    role: '',
  })
  const originalRef = useRef<typeof data | null>(null)

  useEffect(() => {
    if (!visible || userId == null) return
    let mounted = true
    ;(async () => {
      setLoading(true)
      setError('')
      try {
        const resp = await ApiService.get<any>(`${BACKEND_ROUTES.roles}/${userId}`)
        if (!mounted) return
        const loaded = {
          username: resp.user.username ?? '',
          first_name: resp.user.first_name ?? '',
          last_name: resp.user.last_name ?? '',
          email: resp.user.email ?? '',
          role: resp.role,
        }
        originalRef.current = loaded
        setData(loaded)
      } catch (e) {
        console.error('EditUserModal load error', e)
        setError('Error cargando usuario')
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [visible, userId])

  const buildPatchPayload = () => {
    const orig = originalRef.current
    if (!orig) return null
    const patch: Record<string, any> = {}
    if (data.username !== orig.username) patch.username = data.username.trim()
    if (data.first_name !== orig.first_name) patch.first_name = data.first_name.trim()
    if (data.last_name !== orig.last_name) patch.last_name = data.last_name.trim()
    if (data.email !== orig.email) patch.email = data.email.trim()
    if (String(data.role) !== String(orig.role)) {
      // send number if original was number-like
      patch.role = isNaN(Number(orig.role)) ? data.role : Number(data.role)
    }
    return { patch, totalFields: Object.keys(orig).length }
  }

  const onSubmit = async () => {
    
    setError('')
    if (userId == null) {
      setError('Usuario inválido')
      return
    }
    
    const built = buildPatchPayload()

    if (!built) {
      setError('No se pudo construir la actualización')
      return
    }
    const { patch, totalFields } = built
    const changedCount = Object.keys(patch).length

    if (changedCount === 0) {
      setError('No hay cambios para guardar')
      return
    }

    // Disallow full replace: if user changed every editable field, require a different flow (PUT)
    if (changedCount === totalFields) {
      setError('No se permite reemplazar todos los campos. Usa la acción de reemplazo completa si es necesario')
      return
    }

    setUpdating(true)
    try {
      const resp = await ApiService.patch(`${BACKEND_ROUTES.users}/${userId}`, patch)

      if (resp && typeof resp === 'object' && !('id' in resp) && !('username' in resp)) {
        const entries = Object.entries(resp)
        if (entries.length > 0 && Array.isArray(entries[0][1])) {
          const firstField = entries[0][0]
          const firstMsgs = entries[0][1] as string[]
          throw new Error(`${firstField}: ${firstMsgs.join(' ')}`)
        }
      }

      if (!mountedRef.current) return
      onClose()
    } catch (e: any) {
      console.error('EditUserModal submit error', e)
      setError(e?.message || 'Error actualizando usuario')
    } finally {
      if (mountedRef.current) setUpdating(false)
    }
  }

  if (!visible) return null

  return (
    <Modal showModal={visible} setShowModal={onClose} onClose={onClose}>
      <Text style={styles.header}>Editar usuario</Text>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : updating ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.statusText}>Actualizando usuario...</Text>
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
            onChangeText={t => setData(d => ({ ...d, username: t }))}
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
            onChangeText={t => setData(d => ({ ...d, email: t }))}
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
                <Picker.Item key={r} label={ROLES[r].translate} value={String(r)} />
              ))}
            </Picker>
          </View>

          <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={updating}>
            <Text style={styles.buttonText}>Guardar cambios</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </Modal>
  )
}