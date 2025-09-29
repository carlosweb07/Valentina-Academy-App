// src/modules/admin/components/CreateIngredientModal.tsx
import React, { useRef, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import Modal from '../../../../../components/Modal/Modal'
import ApiService from '../../../../../services/Api'
import { BACKEND_ROUTES } from '../../../../../constants/routes'
import { COLORS } from '../../../../../constants/colors'

import styles from './styles'

interface Props {
  visible: boolean
  onClose: () => void
}

export default function CreateModal({ visible, onClose }: Props) {
  const mountedRef = useRef(true)
  React.useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [unit, setUnit] = useState('')
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')

  const onlyFilled = () =>
    name.trim().length > 0 && quantity.trim().length > 0 && unit.trim().length > 0

  const onSubmit = async () => {
    setError('')
    if (!onlyFilled()) {
      setError('Completa todos los campos')
      return
    }
    setCreating(true)
    try {
      const displayName = `${name.trim()} (${quantity.trim()} ${unit.trim()})`
      const resp = await ApiService.post<{ error?: string }>(
        BACKEND_ROUTES.ingredients,
        { name: displayName }
      )
      if ((resp as any)?.error) throw new Error((resp as any).error)
      if (!mountedRef.current) return
      // limpiar formulario
      setName('')
      setQuantity('')
      setUnit('')
      onClose()
    } catch (e: any) {
      console.error('CreateIngredientModal error', e)
      setError(e?.message || 'Error creando ingrediente')
    } finally {
      if (mountedRef.current) setCreating(false)
    }
  }

  if (!visible) return null

  return (
    <Modal showModal={visible} setShowModal={onClose} onClose={onClose}>
      {creating ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.status}>Creando ingrediente...</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.header}>Crear nuevo ingrediente</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Text style={styles.title}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor={COLORS.primaryOpaque}
            value={name}
            onChangeText={t => setName(t)}
          />

          <Text style={styles.title}>Cantidad</Text>
          <TextInput
            style={styles.input}
            placeholder="Cantidad"
            placeholderTextColor={COLORS.primaryOpaque}
            keyboardType="numeric"
            value={quantity}
            onChangeText={t => setQuantity(t)}
          />

          <Text style={styles.title}>Unidad</Text>
          <Picker
            selectedValue={unit}
            style={styles.picker}
            onValueChange={v => setUnit(String(v))}
          >
            <Picker.Item label="-- Unidad --" value="" />
            <Picker.Item label="Gramos (gr)" value="gr" />
            <Picker.Item label="Miligramos (mg)" value="mg" />
            <Picker.Item label="Litros (l)" value="l" />
            <Picker.Item label="Mililitros (ml)" value="ml" />
            <Picker.Item label="Unidades" value="units" />
            <Picker.Item label="Cucharadas" value="cucharadas" />
          </Picker>

          <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={creating}>
            <Text style={styles.btnText}>Crear ingrediente</Text>
          </TouchableOpacity>
        </View>
      )}
    </Modal>
  )
}