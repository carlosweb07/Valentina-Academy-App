// src/modules/admin/components/EditSurveyModal.tsx
import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import Modal from '../../../../../components/Modal/Modal'
import ApiService from '../../../../../services/Api'
import { BACKEND_ROUTES } from '../../../../../constants/routes'
import { Survey, Course } from '../../../../../interfaces/Models'
import { COLORS } from '../../../../../constants/colors'

import styles from './styles'

interface AnswerInput {
  id: string
  answer: string
  is_correct: boolean
}
interface QuestionInput {
  id: string
  question: string
  answers: AnswerInput[]
}
interface Props {
  visible: boolean
  onClose: () => void
  surveyId: string | null
  courses: Course[]
}

export default function EditSurveyModal({
  visible,
  onClose,
  surveyId,
  courses,
}: Props) {
  const mountedRef = useRef(true)
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [courseId, setCourseId] = useState<string>('')
  const [questions, setQuestions] = useState<QuestionInput[]>([])

  // load survey
  useEffect(() => {
    if (!visible || !surveyId) return
    let cancelled = false
    ;(async () => {
      if (mountedRef.current) setLoading(true)
      setError('')
      try {
        const s: Survey = await ApiService.get(
          `${BACKEND_ROUTES.surveys}/${surveyId}`
        )
        if (cancelled || !mountedRef.current) return
        setTitle(s.title ?? '')
        setDescription(s.description ?? '')
        setCourseId(String(s.course?.id ?? ''))
        setQuestions(
          (s.questions ?? []).map(q => ({
            id: q.id ?? '',
            question: q.question ?? '',
            answers: (q.answers ?? []).map(a => ({
              id: a.id ?? '',
              answer: a.answer ?? '',
              is_correct: Boolean(a.is_correct),
            })),
          }))
        )
      } catch (e) {
        console.error('EditSurveyModal load error', e)
        if (mountedRef.current) setError('Error cargando encuesta')
      } finally {
        if (mountedRef.current) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [visible, surveyId])

  const addQuestion = () =>
    setQuestions(qs => [
      ...qs,
      {
        id: '',
        question: '',
        answers: [
          { id: '', answer: '', is_correct: true },
          { id: '', answer: '', is_correct: false },
        ],
      },
    ])
  const removeQuestion = () =>
    setQuestions(qs => (qs.length > 1 ? qs.slice(0, -1) : qs))

  const onQuestionChange = (idx: number, text: string) =>
    setQuestions(qs => {
      const c = [...qs]
      c[idx] = { ...c[idx], question: text }
      return c
    })

  const addAnswer = (qidx: number) =>
    setQuestions(qs => {
      const c = qs.map(q => ({ ...q, answers: [...q.answers] }))
      c[qidx].answers.push({ id: '', answer: '', is_correct: false })
      return c
    })
  const removeAnswer = (qidx: number) =>
    setQuestions(qs => {
      const c = qs.map(q => ({ ...q, answers: [...q.answers] }))
      if (c[qidx].answers.length > 2) c[qidx].answers.pop()
      return c
    })

  const onAnswerChange = (
    qidx: number,
    aidx: number,
    text: string
  ) =>
    setQuestions(qs => {
      const c = qs.map(q => ({ ...q, answers: [...q.answers] }))
      c[qidx].answers[aidx] = { ...c[qidx].answers[aidx], answer: text }
      return c
    })

  // toggleCorrect: only update the targeted question so each question keeps its own correct answer
  const toggleCorrect = (qidx: number, aidx: number) =>
    setQuestions(qs =>
      qs.map((q, i) => {
        if (i !== qidx) return q
        return {
          ...q,
          answers: q.answers.map((a, j) => ({
            ...a,
            is_correct: j === aidx,
          })),
        }
      })
    )

  const validate = () =>
    courseId &&
    title.trim().length > 0 &&
    description.trim().length > 0 &&
    questions.length > 0 &&
    questions.every(
      q =>
        q.question.trim().length > 0 &&
        q.answers.length >= 2 &&
        q.answers.every(a => a.answer.trim().length > 0) &&
        q.answers.some(a => a.is_correct)
    )

  const onSubmit = async () => {
    setError('')
    if (!validate()) {
      setError(
        'Completa todos los campos y marca una respuesta correcta por pregunta'
      )
      return
    }
    if (!surveyId) {
      setError('Encuesta inválida')
      return
    }
    setUpdating(true)
    try {
      const questionIds: string[] = []
      for (const q of questions) {
        const answerIds: string[] = []
        for (const a of q.answers) {
          const respA: { id: string } = a.id
            ? await ApiService.put(
                `${BACKEND_ROUTES.answers}/${a.id}`,
                { answer: a.answer.trim(), is_correct: Boolean(a.is_correct) }
              )
            : await ApiService.post(BACKEND_ROUTES.answers, {
                answer: a.answer.trim(),
                is_correct: Boolean(a.is_correct),
              })
          answerIds.push(respA.id)
        }
        const respQ: { id: string } = q.id
          ? await ApiService.put(
              `${BACKEND_ROUTES.questions}/${q.id}`,
              { question: q.question.trim(), answers_id: answerIds }
            )
          : await ApiService.post(BACKEND_ROUTES.questions, {
              question: q.question.trim(),
              answers_id: answerIds,
            })
        questionIds.push(respQ.id)
      }
      await ApiService.put(`${BACKEND_ROUTES.surveys}/${surveyId}`, {
        title: title.trim(),
        description: description.trim(),
        course_id: Number(courseId),
        question_id: questionIds,
      })
      if (!mountedRef.current) return
      onClose()
    } catch (e: any) {
      console.error('EditSurveyModal submit error', e)
      if (mountedRef.current) setError(e?.message || 'Error actualizando encuesta')
    } finally {
      if (mountedRef.current) setUpdating(false)
    }
  }

  if (!visible) return null

  return (
    <Modal showModal={visible} setShowModal={onClose} onClose={onClose}>
      {(loading || updating) ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.status}>
            {loading ? 'Cargando encuesta...' : 'Actualizando encuesta...'}
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.header}>Editar encuesta</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}

          {/* Curso selector */}
          <Text style={styles.label}>Curso</Text>
          <ScrollView horizontal style={styles.pickerContainer}>
            {courses.map(c => (
              <TouchableOpacity
                key={c.id}
                style={[
                  styles.courseBtn,
                  courseId === String(c.id) && styles.courseBtnSelected,
                ]}
                onPress={() => setCourseId(String(c.id))}
              >
                <Text
                  style={[
                    styles.courseBtnText,
                    courseId === String(c.id) && styles.courseBtnTextSelected,
                  ]}
                >
                  {c.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Título y descripción */}
          <TextInput
            style={styles.input}
            placeholder="Título"
            placeholderTextColor={COLORS.primaryOpaque}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Descripción"
            placeholderTextColor={COLORS.primaryOpaque}
            multiline
            value={description}
            onChangeText={setDescription}
          />

          {/* Preguntas */}
          {questions.map((q, qi) => (
            <View key={qi} style={styles.questionBlock}>
              <View style={styles.questionHeader}>
                <Text style={styles.subheading}>Pregunta {qi + 1}</Text>
                <View style={styles.questionBtns}>
                  <TouchableOpacity onPress={() => addAnswer(qi)}>
                    <FontAwesome5 name="plus" size={16} color={COLORS.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removeAnswer(qi)}>
                    <FontAwesome5 name="minus" size={16} color={COLORS.primary} />
                  </TouchableOpacity>
                </View>
              </View>
              <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="Texto de la pregunta"
                placeholderTextColor={COLORS.primaryOpaque}
                value={q.question}
                onChangeText={t => onQuestionChange(qi, t)}
              />
              {q.answers.map((a, ai) => (
                <View key={ai} style={styles.answerRow}>
                  <TouchableOpacity
                    style={[
                      styles.checkbox,
                      a.is_correct && styles.checkboxSelected,
                    ]}
                    onPress={() => toggleCorrect(qi, ai)}
                  />
                  <TextInput
                    style={[styles.input, styles.answerInput]}
                    placeholder={`Respuesta ${ai + 1}`}
                    placeholderTextColor={COLORS.primaryOpaque}
                    value={a.answer}
                    onChangeText={t => onAnswerChange(qi, ai, t)}
                  />
                </View>
              ))}
            </View>
          ))}

          {/* Añadir/Quitar preguntas */}
          <View style={styles.addRemove}>
            <TouchableOpacity onPress={addQuestion}>
              <FontAwesome5 name="plus" size={20} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={removeQuestion}>
              <FontAwesome5 name="minus" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={updating}>
            <Text style={styles.buttonText}>Guardar cambios</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </Modal>
  )
}