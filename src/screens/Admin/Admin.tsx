// src/screens/AdminScreen.tsx
import React from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../../components/Navbar/Navbar'
import type { RootStackParamList } from '../../navigation/types'
import fondo from '../../../assets/background.png';

import styles from './styles'

const entities: { label: string; route: keyof RootStackParamList }[] = [
  { label: 'Cursos', route: 'CoursesAdmin' },
  { label: 'Usuarios', route: 'UsersAdmin' },
  { label: 'Recetas', route: 'RecipesAdmin' },
  { label: 'Ingredientes', route: 'IngredientsAdmin' },
  { label: 'Encuestas', route: 'SurveysAdmin' },
]

export default function Admin() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar />
      <ImageBackground
        source={fondo}
        style={styles.container}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Administrador</Text>
          <Text style={styles.subtitle}>
            Selecciona la entidad que deseas administrar
          </Text>

          <View style={styles.entitiesContainer}>
            {entities.map(({ label, route }) => (
              <TouchableOpacity
                key={route}
                style={styles.card}
                activeOpacity={0.8}
                onPress={() => navigation.navigate(route)}
              >
                <Text style={styles.cardText}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}
