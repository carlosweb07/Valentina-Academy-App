// src/shared/components/Carousel/Carousel.tsx
import React, { ReactNode, useRef, useState } from 'react'
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native'
import { metrics } from '../../constants/metrics'

import styles from './styles'

const { width } = Dimensions.get('window')

interface Props {
  children: ReactNode[]
  height?: number    // opcional, por defecto 600px (metrics.screenHeight * 0.4)
}

export default function Carousel({ children, height }: Props) {
  const scrollRef = useRef<ScrollView>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const total = children.length
  const containerHeight = height ?? metrics.screenHeight * 0.4

  const moveTo = (index: number) => {
    const newIndex = (index + total) % total
    setCurrentIndex(newIndex)
    scrollRef.current?.scrollTo({ x: newIndex * width, animated: true })
  }

  const onNext = () => moveTo(currentIndex + 1)
  const onPrev = () => moveTo(currentIndex - 1)

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / width)
    setCurrentIndex(idx)
  }

  return (
    <View style={[styles.container, { height: containerHeight }]}>
      <TouchableOpacity style={[styles.arrow, styles.left]} onPress={onPrev}>
        <Text style={styles.arrowText}>{'<'}</Text>
      </TouchableOpacity>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
      >
        {children.map((child, idx) => (
          <View key={idx} style={[styles.slide, { width, height: containerHeight }]}>
            {child}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={[styles.arrow, styles.right]} onPress={onNext}>
        <Text style={styles.arrowText}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  )
}
