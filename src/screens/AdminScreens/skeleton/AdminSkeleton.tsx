// src/modules/admin/skeleton/AdminSkeleton.tsx
import React, { useRef, useEffect } from 'react'
import {
  ScrollView,
  View,
  Dimensions,
  Animated,
  StyleSheet,
  Easing,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient'
import Navbar from '../../../components/Navbar/Navbar'
import { COLORS } from '../../../constants/colors'
import styles from './styles'

const { width, height } = Dimensions.get('window')
const CARD_WIDTH = width * 0.95
const CARD_HEIGHT = height * 0.12
const ICON_SIZE = 20

// Creamos la versión animada de LinearGradient
const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient)

export default function AdminSkeleton() {
  // Valor animado que recorre el ancho de la tarjeta
  const translateX = useRef(new Animated.Value(-CARD_WIDTH)).current

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: CARD_WIDTH,
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
    <SafeAreaView style={styles.safeArea}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        {Array.from({ length: 4 }).map((_, idx) => (
          <View
            key={idx}
            style={[
              styles.card,
              {
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                backgroundColor: COLORS.skeletonDark,
                overflow: 'hidden',
              },
            ]}
          >
            {/* Título Skeleton */}
            <View
              style={[
                styles.titleSkeleton,
                {
                  width: CARD_WIDTH * 0.6,
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

            {/* Iconos Skeleton */}
            <View style={styles.iconsRow}>
              {Array.from({ length: 3 }).map((__, i) => (
                <View
                  key={i}
                  style={[
                    styles.iconSkeleton,
                    {
                      width: ICON_SIZE,
                      height: ICON_SIZE,
                      borderRadius: ICON_SIZE / 2,
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
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
