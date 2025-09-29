// src/screens/CoursesAdminScreen.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  ImageBackground,
  View,
  Animated,
  Text,
  Easing,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome5 } from '@expo/vector-icons'
import ApiService from '../../../services/Api'
import { BACKEND_ROUTES } from '../../../constants/routes'
import { COLORS } from '../../../constants/colors'
import CreateCourseModal from './components/CreateModal/CreateModal'
import EditCourseModal from './components/EditModal/EditModal'
import DeleteCourseModal from './components/DeleteModal/DeleteModal'
import AdminSkeleton from '../skeleton/AdminSkeleton'
import { Category, Course, User, Recipe } from '../../../interfaces/Models'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../../navigation/types'
import type { StackNavigationProp } from '@react-navigation/stack'

import Navbar from '../../../components/Navbar/Navbar'

import styles from './styles'
import fondo from '../../../../assets/background.jpg'
import SoloVideo from './components/Multimedia/Video'

interface Props {
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CoursesAdminScreen({ setCompleted }: Props) {
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
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const [category, setCategory] = useState<number | null>(null)

  // Animación del botón reload
  const spinAnim = useRef(new Animated.Value(0)).current
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  // Ref para controlar si componente está montado y evitar setState después de ununmount
  const mountedRef = useRef(true)
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  // loadData: extraída y memoizada para poder llamarla desde onReload y callbacks de modales
  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      const [coursesData, cats, usrs, rcps] = await Promise.all([
        ApiService.get<Course[]>(BACKEND_ROUTES.courses),
        ApiService.get<Category[]>(BACKEND_ROUTES.categories),
        ApiService.get<User[]>(BACKEND_ROUTES.users),
        ApiService.get<Recipe[]>(BACKEND_ROUTES.recipes),
      ])
      if (!mountedRef.current) return
      setCourses(coursesData ?? [])
      setCategories(cats ?? [])
      setUsers(usrs ?? [])
      setRecipes(rcps ?? [])
    } catch (e) {
      console.warn('Error loading admin data', e)
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const toggleExpand = (id: number) => {
    setExpanded(prev => {
      const copy = new Set(prev)
      if (copy.has(id)) copy.delete(id)
      else copy.add(id)
      return copy
    })
  }

  const onReload = () => {
    // reset de categoría
    setCategory(null)

    // animación
    spinAnim.setValue(0)
    Animated.timing(spinAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start()

    // recargar datos
    loadData()
  }

  if (loading) {
    return <AdminSkeleton />
  }

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
        <Text style={styles.heading}>Administración de cursos</Text>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <TouchableOpacity onPress={onReload}>
              <FontAwesome5 name="redo-alt" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </Animated.View>
        <TouchableOpacity onPress={() => setShowCreate(true)}>
          <FontAwesome5 name="plus" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Listado de cursos con detalles expandibles */}
      <ScrollView contentContainerStyle={styles.list}>
        {courses.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.heading}>No hay cursos disponibles</Text>
          </View>
        ) : (
          courses.map(course => (
          <View key={course.id} style={styles.courseItem}>
            <TouchableOpacity
              onPress={() => toggleExpand(course.id)}
              onLongPress={() => {
                setSelectedId(course.id)
                setShowEdit(true)
              }}
              style={{  flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Text style={styles.cardTitle}>{course.title}</Text>
              <FontAwesome5
                name={expanded.has(course.id) ? "caret-down" : "caret-right"}
                size={18}
                color={COLORS.primary}
              />
            </TouchableOpacity>
            {expanded.has(course.id) && (
              <View style={styles.courseDetails}>
                <ScrollView>
                {/* Información detallada del curso */}
                
                <Text style={styles.cardBody}><Text style={styles.bold}>Descripción:</Text><Text style={styles.text}> {course.description}</Text></Text>
                <Text style={styles.cardBody}><Text style={styles.bold}>Duración:</Text><Text style={styles.text}> {course.duration}</Text></Text>
                <Text style={styles.cardBody}><Text style={styles.bold}>Categoría:</Text><Text style={styles.text}> {course.category?.name}</Text></Text>
                <Text style={styles.cardBody}><Text style={styles.bold}>Autor:</Text><Text style={styles.text}> {course.user?.username}</Text></Text>
                <Text style={styles.cardBody}><Text style={styles.bold}>Precio:</Text><Text style={styles.text}> {course.price}$</Text></Text>
                <Text style={styles.cardBody}><Text style={styles.bold}>Receta:</Text><Text style={styles.text}> {course.recipe?.name}</Text></Text>
                  <Image
                    source={{ uri: course.media.url_cover }}
                    style={styles.imagenrender}
                    resizeMode="cover"
                    />
                  <View style={{ width: '100%', height: 300 }}>
                  <SoloVideo
                  uri={course.media.url_video}
                  onEnd={() => {
                    setCompleted(true);
                    navigation.navigate('Survey', { course_id: course.id });
                  }}
                  />
                  </View>
                </ScrollView>
                {/* Puedes agregar más campos según tu modelo */}
                <TouchableOpacity
                  onPress={() => {
                    setSelectedId(course.id)
                    setShowDelete(true)
                  }}
                  style={{ marginTop: 8 }}
                >
                  <Text style={ styles.deleteButton }>Eliminar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          ))
        )}
      </ScrollView>
 
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
        onDeleted={() => {
          setShowDelete(false)   // cierra modal
          setSelectedId(null)    // limpia selección
          loadData()             // refresca lista
        }}
      />
        </ImageBackground>
    </SafeAreaView>
  )
}
