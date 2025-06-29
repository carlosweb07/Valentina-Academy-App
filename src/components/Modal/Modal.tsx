// src/shared/components/Modal/Modal.tsx
import React, { ReactNode } from 'react'
import {
  Modal as RNModal,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native'
import styles from './styles'

interface Props {
  children: ReactNode
  showModal: boolean
  setShowModal: (visible: boolean) => void
}

export default function AppModal({
  children,
  showModal,
  setShowModal,
}: Props) {
  return (
    <RNModal
      visible={showModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowModal(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={styles.closeBtn}
          >
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>

          <ScrollView
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </View>
      </View>
    </RNModal>
  )
}
