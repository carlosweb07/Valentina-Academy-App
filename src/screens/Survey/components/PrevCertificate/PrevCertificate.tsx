// src/modules/Survey/components/PrevCertificate.tsx
import React from 'react'
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
} from 'react-native'

import styles from './styles'

interface CertificateData {
  user_full_name: string
  course_title: string
  course_author: string
  day: string
  month: string
  year: string
}

interface Props {
  data: CertificateData
}

const BACKGROUND_URI =
  'https://static.vecteezy.com/system/resources/previews/010/503/533/non_2x/gold-and-white-background-free-vector.jpg'

export default function PrevCertificate({ data }: Props) {
  return (
    <ImageBackground
      source={{ uri: BACKGROUND_URI }}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerH2}>República de Colombia</Text>
        <Text style={styles.headerH3}>Academia Valentina</Text>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <Text style={styles.bodyH2}>Certificado de Participación</Text>
        <Text style={styles.bodyText}>Se otorga el presente certificado a:</Text>
        <Text style={styles.name}>{data.user_full_name}</Text>
        <Text style={styles.bodyTextTitle}>
          Por haber concluido satisfactoriamente:
        </Text>
        <Text style={styles.courseTitle}>{data.course_title}</Text>
        <Text style={styles.details}>
          En constancia de lo expuesto, se firma el presente certificado en
          Colombia, departamento de Bogotá, a los {data.day} días del mes de{' '}
          {data.month} de {data.year}.
        </Text>

        <View style={styles.signatures}>
          <View style={styles.signature}>
            <Text style={styles.signatureName}>{data.course_author}</Text>
            <Text style={styles.signatureRole}>Profesor del curso</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>&copy; {data.year} Academia Valentina</Text>
      </View>
    </ImageBackground>
  )
}
