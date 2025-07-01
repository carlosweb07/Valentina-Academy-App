// src/screens/NotFoundScreen.tsx
import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import Navbar from '../../components/Navbar/Navbar'
import type { RootStackParamList } from '../../navigation/types'

import styles from './styles'

// Ajusta la ruta según dónde pongas tu asset
import confusedImg from '../../../assets/confundido.png'

export default function NotFoundScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={confusedImg} style={styles.image} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Página no encontrada</Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>
                La página a la que trataste de acceder no existe.
              </Text>
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Landing')}>
              <Text style={styles.link}>
                Te invitamos a visitar nuestra página principal aquí
              </Text>
            </TouchableOpacity>
            <Text style={styles.text}>
              para que descubras todo lo que ofrecemos.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
