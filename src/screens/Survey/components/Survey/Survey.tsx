// src/modules/Survey/components/Survey.tsx
import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
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
}

export default function SurveyComponent({
  survey,
  onSelectAnswers,
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

  const renderAnswer = (qIndex: number) => (  
    { item, index }: { item: Answer; index: number }
  ) => {
    const selected = selectedIdxs[qIndex] === index
    return (
      <TouchableOpacity
        style={[
          styles.answer,
          selected && styles.answerSelected,
        ]}
        activeOpacity={0.7}
        onPress={() =>
          setSelectedIdxs(idxs =>
            idxs.map((v, i) => (i === qIndex ? index : v))
          )
        }
      >
        <Text
          style={[
            styles.answerText,
            selected && styles.answerTextSelected,
          ]}
        >
          {item.answer}
        </Text>
      </TouchableOpacity>
    )
  }

  const renderQuestion = ({ item, index }: { item: Question; index: number }) => (
    <View style={styles.question} key={index}>
      <Text style={styles.questionText}>{item.question}</Text>
      <FlatList
        data={item.answers}
        renderItem={renderAnswer(index)}
        keyExtractor={(_, i) => i.toString()}
        scrollEnabled={false}
      />
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={survey.questions}
        renderItem={renderQuestion}
        keyExtractor={(_, i) => i.toString()}
      />
    </View>
  )
}
