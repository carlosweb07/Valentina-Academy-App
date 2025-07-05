// src/modules/admin/components/EditRecipeModal.tsx
import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import Modal from '../../../../../components/Modal/Modal'
import ApiService from '../../../../../services/Api'
import { BACKEND_ROUTES } from '../../../../../constants/routes'
import { Ingredient } from '../../../../../interfaces/Models'
import { COLORS } from '../../../../../constants/colors'

import styles from './styles'

interface Props {
  visible: boolean
  onClose: () => void
  recipeId: string | null
  ingredients: Ingredient[]
}

export default function EditRecipeModal({
  visible,
  onClose,
  recipeId,
  ingredients,
}: Props) {
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [steps, setSteps] = useState<string[]>([''])

  // load existing recipe
  useEffect(() => {
    if (!visible || !recipeId) return
    let mounted = true
    ;(async () => {
      try {
        const resp = await ApiService.get<any>(
          `${BACKEND_ROUTES.recipes}/${recipeId}`
        )
        if (!mounted) return
        setName(resp.name)
        setDescription(resp.description)
        setSelected(new Set(resp.ingredient.map((i: Ingredient) => i.id)))
        setSteps(resp.steps.length > 0 ? resp.steps : [''])
      } catch (e) {
        setError('Error cargando receta')
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [visible, recipeId])

  const toggleIngredient = (id: string) => {
    setSelected(s => {
      const copy = new Set(s)
      copy.has(id) ? copy.delete(id) : copy.add(id)
      return copy
    })
  }

  const onStepChange = (idx: number, text: string) => {
    setSteps(ss => {
      const copy = [...ss]
      copy[idx] = text
      return copy
    })
  }

  const addStep = () => setSteps(ss => [...ss, ''])
  const removeStep = () =>
    setSteps(ss => (ss.length > 1 ? ss.slice(0, -1) : ss))

  const onSubmit = async () => {
    if (
      !name.trim() ||
      !description.trim() ||
      selected.size === 0 ||
      steps.some(s => !s.trim())
    ) {
      setError('Completa todos los campos')
      return
    }
    setUpdating(true)
    setError('')
    try {
      const body = {
        name: name.trim(),
        description: description.trim(),
        ingredient: Array.from(selected),
        steps: steps.map(s => s.trim()),
      }
      const resp = await ApiService.post(
        `${BACKEND_ROUTES.recipes}/${recipeId}`,
        body
      )
      if ((resp as any).detail) throw new Error('Error actualizando')
      onClose()
    } catch (e: any) {
      setError(e.message || 'Error actualizando receta')
    } finally {
      setUpdating(false)
    }
  }

  if (!visible) return null

  return (
    <Modal showModal={visible} onClose={onClose}>
      {(loading || updating) ? (
        <View style={styles.center}>
          <ActivityIndicator
            size="large"
            color={COLORS.primary}
          />
          <Text style={styles.status}>
            {loading ? 'Cargando receta...' : 'Actualizando receta...'}
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.header}>Editar receta</Text>
          {error ? (
            <Text style={styles.error}>{error}</Text>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor={COLORS.primaryOpaque}
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Descripción"
            placeholderTextColor={COLORS.primaryOpaque}
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
              <TouchableOpacity onPress={removeStep}>
                <FontAwesome5
                  name="minus"
                  size={20}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={addStep}>
                <FontAwesome5
                  name="plus"
                  size={20}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {steps.map((step, idx) => (
            <TextInput
              key={idx}
              style={[styles.input, styles.textarea]}
              placeholder={`Paso ${idx + 1}`}
              placeholderTextColor={COLORS.primaryOpaque}
              multiline
              value={step}
              onChangeText={text => onStepChange(idx, text)}
            />
          ))}

          <TouchableOpacity
            style={styles.button}
            onPress={onSubmit}
          >
            <Text style={styles.buttonText}>Guardar cambios</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </Modal>
  )
}
