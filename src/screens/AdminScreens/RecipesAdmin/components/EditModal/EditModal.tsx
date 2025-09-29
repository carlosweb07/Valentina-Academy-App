// src/modules/admin/components/EditRecipeModal.tsx
import React, { useEffect, useRef, useState, useCallback } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
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
  const [description, setDescription] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [steps, setSteps] = useState<string[]>([''])
  const originalRef = useRef<{
    name: string
    description: string
    ingredient: string[]
    steps: string[]
  } | null>(null)

  const loadRecipe = useCallback(async () => {
    if (!recipeId) return
    setLoading(true)
    setError('')
    try {
      const resp = await ApiService.get<any>(`${BACKEND_ROUTES.recipes}/${recipeId}`)

      console.log(resp);

      if (!mountedRef.current) return
      const loaded = {
        name: resp.name ?? '',
        description: resp.description ?? '',
        ingredient: Array.isArray(resp.ingredients) ? resp.ingredients.map((i: Ingredient) => i.id) : [],
        steps: Array.isArray(resp.steps) && resp.steps.length > 0 ? resp.steps : [''],
      }

      console.log(loaded.ingredient);

      originalRef.current = loaded
      setName(loaded.name)
      setDescription(loaded.description)
      setSelected(new Set(loaded.ingredient))
      setSteps(loaded.steps)
    } catch (e) {
      console.error('EditRecipeModal load error', e)
      setError('Error cargando receta')
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [recipeId])

  useEffect(() => {
    if (!visible || !recipeId) return
    loadRecipe()
  }, [visible, recipeId, loadRecipe])

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
  const removeStep = () => setSteps(ss => (ss.length > 1 ? ss.slice(0, -1) : ss))

  const buildPatchPayload = () => {
    const orig = originalRef.current
    if (!orig) return null
    const patch: Record<string, any> = {}
    if (name.trim() !== orig.name) patch.name = name.trim()
    if (description.trim() !== orig.description) patch.description = description.trim()
    // compare ingredient arrays as sets
    const selectedArr = Array.from(selected)
    const origIngs = orig.ingredient ?? []
    const sameIngredients =
      selectedArr.length === origIngs.length &&
      selectedArr.every(v => origIngs.includes(v))
    if (!sameIngredients) patch.ingredient = selectedArr
    // steps comparison
    const trimmedSteps = steps.map(s => s.trim())
    const sameSteps =
      trimmedSteps.length === orig.steps.length &&
      trimmedSteps.every((s, i) => s === (orig.steps[i] ?? ''))
    if (!sameSteps) patch.steps = trimmedSteps
    return { patch, totalFields: Object.keys(orig).length }
  }

  const onSubmit = async () => {
    setError('')
    if (!recipeId) {
      setError('Receta inválida')
      return
    }

    // basic validation
    if (
      !name.trim() ||
      !description.trim() ||
      selected.size === 0 ||
      steps.some(s => !s.trim())
    ) {
      setError('Completa todos los campos')
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
    if (changedCount === totalFields) {
      setError('No se permite reemplazar todos los campos desde aquí')
      return
    }

    setUpdating(true)
    try {
      const resp = await ApiService.patch(`${BACKEND_ROUTES.recipes}/${recipeId}`, patch)

      // handle DRF-style error responses
      if (resp && typeof resp === 'object' && !('id' in resp) && !('name' in resp)) {
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
      console.error('EditRecipeModal submit error', e)
      setError(e?.message || 'Error actualizando receta')
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
          <Text style={styles.status}>{loading ? 'Cargando receta...' : 'Actualizando receta...'}</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.form}>
          <Text style={styles.header}>Editar receta</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Text style={styles.tittle}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor={COLORS.primaryOpaque}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.tittle}>Descripción</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Descripción"
            placeholderTextColor={COLORS.primaryOpaque}
            multiline
            value={description}
            onChangeText={setDescription}
          />

          <Text style={styles.tittle}>Ingredientes</Text>
          {ingredients.map(ing => (
            <TouchableOpacity
              key={ing.id}
              style={styles.checkboxContainer}
              onPress={() => toggleIngredient(ing.id)}
            >
              <View style={[styles.checkbox, selected.has(ing.id) && styles.checkboxSelected]} />
              <Text style={styles.checkboxLabel}>{ing.name}</Text>
            </TouchableOpacity>
          ))}

          <View style={styles.stepsHeader}>
            <Text style={styles.tittle}>Pasos</Text>
            <View style={styles.stepButtons}>
              <TouchableOpacity onPress={removeStep}>
                <Text style={{ color: COLORS.primary, fontSize: 18 }}>−</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={addStep}>
                <Text style={{ color: COLORS.primary, fontSize: 18 }}>+</Text>
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

          <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={updating}>
            <Text style={styles.buttonText}>Guardar cambios</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </Modal>
  )
}