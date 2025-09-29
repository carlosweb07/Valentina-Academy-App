// src/screens/SurveysAdminScreen.tsx
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
import CreateSurveyModal from './components/CreateModal/CreateModal'
import EditSurveyModal from './components/EditModal/EditModal'
import DeleteSurveyModal from './components/DeleteModal/DeleteModal'
import ApiService from '../../../services/Api'
import { BACKEND_ROUTES } from '../../../constants/routes'
import { Survey, Course } from '../../../interfaces/Models'
import { COLORS } from '../../../constants/colors'

import fondo from '../../../../assets/background.png'

import styles from './styles'

export default function SurveysAdmin() {
  const [loading, setLoading] = useState(true)
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [courses, setCourses] = useState<Course[]>([])
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
      const [svs, crs] = await Promise.all([
        ApiService.get<Survey[]>(BACKEND_ROUTES.surveys),
        ApiService.get<Course[]>(BACKEND_ROUTES.courses),
      ])
      console.log(svs);
      if (!mountedRef.current) return
      setSurveys(svs ?? [])
      setCourses(crs ?? [])
    } catch (e) {
      console.warn('Error loading surveys', e)
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
          <Text style={styles.heading}>Administración de encuestas</Text>

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
          {surveys.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No hay encuestas</Text>
            </View>
          ) : (
            surveys.map(s => (
              <View key={s.id} style={styles.courseItem}>
                <TouchableOpacity
                  onPress={() => toggleExpand(s.id)}
                  onLongPress={() => {
                    setSelectedId(s.id)
                    setShowEdit(true)
                  }}
                  style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <Text style={styles.cardTitle}>{s.title}</Text>
                  <FontAwesome5
                    name={expanded.has(s.id) ? 'caret-down' : 'caret-right'}
                    size={18}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>

                {expanded.has(s.id) && (
                  <View style={styles.courseDetails}>
                    <Text style={styles.cardBody}>
                      <Text style={styles.subheading}>Descripción:</Text>
                      <Text style={styles.text}> {s.description}</Text>
                    </Text>

                    <View style={styles.questionsList}>
                      <Text style={styles.subheading}>Preguntas</Text>
                      {s.questions.map(q => (
                        <View key={q.id} style={styles.questionBlock}>
                          <Text style={styles.questionText}>• {q.question}</Text>
                          {q.answers.map(a => (
                            <Text
                              key={a.id}
                              style={[
                                styles.answerText,
                                a.is_correct ? styles.answerCorrect : styles.answerIncorrect,
                              ]}
                            >
                              – {a.answer}
                            </Text>
                          ))}
                        </View>
                      ))}
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        setSelectedId(s.id)
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

        <CreateSurveyModal
          visible={showCreate}
          onClose={() => {
            setShowCreate(false)
            loadData()
          }}
          courses={courses}
        />

        <EditSurveyModal
          visible={showEdit}
          surveyId={selectedId}
          onClose={() => {
            setShowEdit(false)
            setSelectedId(null)
            loadData()
          }}
          courses={courses}
        />

        <DeleteSurveyModal
          visible={showDelete}
          surveyId={selectedId}
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