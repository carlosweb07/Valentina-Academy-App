// src/shared/components/Navbar/Navbar.tsx
import React, { useContext, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { ContextApp, AppContextProps } from '../../context/ContextApp'
import { BACKEND_ROUTES } from '../../constants/routes'
import ApiService from '../../services/Api'
import type { RootStackParamList } from '../../navigation/types'

// Ajusta estos imports según tu estructura de assets
import logoImg from '../../../assets/logo.jpg'
import userPlaceholder from '../../../assets/usuario.png'

import styles from './styles'

export default function Navbar() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const { user, setUser } = useContext(ContextApp) as AppContextProps
  const [showMenu, setShowMenu] = useState(false)

  const signOut = async () => {
    try {
      await ApiService.post(BACKEND_ROUTES.logout, {})
    } catch (e) {
      console.warn('Logout error:', e)
    }
    await AsyncStorage.removeItem('access_token')
    setUser({
      id: '',
      email: '',
      first_name: '',
      last_name: '',
      username: '',
      role: 'student'
    })
    navigation.navigate('Landing')
  }

  const onLogin = () => navigation.navigate('Login')
  const onRegister = () => navigation.navigate('Register')
  const onDashboard = () => navigation.navigate('Home')

  return (
    <View style={styles.navbar}>
      <View style={styles.logoContainer}>
        <Image source={logoImg} style={styles.logo} />
      </View>

      <View style={styles.navItems}>
        {!user?.id ? (
          <>
            <TouchableOpacity onPress={onLogin}>
              <Text style={styles.navText}>Inicia Sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onRegister}>
              <Text style={styles.navText}>Regístrate</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={onDashboard}>
            <Text style={styles.navText}>Dashboard</Text>
          </TouchableOpacity>
        )}

        {user?.id && (
          <View>
            <TouchableOpacity onPress={() => setShowMenu(v => !v)}>
              <Image source={userPlaceholder} style={styles.userLogo} />
            </TouchableOpacity>

            {showMenu && (
              <View style={styles.submenu}>
                <TouchableOpacity>
                  <Text style={styles.submenuItem}>{user.username}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={signOut}>
                  <Text style={[styles.submenuItem, styles.signOut]}>
                    Cerrar Sesión
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  )
}
