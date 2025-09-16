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
import { useVideoPlayer, VideoView } from 'expo-video'
import { FontAwesome5 } from '@expo/vector-icons'
import ApiService from '../../../services/Api'
import { BACKEND_ROUTES } from '../../../constants/routes'
import { COLORS } from '../../../constants/colors'
import CreateCourseModal from './components/CreateModal/CreateModal'
import EditCourseModal from './components/EditModal/EditModal'
import DeleteCourseModal from './components/DeleteModal/DeleteModal'
import AdminSkeleton from '../skeleton/AdminSkeleton'
import { Category, Course, User, Recipe } from '../../../interfaces/Models'

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

  const player = useVideoPlayer(course.media.url_video, player => {
    player.play()

    player.addListener("playToEnd", () => {
      onVideoEnd()
    })
  })

  if (loading) {
    return <AdminSkeleton />
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.heading}>Administración de cursos</Text>
        <TouchableOpacity onPress={() => setShowCreate(true)}>
          <FontAwesome5 name="plus" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {/* {courses.map(course => (
          
        ))} */}
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
