import React, { useState, useContext, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { ContextApp } from '../../context/ContextApp'
import { BACKEND_ROUTES } from '../../constants/routes'
import ApiService from '../../services/Api'
import Loading from '../../components/Loading/Loading'
import type { RootStackParamList } from '../../navigation/types'
import { User } from '../../interfaces/Models'

interface Props {
  children: React.ReactNode
}

export default function IsAuthorized({ children }: Props) {
  const [loading, setLoading] = useState(true)
  const { setUser } = useContext(ContextApp)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  useEffect(() => {
    let isMounted = true

    async function authUser() {
      try {
        const token = await AsyncStorage.getItem('access_token')
        if (!token) {
          navigation.navigate('Login')
          return
        }

        type Response = { user?: User }
        const response = await ApiService.get<Response>(`${BACKEND_ROUTES.auth}/${token}`)
        const user = response?.user

        if (!user) {
          navigation.navigate('Login')
          return
        }

        setUser(user)
      } catch (error) {
        console.warn('IsAuthorized:', error)
        navigation.navigate('Login')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    authUser()
    return () => {
      isMounted = false
    }
  }, [navigation, setUser])

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Loading />
      </View>
    )
  }

  return <>{children}</>
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
