// src/modules/Course/components/Courses.tsx
import React, { ReactNode, useRef } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { styles } from './styles'
import { COLORS } from '../../constants/colors'

interface Props {
  children: ReactNode[]
  setCategory: (cat: number | null) => void
}

export default function Courses({ children, setCategory }: Props) {
  const spinAnim = useRef(new Animated.Value(0)).current

  const onReload = () => {
    // Resetea la categoría
    setCategory(null)

    // Anima la rotación 360°
    spinAnim.setValue(0)
    Animated.timing(spinAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start()
  }

  // Interpolación de 0→1 a grados
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cursos</Text>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <TouchableOpacity onPress={onReload} style={styles.reloadButton}>
            <FontAwesome5 name="redo-alt" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </Animated.View>
      </View>

      <ScrollView
        contentContainerStyle={styles.coursesContainer}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  )
}