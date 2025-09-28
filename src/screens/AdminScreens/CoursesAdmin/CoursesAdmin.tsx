// src/screens/CoursesAdminScreen.tsx
import React, { useState, useEffect } from 'react'
import {
  ImageBackground,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
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

import styles from './styles'
import Api from '../../../services/Api';

import fondo from '../../../../assets/background.jpg'
import SoloVideo from './components/Multimedia/Video';
import style from '../IngredientsAdmin/components/DeleteModal/style';

interface Props {
  img: string
  uri: string;
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CoursesAdminScreen({ img,setCompleted }: Props) {
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
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  
  useEffect(() => {
    let mounted = true
    async function loadData() {
      try {
        const [coursesData, cats, usrs, rcps] = await Promise.all([
          ApiService.get<Course[]>(BACKEND_ROUTES.courses),
          ApiService.get<Category[]>(BACKEND_ROUTES.categories),
          ApiService.get<User[]>(BACKEND_ROUTES.users),
          ApiService.get<Recipe[]>(BACKEND_ROUTES.recipes),
        ])
        if (!mounted) return
        setCourses(coursesData)
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

  console.log('courses:', courses)

  return (
      <SafeAreaView style={styles.safeArea}>
        <ImageBackground
        source={fondo}
        style={styles.image}
        imageStyle={styles.imageRounded}
        resizeMode="cover"
        >
      <View style={styles.header}>
        <Text style={styles.heading}>Administración de cursos</Text>
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
                  <Text style={{ color: COLORS.error }}>Eliminar</Text>
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
        />
        </ImageBackground>
    </SafeAreaView>
  )
}

/**
 * Cambios realizados:
 * - Ahora cada curso muestra su información básica y, al hacer tap, se expande para mostrar todos los detalles.
 * - El botón de eliminar está dentro de la vista expandida.
 * - Se documenta cada sección para claridad.
 * - Se usa un View como contenedor principal de cada curso para mejor estructura.
 * - Se recomienda agregar estilos como `courseTitle`, `courseLabel`, `bold`, `courseDetails` en tu archivo styles.ts.
 */