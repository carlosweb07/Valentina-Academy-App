import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
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
  const [loading, setLoading] = useState<boolean>(true)
  const [category, setCategory] = useState<number | null>(null)

  useEffect(() => {
    async function load() {
      try {
        setCourses([])
        const resp = await ApiService.get<Course[]>(
          BACKEND_ROUTES.courses,
          category !== null ? { category } : {}
        )
        console.log("Cursos", resp);
        setCourses(resp)
      } finally {
        console.log("TERMINE");
        setLoading(false)
      }
    }
    load()
  }, [category])

  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        <Header setCategory={setCategory} />
        <View style={styles.main}>
          <Courses setCategory={setCategory}>
            <>
              {loading
                ? Array.from({ length: 12 }).map((_, i) => (
                    <CourseSkeleton key={i} />
                  ))
                : 
                courses.length === 0 ? (
                  <View style={styles.notFoundContainer}>
                    <Text style={styles.notFoundText}>
                      No hay cursos disponibles... Limpia las categorias o intenta mas tarde
                    </Text>
                  </View>
                  )
                :
                courses.map(c => (
                    <CourseCard
                      key={c.id}
                      id={c.id}
                      img={c.media.url_cover}
                      title={c.title}
                      description={c.description}
                    />
                  ))}
            </>
          </Courses>
        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  )
}
