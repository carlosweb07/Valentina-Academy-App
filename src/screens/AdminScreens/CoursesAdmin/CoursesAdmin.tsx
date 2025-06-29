// src/screens/CoursesAdminScreen.tsx
import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'
import { Video, ResizeMode } from 'expo-av'
import { FontAwesome5 } from '@expo/vector-icons'
import ApiService from '../../../services/Api'
import { BACKEND_ROUTES } from '../../../constants/routes'
import { colors } from '../../../constants/colors'
import CreateCourseModal from './components/CreateModal/CreateModal'
import EditCourseModal from './components/EditModal/EditModal'
import DeleteCourseModal from './components/DeleteModal/DeleteModal'
import AdminSkeleton from '../skeleton/AdminSkeleton'
import { Category, Course, User, Recipe } from '../../../interfaces/App'

import styles from './styles'

export default function CoursesAdminScreen() {
  const [loading, setLoading] = useState(true)
  const [courses, setCourses] = useState<Course[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [expanded, setExpanded] = useState<Set<number>>(new Set())
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  useEffect(() => {
    let mounted = true
    async function loadData() {
      try {
        const [crs, cats, usrs, rcps] = await Promise.all([
          ApiService.get<Course[]>(BACKEND_ROUTES.courses),
          ApiService.get<Category[]>(BACKEND_ROUTES.categories),
          ApiService.get<User[]>(BACKEND_ROUTES.users),
          ApiService.get<Recipe[]>(BACKEND_ROUTES.recipes),
        ])
        if (!mounted) return
        setCourses(crs)
        setCategories(cats)
        setUsers(usrs)
        setRecipes(rcps)
      } catch (e) {
        console.warn('Error loading admin data', e)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    loadData()
    return () => {
      mounted = false
    }
  }, [])

  const toggleExpand = (id: number) => {
    setExpanded(prev => {
      const copy = new Set(prev)
      copy.has(id) ? copy.delete(id) : copy.add(id)
      return copy
    })
  }

  if (loading) {
    return <AdminSkeleton />
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.heading}>Administración de cursos</Text>
        <TouchableOpacity onPress={() => setShowCreate(true)}>
          <FontAwesome5 name="plus" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {courses.map(course => (
          <View key={course.id} style={styles.card}>
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{course.title}</Text>
              <View style={styles.cardActions}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedId(course.id)
                    setShowEdit(true)
                  }}
                >
                  <FontAwesome5
                    name="pen-to-square"
                    size={20}
                    color={colors.primary}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedId(course.id)
                    setShowDelete(true)
                  }}
                >
                  <FontAwesome5
                    name="trash"
                    size={20}
                    color={colors.error}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleExpand(course.id)}>
                  <FontAwesome5
                    name="caret-right"
                    size={20}
                    color={colors.primary}
                    style={[
                      styles.icon,
                      expanded.has(course.id) && styles.caretRotated,
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Expanded Info */}
            {expanded.has(course.id) && (
              <View style={styles.cardBody}>
                <View style={styles.infoSection}>
                  <View style={styles.infoDetails}>
                    <Text style={styles.subheading}>Detalles del curso</Text>
                    <Text style={styles.text}>
                      <Text style={styles.bold}>Descripción: </Text>
                      {course.description}
                    </Text>
                    <Text style={styles.text}>
                      <Text style={styles.bold}>Duración: </Text>
                      {course.duration}
                    </Text>
                    <Text style={styles.text}>
                      <Text style={styles.bold}>Categoría: </Text>
                      {course.category.name}
                    </Text>
                    <Text style={styles.text}>
                      <Text style={styles.bold}>Autor: </Text>
                      {course.user.username}
                    </Text>
                    <Text style={styles.text}>
                      <Text style={styles.bold}>Precio: </Text>
                      {course.price}$
                    </Text>
                  </View>

                  <View style={styles.infoDetails}>
                    <Text style={styles.subheading}>Receta</Text>
                    <Text style={styles.text}>{course.recipe.name}</Text>
                    <Text style={styles.text}>
                      <Text style={styles.bold}>Descripción: </Text>
                      {course.recipe.description}
                    </Text>
                    <View style={styles.recipeLists}>
                      <View style={styles.recipePart}>
                        <Text style={styles.listHeading}>Ingredientes</Text>
                        {course.recipe.ingredient.map(i => (
                          <Text key={i.id} style={styles.text}>
                            • {i.name}
                          </Text>
                        ))}
                      </View>
                      <View style={styles.recipePart}>
                        <Text style={styles.listHeading}>Pasos</Text>
                        {course.recipe.steps.map((s, idx) => (
                          <Text key={idx} style={styles.text}>
                            {idx + 1}. {s}
                          </Text>
                        ))}
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.mediaSection}>
                  <Text style={styles.subheading}>Contenido multimedia</Text>
                  <View style={styles.media}>
                    <Image
                      source={{ uri: course.media.url_cover }}
                      style={styles.cover}
                    />
                    <Video
                      source={{ uri: course.media.url_video }}
                      useNativeControls
                      resizeMode={ResizeMode.COVER}
                      style={styles.video}
                    />
                  </View>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Modals */}
      <CreateCourseModal
        visible={showCreate}
        onClose={() => setShowCreate(false)}
        categories={categories}
        users={users}
        recipes={recipes}
      />
      <EditCourseModal
        visible={showEdit}
        onClose={() => setShowEdit(false)}
        courseId={selectedId}
        categories={categories}
        users={users}
        recipes={recipes}
      />
      <DeleteCourseModal
        visible={showDelete}
        onClose={() => setShowDelete(false)}
        courseId={selectedId}
      />
    </SafeAreaView>
  )
}
