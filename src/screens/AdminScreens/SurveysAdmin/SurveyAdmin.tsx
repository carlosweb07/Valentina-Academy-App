import React, { useState, useEffect } from 'react'
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons'
import Navbar from '../../../components/Navbar/Navbar'
import AdminSkeleton from '../skeleton/AdminSkeleton'
import CreateSurveyModal from './components/CreateModal/CreateModal'
import EditSurveyModal from './components/EditModal/EditModal'
import DeleteSurveyModal from './components/DeleteModal/DeleteModal'
import ApiService from '../../../services/Api'
import { BACKEND_ROUTES } from '../../../constants/routes'
import { Survey, Course } from '../../../interfaces/Models'

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
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const [svs, crs] = await Promise.all([
          ApiService.get<Survey[]>(BACKEND_ROUTES.surveys),
          ApiService.get<Course[]>(BACKEND_ROUTES.courses),
        ])
        if (!mounted) return
        setSurveys(svs)
        setCourses(crs)
      } catch (e) {
        console.warn(e)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [refresh])

  const toggle = (id: string) => {
    setExpanded(s => {
      const next = new Set(s)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  if (loading) return <AdminSkeleton />

  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar />
      <View style={styles.header}>
        <Text style={styles.title}>Administración de encuestas</Text>
        <TouchableOpacity onPress={() => setShowCreate(true)}>
          <FontAwesome5 name="plus" size={24} color={styles.icon.color} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        {surveys.map(s => (
          <View key={s.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{s.title}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => { setSelectedId(s.id); setShowEdit(true) }}
                >
                  <FontAwesome5 name="pen-to-square" size={20} color={styles.icon.color} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => { setSelectedId(s.id); setShowDelete(true) }}
                  style={styles.deleteIcon}
                >
                  <FontAwesome5 name="trash" size={20} color={styles.deleteIcon.color} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggle(s.id)}>
                  <FontAwesome5
                    name="caret-right"
                    size={20}
                    color={styles.icon.color}
                    style={expanded.has(s.id) ? styles.caretOpen : undefined}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {expanded.has(s.id) && (
              <View style={styles.cardBody}>
                <Text style={styles.subheading}>Descripción</Text>
                <Text style={styles.text}>{s.description}</Text>
                <Text style={styles.subheading}>Preguntas</Text>
                {s.questions.map(q => (
                  <View key={q.id} style={styles.questionBlock}>
                    <Text style={styles.questionText}>• {q.question}</Text>
                    {q.answers.map(a => (
                      <Text key={a.id} style={styles.answerText}>
                        – {a.answer} ({a.is_correct ? '✓' : '✗'})
                      </Text>
                    ))}
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <CreateSurveyModal
        visible={showCreate}
        onClose={() => { setShowCreate(false); setRefresh(r => !r) }}
        courses={courses}
      />
      <EditSurveyModal
        visible={showEdit}
        onClose={() => { setShowEdit(false); setRefresh(r => !r) }}
        surveyId={selectedId}
        courses={courses}
      />
      <DeleteSurveyModal
        visible={showDelete}
        onClose={() => { setShowDelete(false); setRefresh(r => !r) }}
        surveyId={selectedId}
      />
    </SafeAreaView>
  )
}
