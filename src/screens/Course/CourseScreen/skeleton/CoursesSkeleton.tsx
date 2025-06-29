// src/modules/Course/screens/CoursePageSkeleton.tsx
import React from 'react'
import { View, ScrollView, Dimensions } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { colors } from '../../../../constants/colors'
import styles from './styles'

const { width } = Dimensions.get('window')
const VIDEO_HEIGHT = width * 0.5625  // 16:9 ratio
const DETAIL_WIDTH = width * 0.45

export default function CoursePageSkeleton() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SkeletonPlaceholder
        backgroundColor={colors.skeletonDark}
        highlightColor={colors.skeletonLight}
      >
        {/* Video skeleton */}
        <View style={styles.videoContainer}>
          <View style={styles.videoSkeleton} />
        </View>

        {/* Details & PDF skeleton */}
        <View style={styles.detailsSection}>
          <View style={styles.detailsContainer}>
            {/* First detail block */}
            <View style={[styles.detailBlock, { width: DETAIL_WIDTH }]}>
              <View style={styles.titleSkeleton} />
              <View style={styles.descSkeleton} />
              <View style={styles.authorContainerSkeleton}>
                <View style={styles.authorImgSkeleton} />
                <View style={styles.authorNameSkeleton} />
              </View>
            </View>

            {/* Second detail block */}
            <View style={[styles.detailBlock, { width: DETAIL_WIDTH }]}>
              <View style={styles.titleSkeleton} />
              <View style={styles.descSkeleton} />
              <View style={styles.pdfContainerSkeleton}>
                <View style={styles.pdfIconSkeleton} />
                <View style={styles.pdfTextSkeleton} />
              </View>
            </View>
          </View>

          {/* Recipe skeleton */}
          <View style={[styles.recipeSkeleton, { width: width * 0.9 }]}>
            <View style={styles.recipeTitleSkeleton} />
            <View style={styles.recipeDescSkeleton} />
            <View style={styles.recipeContainerSkeleton}>
              <View style={[styles.recipePart, { width: DETAIL_WIDTH }]}>
                <View style={styles.recipeSectionTitleSkeleton} />
                {Array.from({ length: 4 }).map((_, i) => (
                  <View key={i} style={styles.listItemSkeleton} />
                ))}
              </View>
              <View style={[styles.recipePart, { width: width - DETAIL_WIDTH - 40 }]}>
                <View style={styles.recipeSectionTitleSkeleton} />
                {Array.from({ length: 5 }).map((_, i) => (
                  <View key={i} style={styles.listItemSkeleton} />
                ))}
              </View>
            </View>
          </View>
        </View>
      </SkeletonPlaceholder>
    </ScrollView>
  )
}
