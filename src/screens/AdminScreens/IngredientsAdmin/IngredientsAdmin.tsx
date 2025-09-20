// src/screens/IngredientsAdminScreen.tsx
import React, { useState, useEffect } from 'react'
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons'
import Navbar from '../../../components/Navbar/Navbar'
import AdminSkeleton from '../skeleton/AdminSkeleton'
import CreateIngredientModal from './components/CreateModal/CreateModal'
import EditIngredientModal from './components/EditModal/EditModal'
import DeleteIngredientModal from './components/DeleteModal/DeleteModal'
import ApiService from '../../../services/Api'
import { BACKEND_ROUTES } from '../../../constants/routes'
import { Ingredient } from '../../../interfaces/Models'
import styles from './styles'

export default function IngredientsAdmin() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [refreshToggle, setRefreshToggle] = useState(false)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const resp = await ApiService.get<Ingredient[]>(
          BACKEND_ROUTES.ingredients
        )
        if (!mounted) return
        setIngredients(resp)
      } catch (e) {
        console.warn('Error loading ingredients', e)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [refreshToggle])

  const toggle = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  if (loading) return <AdminSkeleton />

  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar />
      <View style={styles.header}>
        <Text style={styles.title}>Administración de ingredientes</Text>
        <TouchableOpacity onPress={() => setShowCreate(true)}>
          <FontAwesome5 name="plus" size={24} color="#EDD153" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        {ingredients.map(ing => (
          <View key={ing.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{ing.name}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedId(ing.id)
                    setShowEdit(true)
                  }}
                >
                  <FontAwesome5
                    name="pen-to-square"
                    size={20}
                    color="#EDD153"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedId(ing.id)
                    setShowDelete(true)
                  }}
                  style={styles.deleteIcon}
                >
                  <FontAwesome5 name="trash" size={20} color="#F04343" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggle(ing.id)}>
                  <FontAwesome5
                    name="caret-right"
                    size={20}
                    color="#EDD153"
                    style={
                      expanded.has(ing.id) ? styles.caretOpen : undefined
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
            {expanded.has(ing.id) && (
              <View style={styles.cardBody}>
                <Text style={styles.detailLabel}>Detalle del ingrediente:</Text>
                <Text style={styles.detailText}>{ing.name}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <CreateIngredientModal
        visible={showCreate}
        onClose={() => {
          setShowCreate(false)
          setRefreshToggle(t => !t)
        }}
      />
      <EditIngredientModal
        visible={showEdit}
        onClose={() => {
          setShowEdit(false)
          setRefreshToggle(t => !t)
        }}
        ingredientId={selectedId}
      />
      <DeleteIngredientModal
        visible={showDelete}
        onClose={() => {
          setShowDelete(false)
          setRefreshToggle(t => !t)
        }}
        ingredientId={selectedId}
      />
    </SafeAreaView>
  )
}
