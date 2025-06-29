// src/modules/admin/components/EditIngredientModal.tsx
import React, { useState, useEffect } from 'react'
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
  ingredientId: string | null
}

export default function EditIngredientModal({
  visible,
  onClose,
  ingredientId,
}: Props) {
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [unit, setUnit] = useState('')

  useEffect(() => {
    if (!visible || !ingredientId) return
    let mounted = true
    ;(async () => {
      try {
        const resp = await ApiService.get<{ name: string }>(
          `${BACKEND_ROUTES.ingredients}/${ingredientId}`
        )
        if (!mounted) return
        // parse "Name (quantity unit)"
        const [base, rest] = resp.name.split('(')
        setName(base.trim())
        if (rest) {
          const parts = rest.replace(')', '').split(' ')
          setQuantity(parts[0] || '')
          setUnit(parts[1] || '')
        }
      } catch {
        setError('Error al cargar')
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [visible, ingredientId])

  const onSubmit = async () => {
    if (!name.trim() || !quantity.trim() || unit === '') {
      setError('Completa todos los campos')
      return
    }
    setUpdating(true)
    setError('')
    try {
      const displayName = `${name.trim()} (${quantity.trim()} ${unit})`
      const resp = await ApiService.put<{ error?: string }>(
        `${BACKEND_ROUTES.ingredients}/${ingredientId}`,
        { name: displayName }
      )
      if (resp.error) throw new Error(resp.error)
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
      {loading || updating ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.status}>
            {loading ? 'Cargando...' : 'Actualizando...'}
          </Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.header}>Editar ingrediente</Text>
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
            <Text style={styles.btnText}>Guardar cambios</Text>
          </TouchableOpacity>
        </View>
      )}
    </Modal>
  )
}
