// src/shared/components/HeaderCard/HeaderCard.tsx
import React from 'react'
import {
  View,
  Text,
  ImageBackground,
  ImageSourcePropType,
} from 'react-native'
import styles from './styles'

interface Props {
  presentation: string
  img: string
}

export default function HeaderCard({ presentation, img }: Props) {
  console.log(img.toString());
  return (
    <View style={styles.card}>
      <ImageBackground
        source={img as ImageSourcePropType}
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
