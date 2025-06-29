// src/modules/Course/screens/PayCourseSkeleton.tsx
import React from 'react'
import { View, ScrollView, Dimensions } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { colors } from '../../../../constants/colors'
import styles from './styles'

export default function PayCourseSkeleton() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SkeletonPlaceholder
        backgroundColor={colors.skeletonDark}
        highlightColor={colors.skeletonLight}
      >
        {/* Video/payment details skeleton */}
        <View style={styles.detailsSkeleton} />
        {/* Image skeleton */}
        <View style={styles.imageSkeleton} />
      </SkeletonPlaceholder>
    </ScrollView>
  )
}
