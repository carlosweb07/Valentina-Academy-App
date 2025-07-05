// src/screens/LandingScreen.tsx
import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native'
import Navbar from '../../components/Navbar/Navbar'
import Carousel from '../../components/Carousel/Carousel'
import HeaderCard from '../../components/HeaderCard/HeaderCard'
import Footer from '../../components/Footer/Footer'
import { metrics } from '../../constants/metrics'

import present1 from '../../../assets/presentacion_1.png'
import present2 from '../../../assets/presentacion_2.jpg'
import present3 from '../../../assets/presentacion_3.jpg'

import background from '../../../assets/background.jpg'


import styles from './styles'

export default function Landing() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar />
      <ScrollView>
        <ImageBackground 
          source={background} 
          style={styles.image} 
          resizeMode='cover'
        >
          <View style={styles.carouselContainer}>
            <Carousel height={metrics.screenHeight * 0.5}>
              <HeaderCard
                presentation="Bienvenido a la Academia Valentina, ¿Listo para descubrir lo que ofrecemos?"
                img={present1}
              />
              <HeaderCard
                presentation="Aquí aprenderás a crear todo tipo de recetas de la forma más profesional posible"
                img={present2}
              />
              <HeaderCard
                presentation="Así mismo, podrás aprender a como crear los más sabrosos y dulces postres para disfrutar"
                img={present3}
              />
            </Carousel>
          </View>

          <View style={styles.section}>
            <Text style={styles.heading}>¿Quiénes somos?</Text>
            <Text style={styles.paragraph}>
              Somos una academia dedicada a formar a todos aquellos amantes de la
              cocina que son apasionados por la diversidad gastronómica.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.heading}>¿Qué ofrecemos?</Text>
            <Text style={styles.paragraph}>
              Cursos virtuales donde se presentan una gran variedad de recetas de
              todo el mundo desde precios accesibles hasta cursos gratuitos. Dividimos nuestro contenido en dos categorías:
            </Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>
                • Gastronomía: recetas de comidas típicas y de todo el mundo.
              </Text>
              <Text style={styles.listItem}>
                • Repostería: recetas para los amantes de lo dulce.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.heading}>¿Qué necesitas para acceder al sitio?</Text>
            <Text style={styles.paragraph}>
              Crea una cuenta y accede con tus credenciales para descubrir todo lo que tenemos para ti.
            </Text>
          </View>

          <View style={styles.finalSection}>
            <Text style={styles.finalHeading}>
              Si tu sueño siempre ha sido aprender sobre cocina y ser un chef profesional, este es el sitio para ti.
            </Text>
            <Text style={styles.finalSubheading}>
              Accede dándole click al botón de registrarte.
            </Text>
          </View>
        </ImageBackground>

        <Footer />
      </ScrollView>
    </SafeAreaView>
  )
}
