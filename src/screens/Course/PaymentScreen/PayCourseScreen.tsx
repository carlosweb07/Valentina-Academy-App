// src/modules/Course/screens/PayCoursePage.tsx
import React, { useContext, useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import ApiService from '../../../services/Api'
import { ContextApp } from '../../../context/ContextApp'
import { BACKEND_ROUTES } from '../../../constants/routes'
import { colors } from '../../../constants/colors'
import PayCourseSkeleton from './skeleton/PayCourseSkeleton'
import styles from './styles'

export default function PayCoursePage({ course }: { course: any }) {
  const { user } = useContext(ContextApp)
  const navigation = useNavigation()
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.details}>
          <Text style={styles.title}>{course.title}</Text>
          <Text style={styles.desc}>{course.description}</Text>
          <Text style={styles.price}>
            Precio: <Text style={styles.priceBold}>{course.price}$</Text>
          </Text>

          <TouchableOpacity onPress={onBuy} style={styles.button}>
            <FontAwesome5 name="cart-shopping" size={20} color={colors.dark} />
            <Text style={styles.buttonText}>Comprar ahora</Text>
          </TouchableOpacity>

          {errorMsg ? (
            <TouchableOpacity onPress={() => setErrorMsg('')}>
              <View style={[styles.message, { backgroundColor: colors.error }]}>
                <FontAwesome5 name="exclamation" size={16} color={colors.white} />
                <Text style={styles.messageText}>{errorMsg}</Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>

        <ImageBackground
          source={{ uri: course.media.url_cover }}
          style={styles.imageContainer}
          imageStyle={styles.imageMask}
        />
      </ScrollView>
    </SafeAreaView>
  )
}
