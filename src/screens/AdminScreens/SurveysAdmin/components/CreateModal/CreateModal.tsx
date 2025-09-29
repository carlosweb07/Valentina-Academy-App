// src/modules/admin/components/CreateSurveyModal.tsx
import React, { useRef, useState } from 'react'
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
import { Course } from '../../../../../interfaces/Models'
import { COLORS } from '../../../../../constants/colors'

import styles from './styles'

interface AnswerInput {
  answer: string
  is_correct: boolean
}

interface QuestionInput {
  question: string
  answers: AnswerInput[]
}

interface Props {
  visible: boolean
  onClose: () => void
  courses: Course[]
}

export default function CreateModal({
  visible,
  onClose,
  courses,
}: Props) {
  const mountedRef = useRef(true)
  React.useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [courseId, setCourseId] = useState<string>('')
  const [questions, setQuestions] = useState<QuestionInput[]>([
    { question: '', answers: [{ answer: '', is_correct: true }, { answer: '', is_correct: false }] },
  ])
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')

  const addQuestion = () =>
    setQuestions(qs => [
      ...qs,
      { question: '', answers: [{ answer: '', is_correct: true }, { answer: '', is_correct: false }] },
    ])

  const removeQuestion = () =>
    setQuestions(qs => (qs.length > 1 ? qs.slice(0, -1) : qs))

  const onQuestionChange = (idx: number, text: string) =>
    setQuestions(qs => {
      const copy = [...qs]
      copy[idx].question = text
      return copy
    })

  const addAnswer = (qidx: number) =>
    setQuestions(qs => {
      const copy = [...qs]
      copy[qidx].answers.push({ answer: '', is_correct: false })
      return copy
    })

  const removeAnswer = (qidx: number) =>
    setQuestions(qs => {
      const copy = [...qs]
      if (copy[qidx].answers.length > 2) copy[qidx].answers.pop()
      return copy
    })

  const onAnswerChange = (qidx: number, aidx: number, text: string) =>
    setQuestions(qs => {
      const copy = [...qs]
      copy[qidx].answers[aidx].answer = text
      return copy
    })

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
    questions.every(
      q =>
        q.question.trim().length > 0 &&
        q.answers.every(a => a.answer.trim().length > 0) &&
        q.answers.some(a => a.is_correct)
    )

  const onSubmit = async () => {
    setError('')
    if (!validate()) {
      setError('Completa todos los campos y marca una respuesta correcta por pregunta')
      return
    }

    setCreating(true)
    try {
      const questionIds: string[] = []
      for (const q of questions) {
        const answerIds: string[] = []
        for (const a of q.answers) {
          const respA: { id: string } = await ApiService.post(
            BACKEND_ROUTES.answers,
            { answer: a.answer.trim(), is_correct: Boolean(a.is_correct) }
          )
          answerIds.push(respA.id)
        }
        const respQ: { id: string } = await ApiService.post(
          BACKEND_ROUTES.questions,
          { question: q.question.trim(), answers_id: answerIds }
        )
        questionIds.push(respQ.id)
      }

      await ApiService.post(BACKEND_ROUTES.surveys, {
        title: title.trim(),
        description: description.trim(),
        course_id: Number(courseId),
        question_id: questionIds,
      })

      if (!mountedRef.current) return
      // limpiar formulario
      setTitle('')
      setDescription('')
      setCourseId('')
      setQuestions([{ question: '', answers: [{ answer: '', is_correct: true }, { answer: '', is_correct: false }] }])
      onClose()
    } catch (e: any) {
      console.error('CreateSurveyModal error', e)
      setError(e?.message || 'Error creando encuesta')
    } finally {
      if (mountedRef.current) setCreating(false)
    }
  }

  if (!visible) return null

  return (
    <Modal showModal={visible} setShowModal={onClose} onClose={onClose}>
      {creating ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.status}>Creando encuesta...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.header}>Crear nueva encuesta</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}

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

          <Text style={styles.title}>Título</Text>
          <TextInput
            style={styles.input}
            placeholder="Título"
            placeholderTextColor={COLORS.primaryOpaque}
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.title}>Descripción</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Descripción"
            placeholderTextColor={COLORS.primaryOpaque}
            multiline
            value={description}
            onChangeText={setDescription}
          />

          <Text style={styles.title}>Preguntas</Text>
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

          <View style={styles.addRemove}>
            <TouchableOpacity onPress={addQuestion}>
              <FontAwesome5 name="plus" size={20} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={removeQuestion}>
              <FontAwesome5 name="minus" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={creating}>
            <Text style={styles.buttonText}>Crear encuesta</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </Modal>
  )
}