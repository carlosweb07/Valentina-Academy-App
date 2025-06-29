// src/shared/components/HeaderCard/HeaderCard.tsx
import React from 'react'
import {
  View,
  Text,
  ImageBackground,
} from 'react-native'
import styles from './styles'

interface Props {
  presentation: string
  img: string
}

export default function HeaderCard({ presentation, img }: Props) {
  return (
    <View style={styles.card}>
      <ImageBackground
        source={{ uri: img }}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <Text style={styles.text}>{presentation}</Text>
        </View>
      </ImageBackground>
    </View>
  )
}
