import React from 'react'
import { View, Dimensions } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { colors } from '../../../constants/colors'
import styles from './styles'

export default function CourseSkeleton() {
  return (
    <SkeletonPlaceholder
      backgroundColor={colors.skeletonDark}
      highlightColor={colors.skeletonLight}
    >
      <View style={styles.cardSkeleton}>
        {/* Imagen Skeleton */}
        <View style={styles.imgContainer}>
          <View style={styles.imgSkeleton} />
        </View>

        {/* Info Skeleton */}
        <View style={styles.infoSkeleton}>
          <View style={styles.titleSkeleton} />
          {Array.from({ length: 6 }).map((_, i) => (
            <View key={i} style={styles.descriptionSkeleton} />
          ))}
        </View>
      </View>
    </SkeletonPlaceholder>
  )
}
