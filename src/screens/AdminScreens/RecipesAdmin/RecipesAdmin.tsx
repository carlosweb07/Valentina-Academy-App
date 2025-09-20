// src/screens/RecipesAdminScreen.tsx
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
import CreateRecipeModal from './components/CreateModal/CreateModal'
import EditRecipeModal from './components/EditModal/EditModal'
import DeleteRecipeModal from './components/DeleteModal/DeleteModal'
import ApiService from '../../../services/Api'
import { BACKEND_ROUTES } from '../../../constants/routes'
import { Recipe, Ingredient } from '../../../interfaces/Models'

import styles from './styles'

export default function RecipesAdminScreen() {
  const [loading, setLoading] = useState(true)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    let mounted = true
    async function loadData() {
      try {
        const [rcps, ings] = await Promise.all([
          ApiService.get<Recipe[]>(BACKEND_ROUTES.recipes),
          ApiService.get<Ingredient[]>(BACKEND_ROUTES.ingredients),
        ])
        if (!mounted) return
        setRecipes(rcps)
        setIngredients(ings)
      } catch (e) {
        console.warn('Error loading recipes', e)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    loadData()
    return () => {
      mounted = false
    }
  }, [refresh])

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
        <Text style={styles.heading}>Administración de recetas</Text>
        <TouchableOpacity onPress={() => setShowCreate(true)}>
          <FontAwesome5 name="plus" size={24} color={styles.icon.color} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        {recipes.map(r => (
          <View key={r.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{r.name}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedId(r.id)
                    setShowEdit(true)
                  }}
                >
                  <FontAwesome5 name="pen-to-square" size={20} color={styles.icon.color} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedId(r.id)
                    setShowDelete(true)
                  }}
                  style={styles.deleteIcon}
                >
                  <FontAwesome5 name="trash" size={20} color={styles.deleteIcon.color} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggle(r.id)}>
                  <FontAwesome5
                    name="caret-right"
                    size={20}
                    color={styles.icon.color}
                    style={expanded.has(r.id) ? styles.caretOpen : undefined}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {expanded.has(r.id) && (
              <View style={styles.cardBody}>
                <Text style={styles.subheading}>Detalles de la receta</Text>
                <Text style={styles.text}>{r.description}</Text>

                <Text style={styles.subheading}>Ingredientes</Text>
                {r.ingredient.map(i => (
                  <Text key={i.id} style={styles.listItem}>
                    • {i.name}
                  </Text>
                ))}

                <Text style={styles.subheading}>Pasos</Text>
                {r.steps.map((s, idx) => (
                  <Text key={idx} style={styles.listItem}>
                    {idx + 1}. {s}
                  </Text>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Modals */}
      <CreateRecipeModal
        visible={showCreate}
        onClose={() => {
          setShowCreate(false)
          setRefresh(f => !f)
        }}
        ingredients={ingredients}
      />
      <EditRecipeModal
        visible={showEdit}
        onClose={() => {
          setShowEdit(false)
          setRefresh(f => !f)
        }}
        recipeId={selectedId}
        ingredients={ingredients}
      />
      <DeleteRecipeModal
        visible={showDelete}
        onClose={() => {
          setShowDelete(false)
          setRefresh(f => !f)
        }}
        recipeId={selectedId}
      />
    </SafeAreaView>
  )
}
