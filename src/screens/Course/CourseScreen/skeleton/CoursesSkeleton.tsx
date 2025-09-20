// src/modules/Course/screens/CoursePageSkeleton.tsx
import React, { useRef, useEffect } from 'react'
import {
  View,
  ScrollView,
  Dimensions,
  Animated,
  StyleSheet,
  Easing,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS } from '../../../../constants/colors'
import styles from './styles'

const { width } = Dimensions.get('window')
const VIDEO_HEIGHT = width * 0.5625  // 16:9 ratio
const DETAIL_WIDTH = width * 0.45

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient)

export default function CoursePageSkeleton() {
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

  const shimmerStyle = { transform: [{ translateX }] }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Video Skeleton */}
      <View style={[styles.videoContainer, { backgroundColor: COLORS.skeletonDark, overflow: 'hidden' }]}>
        <View style={[styles.videoSkeleton, { height: VIDEO_HEIGHT }]} />
        <AnimatedGradient
          colors={[COLORS.skeletonDark, COLORS.skeletonLight, COLORS.skeletonDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[StyleSheet.absoluteFill, shimmerStyle]}
        />
      </View>

      {/* Details & PDF Skeleton */}
      <View style={styles.detailsSection}>
        {[0, 1].map((block) => (
          <View
            key={block}
            style={[
              styles.detailBlock,
              {
                width: DETAIL_WIDTH,
                backgroundColor: COLORS.skeletonDark,
                overflow: 'hidden',
              },
            ]}
          >
            <View style={styles.titleSkeleton} />
            <View style={styles.descSkeleton} />
            {block === 0 ? (
              <View style={styles.authorContainerSkeleton}>
                <View style={[styles.authorImgSkeleton, { backgroundColor: COLORS.skeletonDark, overflow: 'hidden' }]}>
                  <AnimatedGradient
                    colors={[COLORS.skeletonDark, COLORS.skeletonLight, COLORS.skeletonDark]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[StyleSheet.absoluteFill, shimmerStyle]}
                  />
                </View>
                <View style={[styles.authorNameSkeleton, { backgroundColor: COLORS.skeletonDark, overflow: 'hidden' }]}>
                  <AnimatedGradient
                    colors={[COLORS.skeletonDark, COLORS.skeletonLight, COLORS.skeletonDark]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[StyleSheet.absoluteFill, shimmerStyle]}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.pdfContainerSkeleton}>
                <View style={[styles.pdfIconSkeleton, { backgroundColor: COLORS.skeletonDark, overflow: 'hidden' }]}>
                  <AnimatedGradient
                    colors={[COLORS.skeletonDark, COLORS.skeletonLight, COLORS.skeletonDark]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[StyleSheet.absoluteFill, shimmerStyle]}
                  />
                </View>
                <View style={[styles.pdfTextSkeleton, { backgroundColor: COLORS.skeletonDark, overflow: 'hidden' }]}>
                  <AnimatedGradient
                    colors={[COLORS.skeletonDark, COLORS.skeletonLight, COLORS.skeletonDark]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[StyleSheet.absoluteFill, shimmerStyle]}
                  />
                </View>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Recipe Skeleton */}
      <View style={[styles.recipeSkeleton, { width: width * 0.9 }]}>
        <View style={[styles.recipeTitleSkeleton, { backgroundColor: COLORS.skeletonDark, overflow: 'hidden' }]}>
          <AnimatedGradient
            colors={[COLORS.skeletonDark, COLORS.skeletonLight, COLORS.skeletonDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[StyleSheet.absoluteFill, shimmerStyle]}
          />
        </View>
        <View style={[styles.recipeDescSkeleton, { backgroundColor: COLORS.skeletonDark, overflow: 'hidden' }]}>
          <AnimatedGradient
            colors={[COLORS.skeletonDark, COLORS.skeletonLight, COLORS.skeletonDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[StyleSheet.absoluteFill, shimmerStyle]}
          />
        </View>
        <View style={styles.recipeContainerSkeleton}>
          {[0, 1].map((col) => (
            <View key={col} style={[styles.recipePart, { width: col === 0 ? DETAIL_WIDTH : width - DETAIL_WIDTH - 40 }]}>
              <View style={[styles.recipeSectionTitleSkeleton, { backgroundColor: COLORS.skeletonDark, overflow: 'hidden' }]}>
                <AnimatedGradient
                  colors={[COLORS.skeletonDark, COLORS.skeletonLight, COLORS.skeletonDark]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[StyleSheet.absoluteFill, shimmerStyle]}
                />
              </View>
              {Array.from({ length: col === 0 ? 4 : 5 }).map((_, i) => (
                <View
                  key={i}
                  style={[styles.listItemSkeleton, { backgroundColor: COLORS.skeletonDark, overflow: 'hidden' }]}
                >
                  <AnimatedGradient
                    colors={[COLORS.skeletonDark, COLORS.skeletonLight, COLORS.skeletonDark]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[StyleSheet.absoluteFill, shimmerStyle]}
                  />
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}
