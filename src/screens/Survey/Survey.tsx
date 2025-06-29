import React, { useState, useEffect, useContext, useRef } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native'
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack'
import { useTimer } from 'react-timer-hook'
import { ContextApp } from '../../context/ContextApp'
import ApiService from '../../services/Api'
import { BACKEND_ROUTES } from '../../constants/routes'
import { COLORS } from '../../constants/message'
import SurveyComponent from './components/Survey/Survey'
import PrevCertificate from './components/PrevCertificate/PrevCertificate' 
import type { RootStackParamList } from '../../navigation/types'

import styles from './styles'

type SurveyRouteProp = RouteProp<RootStackParamList, 'Survey'>

export default function Survey() {
  // params: { course_id: string }
  const { params } = useRoute<SurveyRouteProp>()
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const { user } = useContext(ContextApp)
  const [surveyStart, setSurveyStart] = useState(false)
  const [counter, setCounter] = useState(3)
  const [error, setError] = useState('')
  const [surveyData, setSurveyData] = useState<any>(null)
  const [answersSelected, setAnswersSelected] = useState<string[]>([])
  const [percentage, setPercentage] = useState(0)
  const [certificateUrl, setCertificateUrl] = useState('')
  const [certificateData, setCertificateData] = useState({
    user_full_name: '',
    course_title: '',
    course_author: '',
    day: '',
    month: '',
    year: '',
  })

  // timer hook para 20 minutos
  const expiry = new Date()
  expiry.setSeconds(expiry.getSeconds() + 1200)
  const { seconds, minutes, restart, start } = useTimer({
    expiryTimestamp: expiry,
    onExpire: onEndSurvey,
    autoStart: false,
  })

  // ---- 1) Carga encuesta ----
  useEffect(() => {
    (async () => {
      if (!params.course_id) {
        navigation.navigate('Home')
        return
      }
      try {
        const resp = await ApiService.get<any[]>(
          BACKEND_ROUTES.surveys,
          { course_id: params.course_id }
        )
        setSurveyData(resp[0])
      } catch {
        navigation.navigate('Home')
      }
    })()
  }, [navigation, params.course_id])

  // ---- 2) Conteo inicial 3…2…1…GO → arranca temporizador ----
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  useEffect(() => {
    if (surveyStart && counter > 0) {
      intervalRef.current = setInterval(() => {
        setCounter(c => c - 1)
      }, 1000)
    } else if (surveyStart && counter === 0) {
      start()
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [surveyStart, counter, start])

  function onStartSurvey() {
    setError('')
    setCounter(3)
    setSurveyStart(true)
  }

  // ---- 3) Finalizar prueba manual ----
  function onValidateAnswers() {
    if (
      !surveyData?.questions ||
      answersSelected.length !== surveyData.questions.length
    ) {
      setError('Completa todas las respuestas')
      return
    }
    onEndSurvey()
  }

  // ---- 4) Fin de prueba (automático o manual) ----
  async function onEndSurvey() {
    restart(new Date()) // resetea timer
    // calcula porcentaje
    let correct = 0
    surveyData.questions.forEach((q: any, i: number) => {
      const sel = answersSelected[i]
      const ans = q.answers.find((a: any) => a.answer === sel)
      if (ans?.is_correct) correct++
    })
    const pct = Math.floor((100 * correct) / surveyData.questions.length)
    setPercentage(pct)

    if (pct > 50) {
      // genera certificado
      try {
        const cert = await ApiService.post(
          BACKEND_ROUTES.export_certificate,
          { user_id: user.id, course_id: surveyData.course.id }
        )
        // asumimos que backend nos devuelve URL
        setCertificateUrl(cert.url)
        // fecha actual
        const d = new Date().toISOString().split('T')[0].split('-')
        setCertificateData({
          user_full_name: `${user.first_name} ${user.last_name}`,
          course_title: surveyData.course.title,
          course_author: `${surveyData.course.user.first_name} ${surveyData.course.user.last_name}`,
          day: d[2],
          month: d[1],
          year: d[0],
        })
      } catch (e) {
        Alert.alert('Error', 'No se pudo generar certificado')
      }
      setError('Aprobaste la prueba 🎉')
    } else {
      setError('Reprobaste la prueba :(')
    }
  }

  function onExportCertificate() {
    // descarga o abre en navegador
    if (certificateUrl) {
      // @ts-ignore
      Linking.openURL(certificateUrl)
      navigation.navigate('Home')
    }
  }

  // ---- 5) Render por estados ----
  const renderInitial = () => (
    <View>
      <Text style={styles.heading}>¿Listo para la prueba?</Text>
      <Text style={styles.paragraph}>
        Tendrás 20 minutos para responder preguntas del curso.
      </Text>
      <TouchableOpacity style={styles.btn} onPress={onStartSurvey}>
        <Text style={styles.btnText}>Ir a la prueba ahora</Text>
      </TouchableOpacity>
    </View>
  )

  const renderCountdown = () => (
    <View style={styles.center}>
      <Text style={styles.counter}>{counter}</Text>
    </View>
  )

  const renderSurvey = () => (
    <View>
      <Text style={styles.timer}>
        Tiempo restante:{' '}
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}
      </Text>
      <SurveyComponent
        survey={surveyData}
        onSelectAnswers={setAnswersSelected}
      />
      <TouchableOpacity style={styles.btn} onPress={onValidateAnswers}>
        <Text style={styles.btnText}>Terminar prueba</Text>
      </TouchableOpacity>
      {error ? <Text style={[styles.error, { backgroundColor: COLORS.error }]}>{error}</Text> : null}
    </View>
  )

  const renderResults = () => (
    <View style={styles.results}>
      <Text style={styles.heading}>{error}</Text>
      <Text style={styles.percentage}>{percentage}/100</Text>
      <Text style={styles.paragraph}>
        {percentage > 50
          ? '¡Felicitaciones! ahora tendrás acceso a tu certificado.'
          : 'No aprobaste. Necesitas más del 50% para obtener el certificado.'}
      </Text>

      {percentage > 50 && (
        <PrevCertificate data={certificateData} />
      )}

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.btnText}>
          {percentage > 50 ? 'Volver al inicio' : 'Reintentar más tarde'}
        </Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!surveyStart
        ? renderInitial()
        : counter > 0
        ? renderCountdown()
        : minutes === 0 && seconds === 0
        ? renderResults()
        : renderSurvey()}
    </ScrollView>
  )
}
