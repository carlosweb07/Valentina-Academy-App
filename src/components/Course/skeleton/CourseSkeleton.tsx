import React from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS } from '../../../constants/colors'
import styles from './styles'

export default function CourseSkeleton() {
  return (
    <View style={styles.cardSkeleton}>
      {/* Imagen Skeleton */}
      <View style={styles.imgContainer}>
        <LinearGradient
          colors={[COLORS.skeletonDark, COLORS.skeletonLight, COLORS.skeletonDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.imgSkeleton}
        />
      </View>

      {/* Info Skeleton */}
      <View style={styles.infoSkeleton}>
        <LinearGradient
          colors={[COLORS.skeletonDark, COLORS.skeletonLight, COLORS.skeletonDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.titleSkeleton}
        />
        {Array.from({ length: 6 }).map((_, i) => (
          <LinearGradient
            key={i}
            colors={[COLORS.skeletonDark, COLORS.skeletonLight, COLORS.skeletonDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.descriptionSkeleton}
          />
        ))}
      </View>
    </View>
  )
}
