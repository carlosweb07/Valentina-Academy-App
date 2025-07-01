// src/screens/CourseScreen.tsx
import React, { useContext, useEffect, useState } from 'react'
import type { RootStackParamList } from '../../navigation/types'
import type { StackNavigationProp } from '@react-navigation/stack'
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native'
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'
import ApiService from '../../services/Api'
import { ContextApp } from '../../context/ContextApp'
import PaymentPage from './PaymentScreen/PayCourseScreen'
import CourseContent from './CourseScreen/CourseScreen'

type CourseRouteProp = RouteProp<RootStackParamList, 'Course'>

interface Props {
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Course({ setCompleted }: Props) {
  const { params } = useRoute<CourseRouteProp>()
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Course'>>()
  const { user } = useContext(ContextApp)

  const [loading, setLoading] = useState(true)
  const [isPurchased, setIsPurchased] = useState<boolean | null>(null)
  const [course, setCourse] = useState<any>(null)

  useEffect(() => {
    let mounted = true

    async function loadCourse() {
      try {
        const purchases = await ApiService.get<any[]>(
          'purchased-courses',
          { user_id: user.id, course_id: params.id }
        )
        if (!mounted) return

        // Si hubo error en backend o array vacío
        if ((purchases as any).error) {
          Alert.alert('Error', 'Acceso denegado')
          navigation.navigate('Home')
          return
        }

        if (purchases.length === 0) {
          // Traer datos del curso para pago
          const c = await ApiService.get<any>(`courses/${params.id}`)
          if (!mounted) return
          setCourse(c)
          setIsPurchased(false)
        } else {
          const record = purchases[0]
          setCourse(record.course)
          setIsPurchased(Boolean(record.is_purchased))
        }
      } catch (err) {
        console.warn('CourseScreen load error:', err)
        navigation.navigate('Home')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadCourse()
    return () => {
      mounted = false
    }
  }, [navigation, params.id, user.id])

  // Loader full-screen
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#ecd553" />
      </View>
    )
  }

  // Si no está comprado, mostramos la pantalla de pago
  if (!isPurchased) {
    return <PaymentPage course={course} />
  }

  // Curso comprado: contenido principal
  return <CourseContent course={course} setCompleted={setCompleted} />
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
