import React, { useState, useEffect, useContext, useRef } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ImageBackground
} from 'react-native'
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack'
import { useTimer } from 'react-timer-hook'
import { ContextApp } from '../../context/ContextApp'
import ApiService from '../../services/Api'
import { BACKEND_ROUTES } from '../../constants/routes'
import { COLORS } from '../../constants/colors'
import SurveyComponent from './components/Survey/Survey'
import PrevCertificate from './components/PrevCertificate/PrevCertificate'
import type { RootStackParamList } from '../../navigation/types'

import { documentDirectory, writeAsStringAsync, EncodingType } from 'expo-file-system/legacy'
import { shareAsync } from 'expo-sharing'

import fondo from '../../../assets/background.jpg'
import styles from './styles'


type SurveyRouteProp = RouteProp<RootStackParamList, 'Survey'>

export default function Survey() {
  const { params } = useRoute<SurveyRouteProp>()
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const { user } = useContext(ContextApp)

  const [surveyStart, setSurveyStart] = useState(false)
  const [counter, setCounter] = useState(3)
  const [error, setError] = useState('')
  const [surveyData, setSurveyData] = useState<any>(null)
  const [answersSelected, setAnswersSelected] = useState<string[]>([])
  const [percentage, setPercentage] = useState<number | null>(null)
  const [btnName, setBtnName] = useState('📄 Descargar certificado!')
  
  const [certificateData, setCertificateData] = useState({
    user_full_name: '',
    course_title: '',
    course_author: '',
    day: '',
    month: '',
    year: '',
  })

  // 20-minute timer
  const expiry = new Date()
  expiry.setSeconds(expiry.getSeconds() + 1200)
  const { seconds, minutes, restart, start } = useTimer({
    expiryTimestamp: expiry,
    onExpire: onEndSurvey,
    autoStart: false,
  })

  // 1) Carga encuesta
  useEffect(() => {
    let isMounted = true
    if (!params.course_id) {
      navigation.navigate('Home')
      return
    }

    ;(async () => {
      try {
        const resp = await ApiService.get<any[]>(
          BACKEND_ROUTES.surveys,
          { course_id: params.course_id }
        )
        if (!isMounted) return

        if (resp.length > 0) {
          setSurveyData(resp[0])
        } else {
          navigation.navigate('Home')
        }
      } catch {
        if (isMounted) navigation.navigate('Home')
      }
    })()

    return () => {
      isMounted = false
    }
  }, [navigation, params.course_id])

  // 2) Conteo inicial 3…2…1
  const startCalled = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!surveyStart) return

    if (counter > 0) {
      timeoutRef.current = setTimeout(() => {
        setCounter(c => c - 1)
      }, 1000)

      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
      }
    }

    if (!startCalled.current) {
      start()
      startCalled.current = true
    }
  }, [surveyStart, counter, start])

  // onStartSurvey sin restart instantáneo
  function onStartSurvey() {
    setError('')
    setCounter(3)
    setPercentage(null)
    setAnswersSelected([])
    startCalled.current = false
    setSurveyStart(true)
  }

  // 3) Validación manual
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

  // 4) Fin de prueba
  async function onEndSurvey() {
    restart(new Date())  // reset timer for next run
    if (!surveyData) return

    const correct = surveyData.questions.reduce(
      (sum: number, q: any, i: number) =>
        sum +
        (q.answers.find((a: any) => a.answer === answersSelected[i])
          ?.is_correct
          ? 1
          : 0),
      0
    )

    const pct = Math.floor((100 * correct) / surveyData.questions.length)
    setPercentage(pct)

    if (pct > 50) {
      setError('Aprobaste la prueba 🎉')
      try {
        const cert = await ApiService.post(
          BACKEND_ROUTES.export_certificate,
          { user_id: user.id, course_id: surveyData.course.id }
        )
        const [year, month, day] = new Date().toISOString().split('T')[0].split('-')
        setCertificateData({
          user_full_name: `${user.first_name} ${user.last_name}`,
          course_title: surveyData.course.title,
          course_author: `${surveyData.course.user.first_name} ${surveyData.course.user.last_name}`,
          day,
          month,
          year,
        })
      } catch {
        Alert.alert('Error', 'No se pudo generar certificado')
      }
    } else {
      setError('Reprobaste la prueba :(')
    }
  }

  const onExportCertificate = async () => {
    setBtnName("Descargando...")
    try {
      const blob = await ApiService.post<any>(
        BACKEND_ROUTES.export_certificate,
        { user_id: user.id, course_id: surveyData.course.id }
      )
      
      const localUri = documentDirectory + "certificate_" + surveyData.course.title.toLowerCase().replace(/ /g, "_") + ".pdf";

      const base64: string = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
          const dataUrl = reader.result as string;
          const [, rawBase64] = dataUrl.split(',');
          resolve(rawBase64);
        };
        reader.readAsDataURL(blob);
      });

      await writeAsStringAsync(localUri, base64, {
        encoding: EncodingType.Base64,
      });

      await shareAsync(localUri);

    } catch (error) {
      console.error('Error al exportar receta:', error);
    } finally {
      setBtnName("📄 Descargar certificado!")
    }
  }

  // Renderizado según estado
  const renderInitial = () => (
    <>
      <Text style={styles.heading}>¿Listo para la prueba?</Text>
      <Text style={styles.paragraph}>
        Tendrás 20 minutos para responder preguntas del curso.
      </Text>
      <TouchableOpacity style={styles.btn} onPress={onStartSurvey}>
        <Text style={styles.btnText}>Ir a la prueba ahora</Text>
      </TouchableOpacity>
    </>
  )

  const renderCountdown = () => <Text style={styles.counter}>{counter}</Text>

  const renderSurvey = () => (
    <>
      <Text style={styles.timer}>
        Tiempo restante:{' '}
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}
      </Text>
      <SurveyComponent
        survey={surveyData}
        onSelectAnswers={setAnswersSelected}
        onValidateAnswers={onValidateAnswers}
      />
      {error ? (
        <Text style={[styles.error, { backgroundColor: COLORS.error }]}>
          {error}
        </Text>
      ) : null}
    </>
  )

  const renderResults = () => (
    <ScrollView style={styles.results}>
      <Text style={styles.heading}>{error}</Text>
      <Text style={styles.percentage}>{percentage}/100</Text>
      <Text style={styles.paragraph}>
        {percentage! > 50
          ? '¡Felicitaciones! ahora tendrás acceso a tu certificado.'
          : 'No aprobaste. Necesitas más del 50% para obtener el certificado.'}
      </Text>

      {percentage! > 50 && (
        <>
          <PrevCertificate data={certificateData} />
          <TouchableOpacity
            style={styles.btn}
            onPress={onExportCertificate}
          >
            <Text style={styles.btnText}>
              {btnName}
            </Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.btnText}>
          {percentage! > 50 ? 'Volver al inicio' : 'Reintentar más tarde'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )

  return (
    <ImageBackground source={fondo} style={styles.imgContainer}>
      <View style={styles.cardView}>
        {!surveyStart
          ? renderInitial()
          : counter > 0
          ? renderCountdown()
          : minutes === 0 && seconds === 0
          ? renderResults()
          : renderSurvey()}
      </View>
    </ImageBackground>
  )
}