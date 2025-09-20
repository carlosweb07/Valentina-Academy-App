// src/modules/Course/screens/PayCourseSkeleton.tsx
import React, { useRef, useEffect } from 'react'
import {
  ScrollView,
  Dimensions,
  View,
  Animated,
  StyleSheet,
  Easing,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS } from '../../../../constants/colors'
import styles from './styles'

const { width } = Dimensions.get('window')  
const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient)

export default function PayCourseSkeleton() {
  // Animación de shimmer
  const translateX = useRef(new Animated.Value(-width)).current

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: width,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start()
  }, [translateX])

  const shimmerStyle = {
    transform: [{ translateX }],
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Video / detalles de pago */}
      <View
        style={[
          styles.detailsSkeleton,
          {
            backgroundColor: COLORS.skeletonDark,
            overflow: 'hidden',
          },
        ]}
      >
        <AnimatedGradient
          colors={[
            COLORS.skeletonDark,
            COLORS.skeletonLight,
            COLORS.skeletonDark,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[StyleSheet.absoluteFill, shimmerStyle]}
        />
      </View>

      {/* Imagen */}
      <View
        style={[
          styles.imageSkeleton,
          {
            backgroundColor: COLORS.skeletonDark,
            overflow: 'hidden',
          },
        ]}
      >
        <AnimatedGradient
          colors={[
            COLORS.skeletonDark,
            COLORS.skeletonLight,
            COLORS.skeletonDark,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[StyleSheet.absoluteFill, shimmerStyle]}
        />
      </View>
    </ScrollView>
  )
}