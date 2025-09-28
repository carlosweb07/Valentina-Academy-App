// src/modules/Survey/components/Survey.tsx
import { useState, useEffect } from 'react'
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native'

import styles from './styles'

export interface Answer {
  answer: string
  is_correct?: boolean
}
export interface Question {
  question: string
  answers: Answer[]
}
export interface SurveyData {
  questions: Question[]
}

interface Props {
  survey: SurveyData
  onSelectAnswers: (selected: string[]) => void
  onValidateAnswers: () => void
}

export default function SurveyComponent({
  survey,
  onSelectAnswers,
  onValidateAnswers
}: Props) {
  // índice de respuesta seleccionada por pregunta
  const [selectedIdxs, setSelectedIdxs] = useState<number[]>(
    Array(survey.questions.length).fill(-1)
  )

  // cuando cambia selección, notificamos parent
  useEffect(() => {
    const selections = selectedIdxs.map((idx, q) =>
      idx >= 0 ? survey.questions[q].answers[idx].answer : ''
    )
    onSelectAnswers(selections)
  }, [selectedIdxs, survey.questions, onSelectAnswers])

  return (
    <ScrollView style={styles.container}>
      {survey.questions.map((q, qi) => (
        <View style={styles.question} key={qi}>
          <Text style={styles.questionText}>{q.question}</Text>
          <View>
            {q.answers.map((ans, ai) => {
              const selected = selectedIdxs[qi] === ai
              return (
                <TouchableOpacity
                  key={ai}
                  style={[
                    styles.answer,
                    selected && styles.answerSelected,
                  ]}
                  activeOpacity={0.7}
                  onPress={() =>
                    setSelectedIdxs(prev =>
                      prev.map((v, i) => (i === qi ? ai : v))
                    )
                  }
                >
                  <Text
                    style={[
                      styles.answerText,
                      selected && styles.answerTextSelected,
                    ]}
                  >
                    {ans.answer}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      ))}
      <TouchableOpacity style={styles.btn} onPress={onValidateAnswers}>
        <Text style={styles.btnText}>Terminar prueba</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}
