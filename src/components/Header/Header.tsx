// src/modules/Course/components/Header.tsx
import React, { useContext } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import { ContextApp } from '../../context/ContextApp'
import styles from './styles'

// Ajusta rutas a tus assets
import fondo from '../../../assets/background.png'
import ReposteriaImg from '../../../assets/SIU.png'
import GastronomiaImg from '../../../assets/2.png'

interface Props {
  setCategory: (cat: number | null) => void
}

export default function Header({ setCategory }: Props) {
  const { user } = useContext(ContextApp)

  return (
    <ImageBackground
      source={fondo}
    >
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.greeting}>Bienvenido, {user.username}!</Text>
          <Text style={styles.subTitle}>
            Descubre nuestros cursos, y explora entre las dos principales
            categorías que tenemos para ofrecer
          </Text>
        </View>

        <View style={styles.categories}>
          <TouchableOpacity
            style={styles.category}
            onPress={() => setCategory(1)}
            activeOpacity={0.8}
          >
            <ImageBackground
              source={ReposteriaImg}
              style={styles.imgContent}
              imageStyle={styles.imgStyle}
            >
              <View style={styles.overlay}>
                <Text style={styles.label}>REPOSTERIA</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.category}
            onPress={() => setCategory(2)}
            activeOpacity={0.8}
          >
            <ImageBackground
              source={GastronomiaImg}
              style={styles.imgContent}
              imageStyle={styles.imgStyle}
            >
              <View style={styles.overlay}>
                <Text style={styles.label}>GASTRONOMIA</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}
