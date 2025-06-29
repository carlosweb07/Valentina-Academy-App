// src/modules/admin/components/CreateIngredientModal.tsx
import React, { useState } from 'react'
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
import { colors } from '../../../../../constants/colors'
import styles from './styles'

interface Props {
  visible: boolean
  onClose: () => void
}

export default function CreateModal({ visible, onClose }: Props) {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [unit, setUnit] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async () => {
    if (!name.trim() || !quantity.trim() || unit === '') {
      setError('Completa todos los campos')
      return
    }
    setLoading(true)
    setError('')
    try {
      const displayName = `${name} (${quantity} ${unit})`
      const resp = await ApiService.post<{ error?: string }>(
        BACKEND_ROUTES.ingredients,
        { name: displayName }
      )
      if (resp.error) throw new Error(resp.error)
      onClose()
    } catch (e: any) {
      setError(e.message || 'Error creando ingrediente')
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
          <Text style={styles.status}>Creando ingrediente...</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.header}>Crear nuevo ingrediente</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor={colors.primaryOpaque}
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Cantidad"
            placeholderTextColor={colors.primaryOpaque}
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
          />

          <Picker
            selectedValue={unit}
            style={styles.picker}
            onValueChange={v => setUnit(v)}
          >
            <Picker.Item label="-- Unidad --" value="" />
            <Picker.Item label="Gramos (gr)" value="gr" />
            <Picker.Item label="Miligramos (mg)" value="mg" />
            <Picker.Item label="Litros (l)" value="l" />
            <Picker.Item label="Mililitros (ml)" value="ml" />
            <Picker.Item label="Unidades" value="" />
            <Picker.Item label="Cucharadas" value="cucharadas" />
          </Picker>

          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.btnText}>Crear ingrediente</Text>
          </TouchableOpacity>
        </View>
      )}
    </Modal>
  )
}
