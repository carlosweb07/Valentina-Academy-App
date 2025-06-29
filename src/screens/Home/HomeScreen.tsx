import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import { BACKEND_ROUTES } from '../../constants/routes'
import ApiService from '../../services/Api'
import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Courses from '../../components/Courses/Courses'
import CourseCard from '../../components/Course/CourseCard' /* Ajusta al path real */
import CourseSkeleton from '../../components/Course/skeleton/CourseSkeleton'
import styles from './styles'

interface Course {
  id: string
  media: { url_cover: string }
  title: string
  description: string
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([])
  const [category, setCategory] = useState<number | null>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      setCourses([])
      const resp = await ApiService.get<Course[]>(
        BACKEND_ROUTES.courses,
        category !== null ? { category } : {}
      )
      if (mounted) setCourses(resp)
    }
    load()
    return () => {
      mounted = false
    }
  }, [category])

  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        <Header setCategory={setCategory} />
        <View style={styles.main}>
          <Courses setCategory={setCategory}>
            {courses.length === 0
              ? Array.from({ length: 12 }).map((_, i) => (
                  <CourseSkeleton key={i} />
                ))
              : courses.map(c => (
                  <CourseCard
                    key={c.id}
                    id={c.id}
                    img={c.media.url_cover}
                    title={c.title}
                    description={c.description}
                  />
                ))}
          </Courses>
        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  )
}
