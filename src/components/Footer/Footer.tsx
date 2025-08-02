// src/shared/components/Footer/Footer.tsx
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import styles from './styles'

const INSTAGRAM_URL =
  'https://www.instagram.com/academia_valentina_2/?igsh=eXM3cHB0bGoxN2x6'

export default function Footer() {
  const openInstagram = () => {
    Linking.openURL(INSTAGRAM_URL).catch(err =>
      console.warn('Error abriendo Instagram:', err)
    )
  }

  return (
    <View style={styles.footer}>
      <Text style={styles.text}>
        <Text style={styles.bold}>
          Todos los derechos reservados a la empresa Academia Valentina
        </Text>
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>2025</Text>
      </Text>
      <TouchableOpacity onPress={openInstagram} activeOpacity={0.7}>
        <View style={styles.instagramContainer}>
          <FontAwesome5
            name="instagram"
            size={20}
            color={styles.instagramIcon.color}
            style={styles.instagramIcon}
          />
          <Text style={styles.instagramText}>
            @academia_valentina_2
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
