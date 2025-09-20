import React, { useState, useEffect, useContext } from 'react'
import { Alert } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { ContextApp } from '../../context/ContextApp'
import ApiService from '../../services/Api'
import { BACKEND_ROUTES } from '../../constants/routes'
import Loading from '../../components/Loading/Loading'
import type { RootStackParamList } from '../../navigation/types'
import HomeScreen from './HomeScreen'

export default function Index() {
  const { user } = useContext(ContextApp)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function redirectByRole() {
      try {
        const resp = await ApiService.get<{ role: string }>(
          `${BACKEND_ROUTES.roles}/${user.id}`
        )

        console.log("resp", resp);
        
        if (!mounted) return

        if (resp.role === 'teacher') {
          navigation.reset({ index: 0, routes: [{ name: 'CoursesAdmin' }] })
        } else if (resp.role === 'admin') {
          navigation.reset({ index: 0, routes: [{ name: 'Admin' }] })
        } else {
          setLoading(false)
        }
      } catch (e) {
        Alert.alert('Error', 'No se pudo verificar el rol')
        navigation.navigate('Home')
      }
    }

    redirectByRole()
    return () => {
      mounted = false
    }
  }, [navigation, user.id])

  if (loading) {
    return <Loading />
  }
  return <HomeScreen />
}
