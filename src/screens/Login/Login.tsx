// src/screens/LoginScreen.tsx
import React, { useState, useRef, useContext } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ApiService from '../../services/Api'
import { ContextApp } from '../../context/ContextApp'
import { translateError } from '../../utils/errorTranslate'
import { BACKEND_ROUTES } from '../../constants/routes'
import { COLORS } from '../../constants/colors'
import type { RootStackParamList } from '../../navigation/types'

import background from '../../../assets/background.jpg'

import styles from './styles'
import { User } from '../../interfaces/Models'

export default function Login() {
  const [user, setUser] = useState({ username: '', password: '' })
  const [message, setMessage] = useState({ value: '', color: COLORS.error })
  const msgOpacity = useRef(new Animated.Value(0)).current
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const { setUser: setContextUser } = useContext(ContextApp)

  const showMessage = () => {
    Animated.timing(msgOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }
  const hideMessage = () => {
    Animated.timing(msgOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  const onChange = (key: 'username' | 'password', val: string) =>
    setUser(prev => ({ ...prev, [key]: val }))

  const onSubmit = async () => {
    setMessage({ value: 'Iniciando sesión...', color: COLORS.success })
    showMessage()

    try {
      if(!user.username || !user.password) {
        setMessage({ value: "Faltan campos por llenar", color: COLORS.error })
        showMessage()
        return
      }
      const resp = await ApiService.post<{ token?: any; error?: string, user: User }>(
        BACKEND_ROUTES.login,
        user
      )
      if (resp.token) {
        await AsyncStorage.setItem('access_token', resp.token)
        setContextUser({
          username: user.username,
          id: resp.user.id,
          email: resp.user.email,
          first_name: resp.user.first_name,
          last_name: resp.user.last_name,
          role: "student"
        })
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
      } else {
        setMessage({
          value: translateError(Object.values(resp)[0]),
          color: COLORS.error,
        })
        showMessage()
      }
    } catch (err) {
      setMessage({ value: `Error: ${err}`, color: COLORS.error })
      showMessage()
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
    <ImageBackground 
        source={background} 
        style={styles.container} 
        resizeMode='cover'
      >
        <View style={styles.box}>
          <Text style={styles.title}>Inicio de Sesión</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Nombre de usuario <Text style={{ color: COLORS.error }}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Usuario"
              placeholderTextColor={styles.inputPlaceholder.color}
              value={user.username}
              onChangeText={val => onChange('username', val)}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Contraseña <Text style={{ color: COLORS.error }}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor={styles.inputPlaceholder.color}
              value={user.password}
              onChangeText={val => onChange('password', val)}
              secureTextEntry
            />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.redirect}>
              ¿No tienes cuenta? Regístrate aquí
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>

          <Animated.View
            style={[styles.message, { opacity: msgOpacity }]}
            pointerEvents="none"
          >
            <TouchableOpacity onPress={hideMessage}>
              <Text style={[styles.messageText, { color: message.color }]}>
                {message.value}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}
