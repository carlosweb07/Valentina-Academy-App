import React, { useContext, useState, useEffect } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { ContextApp } from '../../context/ContextApp'
import { BACKEND_ROUTES } from '../../constants/routes'
import ApiService from '../../services/Api'
import type { RootStackParamList } from '../../navigation/types'
import { RoleItem } from '../../interfaces/App'
import { ROLES } from '../../constants/roles'

interface Props {
  children: React.ReactNode
  role: RoleItem
}

export default function HasPermissions({ children }: Props) {
  const { user } = useContext(ContextApp)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const [loading, setLoading] = useState(true)

  // Normaliza el prop `role` a un array de strings
  const allowedRoles = Object.keys(ROLES)

  useEffect(() => {
    let isMounted = true

    if(!user) return

    async function checkPermissions() {
      try {
        // Llamada al backend según tu lógica
        const resp = await ApiService.get<{ role?: string }>(`${BACKEND_ROUTES.roles}/${user.id}`)
        const serverRole = resp?.role

        if (!serverRole || !allowedRoles.includes(serverRole)) {
          navigation.navigate('Landing')
          return
        }
      } catch (error) {
        console.warn('HasPermissions error:', error)
        navigation.navigate('Landing')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    checkPermissions()

    return () => {
      isMounted = false
    }
  }, [user])

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
