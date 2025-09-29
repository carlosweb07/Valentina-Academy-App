// src/modules/admin/components/EditIngredientModal.tsx
import React, { useEffect, useRef, useState } from 'react'
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
  ingredientId: string | null
}

export default function EditIngredientModal({
  visible,
  onClose,
  ingredientId,
}: Props) {
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
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [unit, setUnit] = useState('')

  useEffect(() => {
    if (!visible || !ingredientId) return
    let mounted = true
    ;(async () => {
      setLoading(true)
      setError('')
      try {
        const resp = await ApiService.get<{ name: string }>(
          `${BACKEND_ROUTES.ingredients}/${ingredientId}`
        )
        if (!mounted) return
        const raw = resp?.name ?? ''
        // parse "Name (quantity unit)" safely
        const openIdx = raw.indexOf('(')
        const closeIdx = raw.indexOf(')', openIdx + 1)
        let base = raw
        let inside = ''
        if (openIdx !== -1 && closeIdx !== -1) {
          base = raw.slice(0, openIdx).trim()
          inside = raw.slice(openIdx + 1, closeIdx).trim()
        } else {
          base = raw.trim()
        }
        let qty = ''
        let un = ''
        if (inside) {
          const parts = inside.split(/\s+/)
          qty = parts[0] ?? ''
          un = parts.slice(1).join(' ') ?? ''
        }
        if (mountedRef.current) {
          setName(base)
          setQuantity(qty)
          setUnit(un)
        }
      } catch (e) {
        console.error('EditIngredientModal load error', e)
        if (mountedRef.current) setError('Error al cargar')
      } finally {
        if (mountedRef.current) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [visible, ingredientId])

  const onlyFilled = () =>
    name.trim().length > 0 && quantity.trim().length > 0 && unit.trim().length > 0

  const onSubmit = async () => {
    setError('')
    if (!onlyFilled()) {
      setError('Completa todos los campos')
      return
    }
    if (!ingredientId) {
      setError('Ingrediente inválido')
      return
    }
    setUpdating(true)
    try {
      const displayName = `${name.trim()} (${quantity.trim()} ${unit.trim()})`
      // usar PATCH para actualización parcial; cambia a PUT si tu API lo requiere
      const resp = await ApiService.patch<{ error?: string }>(
        `${BACKEND_ROUTES.ingredients}/${ingredientId}`,
        { name: displayName }
      )
      if ((resp as any)?.error) throw new Error((resp as any).error)
      if (!mountedRef.current) return
      onClose()
    } catch (e: any) {
      console.error('EditIngredientModal submit error', e)
      if (mountedRef.current) setError(e?.message || 'Error actualizando')
    } finally {
      if (mountedRef.current) setUpdating(false)
    }
  }

  if (!visible) return null

  return (
    <Modal showModal={visible} setShowModal={onClose} onClose={onClose}>
      {loading || updating ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.status}>
            {loading ? 'Cargando...' : 'Actualizando...'}
          </Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.header}>Editar ingrediente</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Text style={styles.title}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor={COLORS.primaryOpaque}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.title}>Cantidad</Text>
          <TextInput
            style={styles.input}
            placeholder="Cantidad"
            placeholderTextColor={COLORS.primaryOpaque}
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
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

          <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={updating}>
            <Text style={styles.btnText}>Guardar cambios</Text>
          </TouchableOpacity>
        </View>
      )}
    </Modal>
  )
}