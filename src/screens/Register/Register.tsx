// src/screens/RegisterScreen.tsx
import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ScrollView,
  ImageBackground,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import ApiService from '../../services/Api'
import { translateError } from '../../utils/errorTranslate'
import { BACKEND_ROUTES } from '../../constants/routes'
import { COLORS } from '../../constants/colors'
import type { RootStackParamList } from '../../navigation/types'

import background from '../../../assets/background.jpg'

import styles from './styles'

interface User {
  first_name: string
  last_name: string
  username: string
  email: string
  password: string
}

export default function Register() {
  const [user, setUser] = useState<User>({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
  })
  const [confirm, setConfirm] = useState('')
  const [message, setMessage] = useState({ value: '', color: COLORS.error })
  const msgOpacity = useRef(new Animated.Value(0)).current
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

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

  const onChange = (key: keyof User, val: string) =>
    setUser(prev => ({ ...prev, [key]: val }))
  const onSubmit = async () => {
    if (confirm !== user.password) {
      setMessage({ value: 'Las claves deben coincidir', color: COLORS.error })
      showMessage()
      return
    }

    const values = Object.values(user)

    if(values.includes("")) {
      setMessage({ value: "Faltan campos por llenar", color: COLORS.error })
      showMessage()
      return
    }

    setMessage({ value: 'Registrando...', color: COLORS.success })
    showMessage()
    try {
      const resp = await ApiService.post<{ user?: any; username?: string[]; email?: string[] }>(
        BACKEND_ROUTES.register,
        user
      )

      if (resp.user) {
        navigation.navigate('Login')
      } else {
        setMessage({
          value: translateError(Object.values(resp)[0][0]),
          color: COLORS.error,
        })
        showMessage()
      }
    } catch (err: any) {
      setMessage({ value: translateError(err.message), color: COLORS.error })
      showMessage()
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.avoid}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <ImageBackground 
          source={background} 
          style={styles.container} 
          resizeMode='cover'
        >
          <View style={styles.box}>
            <Text style={styles.title}>Registro</Text>

            {(
              [
                { label: 'Nombres', key: 'first_name' },
                { label: 'Apellidos', key: 'last_name' },
                { label: 'Nombre de usuario', key: 'username' },
                { label: 'Correo', key: 'email' },
                { label: 'Contraseña', key: 'password' },
              ] as const
            ).map(({ label, key }) => (
              <View style={styles.field} key={key}>
                <Text style={styles.label}>{label} <Text style={{ color: COLORS.error }}>*</Text></Text>
                <TextInput
                  style={styles.input}
                  placeholder={label}
                  placeholderTextColor={styles.inputPlaceholder.color}
                  secureTextEntry={key === 'password'}
                  keyboardType={key === 'email' ? 'email-address' : 'default'}
                  autoCapitalize="none"
                  value={(user as any)[key]}
                  onChangeText={val => onChange(key, val)}
                />
              </View>
            ))}

            <View style={styles.field}>
              <Text style={styles.label}>Confirmar Contraseña <Text style={{ color: COLORS.error }}>*</Text></Text>
              <TextInput
                style={styles.input}
                placeholder="Confirmar Contraseña"
                placeholderTextColor={styles.inputPlaceholder.color}
                secureTextEntry
                value={confirm}
                onChangeText={setConfirm}
              />
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.redirect}>
                ¿Ya tienes cuenta? Inicia sesión aquí
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
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
