// src/screens/PurchaseScreen.tsx
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
import { COLORS } from '../../../../constants/colors'
import background from '../../../../../assets/background.png'

import styles from './styles'
import { BACKEND_ROUTES } from '../../../../constants/routes'
import ApiService from '../../../../services/Api'
import { Course } from '../../../../interfaces/Models'
import { ContextApp } from '../../../../context/ContextApp'

type RootStackParamList = {
  Home: undefined
  Purchase: { price: number }
  PaymentSuccess: undefined
  Register: undefined
  Login: undefined
}

export default function PurchaseScreen({ course }: { course: Course }) {
  const { user } = useContext(ContextApp)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const [card, setCard] = useState({ number: '', expiry: '', cvv: '' })
  const [msg, setMsg] = useState({ text: '', color: COLORS.error })
  const msgOpacity = useRef(new Animated.Value(0)).current

  const showMessage = (text: string, color = COLORS.error) => {
    setMsg({ text, color })
    Animated.timing(msgOpacity, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start()
  }

  const hideMessage = () => {
    Animated.timing(msgOpacity, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start()
  }

  const onChange = (k: 'number' | 'expiry' | 'cvv', val: string) =>
    setCard(prev => ({ ...prev, [k]: val }))

  const onlyDigits = (s: string) => /^[0-9]*$/.test(s)

  const validate = () => {
    const num = card.number.replace(/\s+/g, '')
    if (num.length < 13 || num.length > 19 || !onlyDigits(num)) {
      showMessage('Número de tarjeta inválido')
      return false
    }

    const exp = card.expiry.trim()
    const expMatch = exp.match(/^(\d{1,2})\/(\d{2}|\d{4})$/)
    if (!expMatch) {
      showMessage('Fecha de expiración inválida. Usa MM/AA o MM/AAAA')
      return false
    }
    const month = Number(expMatch[1])
    let year = Number(expMatch[2])
    if (expMatch[2].length === 2) {
      year = 2000 + year
    }
    if (month < 1 || month > 12) {
      showMessage('Mes de expiración inválido')
      return false
    }
    const expDate = new Date(year, month - 1, 1)
    expDate.setMonth(expDate.getMonth() + 1)
    expDate.setDate(0)
    if (expDate < new Date()) {
      showMessage('La tarjeta está vencida')
      return false
    }

    if (!onlyDigits(card.cvv) || (card.cvv.length !== 3 && card.cvv.length !== 4)) {
      showMessage('CVV inválido')
      return false
    }

    return true
  }

  const onSubmit = async () => {
    hideMessage()
    if (!validate()) return

    showMessage('Procesando pago...', COLORS.success)

    try {
      const resp = await ApiService.post(
        BACKEND_ROUTES.purchased_courses,
        { course: course.id, user: user.id, is_purchased: true }
      )
      if (resp.error) {

        setMsg({
          ...msg,
          text: resp.error
        })
      } else {
        navigation.navigate('Home')
      }
    } catch (err) {
      setMsg({
        ...msg,
        text: 'Error al procesar la compra',
      })
      console.warn(err)
    }
  }

  const formatCardNumber = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 19)
    return digits.replace(/(.{4})/g, '$1 ').trim()
  }

  // --- START: Expiry auto-formatting validation (only this validation was changed) ---
  const formatExpiryInput = (input: string) => {
    // Keep only digits
    const digits = input.replace(/\D/g, '').slice(0, 6) // allow up to MMYYYY (6 digits)
    if (digits.length === 0) return ''
    if (digits.length <= 2) {
      // partial month or full month
      return digits
    }
    // digits.length >= 3
    const month = digits.slice(0, 2)
    const rest = digits.slice(2) // could be 1..4 digits
    // If user typed 2 digits for year -> MM/AA
    if (rest.length === 1 || rest.length === 2) {
      return `${month}/${rest}`
    }
    // If user typed 3 or 4 digits for year, format as MM/YYYY (take up to 4)
    const yearFull = rest.slice(0, 4)
    return `${month}/${yearFull}`
  }

  const onExpiryChange = (val: string) => {
    const formatted = formatExpiryInput(val)
    onChange('expiry', formatted)
  }
  // --- END: Expiry auto-formatting validation ---

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <ImageBackground source={background} style={styles.container} resizeMode="cover">
        <View style={styles.box}>
          <Text style={styles.title}>Comprar curso</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Precio</Text>
            <Text style={[styles.label, { fontWeight: '700', fontSize: 18 }]}>
              ${Number(course.price).toFixed(2)}
            </Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Número de tarjeta</Text>
            <TextInput
              style={styles.input}
              placeholder="1234 5678 9012 3456"
              placeholderTextColor={styles.inputPlaceholder.color}
              keyboardType="numeric"
              value={formatCardNumber(card.number)}
              onChangeText={val => onChange('number', val)}
              maxLength={23}
              autoCapitalize="none"
            />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={[styles.field, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Expiración</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/AA"
                placeholderTextColor={styles.inputPlaceholder.color}
                value={card.expiry}
                onChangeText={onExpiryChange}
                keyboardType="numeric"
                maxLength={7}
              />
            </View>

            <View style={[styles.field, { width: 100 }]}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                placeholder="123"
                placeholderTextColor={styles.inputPlaceholder.color}
                value={card.cvv}
                onChangeText={val => onChange('cvv', val.replace(/\s/g, ''))}
                keyboardType="numeric"
                secureTextEntry
                maxLength={4}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>Pagar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.redirect}>Cancelar</Text>
          </TouchableOpacity>

          <Animated.View style={[styles.message, { opacity: msgOpacity }]} pointerEvents="none">
            <TouchableOpacity onPress={hideMessage}>
              <Text style={[styles.messageText, { color: msg.color }]}>{msg.text}</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}