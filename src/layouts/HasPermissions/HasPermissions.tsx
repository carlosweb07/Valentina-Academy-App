import React, { useContext, useState, useEffect } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { ContextApp } from '../../context/ContextApp'
import { BACKEND_ROUTES } from '../../constants/routes'
import ApiService from '../../services/Api'
import type { RootStackParamList } from '../../navigation/types'
import { RoleItem } from '../../interfaces/App'

interface Props {
  children: React.ReactNode
  role: RoleItem
}

export default function HasPermissions({ children, role }: Props) {
  const { user } = useContext(ContextApp)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const [loading, setLoading] = useState(true)
  const roles = Object.keys(role);

  useEffect(() => {
    let isMounted = true

    async function checkPermissions() {
      try {
        // Si no hay usuario logueado, redirige al Landing
        if (!user.id) {
          navigation.navigate('Landing')
          return
        }

        // Llamada al backend para obtener el rol
        type Response = { role?: string }
        const resp = await ApiService.get<Response>(`${BACKEND_ROUTES.roles}/${user.id}`)
        const serverRole: string | undefined = resp?.role

        if (!serverRole) {
          navigation.navigate('Landing')
          return
        }

        // Chequeo según tipo de "role" (string o array)
        const allowed = roles.includes(serverRole)

        if (!allowed) {
          navigation.navigate('Landing')
          return
        }
      } catch (error) {
        console.warn('HasPermissions error:', error)
        navigation.navigate('Landing')
      } finally {
        // Sólo actualizamos estado si el componente sigue montado
        if (isMounted) setLoading(false)
      }
    }

    checkPermissions()

    return () => {
      isMounted = false
    }
  }, [navigation, role, user.id])

  // Mientras comprobamos, mostramos loader full-screen
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ecd553" />
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
