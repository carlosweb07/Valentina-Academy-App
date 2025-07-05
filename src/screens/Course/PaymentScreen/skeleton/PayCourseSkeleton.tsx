// src/modules/Course/screens/PayCourseSkeleton.tsx
import React from 'react'
import { View, ScrollView, Dimensions } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { COLORS } from '../../../../constants/colors'
import styles from './styles'

export default function PayCourseSkeleton() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SkeletonPlaceholder
        backgroundColor={COLORS.skeletonDark}
        highlightColor={COLORS.skeletonLight}
      >
        {/* Video/payment details skeleton */}
        <View style={styles.detailsSkeleton} />
        {/* Image skeleton */}
        <View style={styles.imageSkeleton} />
      </SkeletonPlaceholder>
    </ScrollView>
  )
}
