// src/modules/Course/screens/PayCoursePage.tsx
import React, { useContext, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import ApiService from '../../../services/Api'
import { ContextApp } from '../../../context/ContextApp'
import { BACKEND_ROUTES } from '../../../constants/routes'
import { COLORS } from '../../../constants/colors'
import PayCourseSkeleton from './skeleton/PayCourseSkeleton'
import styles from './styles'

import fondo from '../../../../assets/background.jpg'

export default function PayCoursePage({ course }: { course: any }) {
  const { user } = useContext(ContextApp)
  const navigation = useNavigation<NavigationProp<any>>()
  const [errorMsg, setErrorMsg] = useState('')

  const onBuy = async () => {
    try {
      const resp = await ApiService.post(
        BACKEND_ROUTES.purchased_courses,
        { course: course.id, user: user.id, is_purchased: true }
      )
      if (resp.error) {
        setErrorMsg(resp.error)
      } else {
        navigation.navigate('Home')
      }
    } catch (err) {
      setErrorMsg('Error al procesar la compra')
      console.warn(err)
    }
  }

  if (!course) {
    return <PayCourseSkeleton />
  }

  return (
    <ImageBackground
      source={fondo}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.details}>
          <ImageBackground
            source={{ uri: course.media.url_cover }}
            style={styles.imageContainer}
            imageStyle={styles.imageMask}
          />
          <View style={styles.detailsContent}>
            <Text style={styles.title}>{course.title}</Text>
            <Text style={styles.desc}>{course.description}</Text>
            <Text style={styles.price}>
              Precio: <Text style={styles.priceBold}>{course.price}$</Text>
            </Text>

              <TouchableOpacity onPress={onBuy} style={styles.button}>
              <FontAwesome5 name="shopping-cart" size={20} color={COLORS.dark} />
              <Text style={styles.buttonText}>Comprar ahora</Text>
              </TouchableOpacity>

            {errorMsg ? (
              <TouchableOpacity onPress={() => setErrorMsg('')}>
                <View style={[styles.message, { backgroundColor: COLORS.error }]}>
                  <FontAwesome5 name="exclamation" size={16} color={COLORS.white} />
                  <Text style={styles.messageText}>{errorMsg}</Text>
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}
