// src/modules/admin/skeleton/AdminSkeleton.tsx
import React from 'react'
import { SafeAreaView, ScrollView, View, Dimensions } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import Navbar from '../../../components/Navbar/Navbar'
import { colors } from '../../../constants/colors'

import styles from './styles'

const { width, height } = Dimensions.get('window')
const CARD_WIDTH = width * 0.95
const CARD_HEIGHT = height * 0.12
const ICON_SIZE = 20

export default function AdminSkeleton() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        <SkeletonPlaceholder
          backgroundColor={colors.skeletonDark}
          highlightColor={colors.skeletonLight}
        >
          {Array.from({ length: 4 }).map((_, idx) => (
            <View key={idx} style={[styles.card, { width: CARD_WIDTH, height: CARD_HEIGHT }]}>
              <View style={[styles.titleSkeleton, { width: CARD_WIDTH * 0.6 }]} />
              <View style={styles.iconsRow}>
                <View style={styles.iconSkeleton} />
                <View style={styles.iconSkeleton} />
                <View style={styles.iconSkeleton} />
              </View>
            </View>
          ))}
        </SkeletonPlaceholder>
      </ScrollView>
    </SafeAreaView>
  )
}
