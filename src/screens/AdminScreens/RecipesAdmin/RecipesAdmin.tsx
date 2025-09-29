// src/screens/RecipesAdminScreen.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  ImageBackground,
  View,
  Animated,
  Text,
  Easing,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome5 } from '@expo/vector-icons'
import Navbar from '../../../components/Navbar/Navbar'
import AdminSkeleton from '../skeleton/AdminSkeleton'
import CreateRecipeModal from './components/CreateModal/CreateModal'
import EditRecipeModal from './components/EditModal/EditModal'
import DeleteRecipeModal from './components/DeleteModal/DeleteModal'
import ApiService from '../../../services/Api'
import { BACKEND_ROUTES } from '../../../constants/routes'
import { Recipe, Ingredient } from '../../../interfaces/Models'
import { COLORS } from '../../../constants/colors'
import fondo from '../../../../assets/background.png'

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

  const spinAnim = useRef(new Animated.Value(0)).current
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  const mountedRef = useRef(true)
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  const loadData = useCallback(async () => {
    try {
      if (mountedRef.current) setLoading(true)
      const [rcps, ings] = await Promise.all([
        ApiService.get<Recipe[]>(BACKEND_ROUTES.recipes),
        ApiService.get<Ingredient[]>(BACKEND_ROUTES.ingredients),
      ])
      if (!mountedRef.current) return
      setRecipes(rcps ?? [])
      setIngredients(ings ?? [])
    } catch (e) {
      console.warn('Error loading recipes', e)
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const toggleExpand = (id: string) => {
    setExpanded(prev => {
      const copy = new Set(prev)
      if (copy.has(id)) copy.delete(id)
      else copy.add(id)
      return copy
    })
  }

  const onReload = () => {
    spinAnim.setValue(0)
    Animated.timing(spinAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start()

    setExpanded(new Set())
    setSelectedId(null)

    loadData()
  }

  if (loading) return <AdminSkeleton />

  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar />
      <ImageBackground
        source={fondo}
        style={styles.image}
        imageStyle={styles.imageRounded}
        resizeMode="cover"
      >
        <View style={styles.header}>
          <Text style={styles.heading}>Administración de recetas</Text>

          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <TouchableOpacity onPress={onReload}>
              <FontAwesome5 name="redo-alt" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity onPress={() => setShowCreate(true)}>
            <FontAwesome5 name="plus" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.list}>
          {recipes.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No hay recetas</Text>
            </View>
          ) : (
            recipes.map(r => (
              <View key={r.id} style={styles.courseItem}>
                <TouchableOpacity
                  onPress={() => toggleExpand(r.id)}
                  onLongPress={() => {
                    setSelectedId(r.id)
                    setShowEdit(true)
                  }}
                  style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <Text style={styles.cardTitle}>{r.name}</Text>
                  <FontAwesome5
                    name={expanded.has(r.id) ? 'caret-down' : 'caret-right'}
                    size={18}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>

                {expanded.has(r.id) && (
                  <View style={styles.courseDetails}>
                    <Text style={styles.cardBody}><Text style={styles.subheading}>Detalles:</Text><Text style={styles.text}> {r.description}</Text></Text>

                    <Text style={styles.cardBody}><Text style={styles.subheading}>Ingredientes:</Text>
                      {r.ingredient.map(i => (
                        <Text key={i.id} style={styles.listItem}>• {i.name}</Text>
                      ))}
                    </Text>

                    <Text style={styles.cardBody}><Text style={styles.subheading}>Pasos:</Text>
                      {r.steps.map((s, idx) => (
                        <Text key={idx} style={styles.listItem}>{idx + 1}. {s}</Text>
                      ))}
                    </Text>

                    <TouchableOpacity
                      onPress={() => {
                        setSelectedId(r.id)
                        setShowDelete(true)
                      }}
                      style={{ marginTop: 8 }}
                    >
                      <Text style={styles.deleteButton}>Eliminar</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))
          )}
        </ScrollView>

        <CreateRecipeModal
          visible={showCreate}
          onClose={() => {
            setShowCreate(false)
            loadData()
          }}
          ingredients={ingredients}
        />

        <EditRecipeModal
          visible={showEdit}
          recipeId={selectedId}
          onClose={() => {
            setShowEdit(false)
            setSelectedId(null)
            loadData()
          }}
          ingredients={ingredients}
        />

        <DeleteRecipeModal
          visible={showDelete}
          recipeId={selectedId}
          onClose={() => {
            setShowDelete(false)
            setSelectedId(null)
            loadData()
          }}
        />
      </ImageBackground>
    </SafeAreaView>
  )
}