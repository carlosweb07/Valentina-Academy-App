// src/modules/admin/components/CreateRecipeModal.tsx
import React, { useState, useRef } from 'react'
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
  ingredients: Ingredient[]
}

export default function CreateRecipeModal({
  visible,
  onClose,
  ingredients,
}: Props) {
  const mountedRef = useRef(true)
  React.useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())
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

  const addStep = () => setSteps(ss => [...ss, ''])
  const removeStep = () =>
    setSteps(ss => (ss.length > 1 ? ss.slice(0, -1) : ss))

  const onlyFilled = () =>
    name.trim().length > 0 &&
    description.trim().length > 0 &&
    selected.size > 0 &&
    steps.length > 0 &&
    steps.every(s => s.trim().length > 0)

  const onSubmit = async () => {
    setError('')
    if (!onlyFilled()) {
      setError('Completa todos los campos')
      return
    }
    setCreating(true)
    try {
      const body = {
        name: name.trim(),
        description: description.trim(),
        ingredient: Array.from(selected),
        steps: steps.map(s => s.trim()),
      }
      const resp = await ApiService.post(BACKEND_ROUTES.recipes, body)
      if ((resp as any)?.detail) throw new Error('Error creando receta')
      if (!mountedRef.current) return
      // limpiar formulario
      setName('')
      setDescription('')
      setSelected(new Set())
      setSteps([''])
      onClose()
    } catch (e: any) {
      console.error('CreateRecipeModal error', e)
      setError(e?.message || 'Error creando receta')
    } finally {
      if (mountedRef.current) setCreating(false)
    }
  }

  if (!visible) return null

  return (
    <Modal showModal={visible} setShowModal={onClose} onClose={onClose}>
      <Text style={styles.header}>Crear nueva receta</Text>

      {creating ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Creando receta...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.form}>
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Text style={styles.tittle}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor={COLORS.primaryOpaque}
            value={name}
            onChangeText={t => setName(t)}
          />

          <Text style={styles.tittle}>Descripción</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Descripción"
            placeholderTextColor={COLORS.primaryOpaque}
            multiline
            value={description}
            onChangeText={t => setDescription(t)}
          />

          <Text style={styles.tittle}>Ingredientes</Text>
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
            <Text style={styles.tittle}>Pasos</Text>
            <View style={styles.stepButtons}>
              <TouchableOpacity onPress={removeStep}>
                <FontAwesome5 name="minus" size={20} color={COLORS.primary} />
              </TouchableOpacity>
              <TouchableOpacity onPress={addStep}>
                <FontAwesome5 name="plus" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {steps.map((_, idx) => (
            <TextInput
              key={idx}
              style={[styles.input, styles.textarea]}
              placeholder={`Paso ${idx + 1}`}
              placeholderTextColor={COLORS.primaryOpaque}
              multiline
              value={steps[idx]}
              onChangeText={text => onStepChange(idx, text)}
            />
          ))}

          <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={creating}>
            <Text style={styles.buttonText}>Crear receta</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </Modal>
  )
}