// src/modules/admin/components/CreateRecipeModal.tsx
import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import Modal from '../../../../../components/Modal/Modal'
import ApiService from '../../../../../services/Api'
import { BACKEND_ROUTES } from '../../../../../constants/routes'
import { Ingredient } from '../../../../../interfaces/Models'
import { colors } from '../../../../../constants/colors'

import styles from './styles'

interface Props {
  visible: boolean
  onClose: () => void
  ingredients: Ingredient[]
}

export default function CreateRecipeModal({
  visible,
  onClose,
  ingredients,
}: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [stepsCount, setStepsCount] = useState(1)
  const [steps, setSteps] = useState<string[]>([''])

  const toggleIngredient = (id: string) => {
    setSelected(s => {
      const next = new Set(s)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const onStepChange = (idx: number, text: string) => {
    setSteps(ss => {
      const copy = [...ss]
      copy[idx] = text
      return copy
    })
  }

  const onSubmit = async () => {
    if (!name || !description || selected.size === 0 || steps.some(s => !s)) {
      setError('Completa todos los campos')
      return
    }
    setLoading(true)
    setError('')
    try {
      const body = {
        name,
        description,
        ingredient: Array.from(selected),
        steps,
      }
      const resp = await ApiService.post(BACKEND_ROUTES.recipes, body)
      if ((resp as any).detail) throw new Error('Error creando receta')
      onClose()
    } catch (e: any) {
      setError(e.message || 'Error creando receta')
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
          <Text style={styles.status}>Creando receta...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.header}>Crear nueva receta</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor={colors.primaryOpaque}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Descripción"
            placeholderTextColor={colors.primaryOpaque}
            multiline
            value={description}
            onChangeText={setDescription}
          />

          <Text style={styles.subheading}>Ingredientes</Text>
          {ingredients.map(ing => (
            <TouchableOpacity
              key={ing.id}
              style={styles.checkboxContainer}
              onPress={() => toggleIngredient(ing.id)}
            >
              <View
                style={[
                  styles.checkbox,
                  selected.has(ing.id) && styles.checkboxSelected,
                ]}
              />
              <Text style={styles.checkboxLabel}>{ing.name}</Text>
            </TouchableOpacity>
          ))}

          <View style={styles.stepsHeader}>
            <Text style={styles.subheading}>Pasos</Text>
            <View style={styles.stepButtons}>
              <TouchableOpacity
                onPress={() => {
                  if (stepsCount > 1) {
                    setStepsCount(c => c - 1)
                    setSteps(ss => ss.slice(0, -1))
                  }
                }}
              >
                <FontAwesome5 name="minus" size={20} color={colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setStepsCount(c => c + 1)
                  setSteps(ss => [...ss, ''])
                }}
              >
                <FontAwesome5 name="plus" size={20} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {steps.map((_, idx) => (
            <TextInput
              key={idx}
              style={[styles.input, styles.textarea]}
              placeholder={`Paso ${idx + 1}`}
              placeholderTextColor={colors.primaryOpaque}
              multiline
              value={steps[idx]}
              onChangeText={text => onStepChange(idx, text)}
            />
          ))}

          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>Crear receta</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </Modal>
  )
}
