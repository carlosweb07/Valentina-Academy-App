// src/screens/TeacherScreen.tsx
import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
} from 'react-native'
import Navbar from '../../components/Navbar/Navbar'
import CoursesAdmin from '../AdminScreens/CoursesAdmin/CoursesAdmin'
import ApiService from '../../services/Api'
import { BACKEND_ROUTES } from '../../constants/routes'
import { colors } from '../../constants/colors'
import CourseSkeleton from '../../components/Course/skeleton/CourseSkeleton'

import styles from './styles'

export default function Teacher() {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const resp = await ApiService.get<any[]>(BACKEND_ROUTES.courses)
        if (mounted) setCourses(resp)
      } catch (e) {
        console.warn('Error loading courses:', e)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar />
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.primary} />
          {Array.from({ length: 6 }).map((_, i) => (
            <CourseSkeleton key={i} />
          ))}
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <CoursesAdmin courses={courses} />
        </ScrollView>
      )}
    </SafeAreaView>
  )
}
