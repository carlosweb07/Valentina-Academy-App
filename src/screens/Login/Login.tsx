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
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ApiService from '../../services/Api'
import { ContextApp } from '../../context/ContextApp'
import { translateError } from '../../utils/errorTranslate'
import { BACKEND_ROUTES } from '../../constants/routes'
import { COLORS } from '../../constants/message'
import type { RootStackParamList } from '../../navigation/types'

import styles from './styles'

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
      const resp = await ApiService.post<{ token?: string; error?: string }>(
        BACKEND_ROUTES.login,
        user
      )
      if (resp.error) {
        setMessage({ value: translateError(resp.error), color: COLORS.error })
        showMessage()
      } else if (resp.token) {
        await AsyncStorage.setItem('access_token', resp.token)
        setContextUser({
          username: user.username,
          id: '',
          email: '',
          first_name: '',
          last_name: ''
        })
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
      } else {
        setMessage({ value: 'Error inesperado', color: COLORS.error })
        showMessage()
      }
    } catch (err) {
      setMessage({ value: 'Error de red', color: COLORS.error })
      showMessage()
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <View style={styles.box}>
        <Text style={styles.title}>Inicio de Sesión</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Nombre de usuario</Text>
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
          <Text style={styles.label}>Contraseña</Text>
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
    </KeyboardAvoidingView>
  )
}
