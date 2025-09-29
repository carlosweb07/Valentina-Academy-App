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
import CreateIngredientModal from './components/CreateModal/CreateModal'
import EditIngredientModal from './components/EditModal/EditModal'
import DeleteIngredientModal from './components/DeleteModal/DeleteModal'
import ApiService from '../../../services/Api'
import { BACKEND_ROUTES } from '../../../constants/routes'
import { Ingredient } from '../../../interfaces/Models'
import { COLORS } from '../../../constants/colors'
import fondo from '../../../../assets/background.jpg'

import styles from './styles'

export default function IngredientsAdmin() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // animación reload
  const spinAnim = useRef(new Animated.Value(0)).current
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  // mounted guard
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
      const resp = await ApiService.get<Ingredient[]>(BACKEND_ROUTES.ingredients)
      if (!mountedRef.current) return
      setIngredients(resp ?? [])
    } catch (e) {
      console.warn('Error loading ingredients', e)
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
          <Text style={styles.heading}>Administración de ingredientes</Text>

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
          {ingredients.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No hay ingredientes</Text>
            </View>
          ) : (
            ingredients.map(ing => (
              <View key={ing.id} style={styles.courseItem}>
                <TouchableOpacity
                  onPress={() => toggleExpand(ing.id)}
                  onLongPress={() => {
                    setSelectedId(ing.id)
                    setShowEdit(true)
                  }}
                  style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <Text style={styles.cardTitle}>{ing.name}</Text>
                  <FontAwesome5
                    name={expanded.has(ing.id) ? 'caret-down' : 'caret-right'}
                    size={18}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>

                {expanded.has(ing.id) && (
                  <View style={styles.courseDetails}>
                    <Text style={styles.cardBody}>
                      <Text style={styles.bold}>Detalle:</Text>
                      <Text style={styles.text}> {ing.name}</Text>
                    </Text>

                    <TouchableOpacity
                      onPress={() => {
                        setSelectedId(ing.id)
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

        <CreateIngredientModal
          visible={showCreate}
          onClose={() => {
            setShowCreate(false)
            loadData()
          }}
        />

        <EditIngredientModal
          visible={showEdit}
          ingredientId={selectedId}
          onClose={() => {
            setShowEdit(false)
            setSelectedId(null)
            loadData()
          }}
        />

        <DeleteIngredientModal
          visible={showDelete}
          ingredientId={selectedId}
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