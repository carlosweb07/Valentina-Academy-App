// src/modules/admin/components/DeleteCourseModal.tsx
import React, { useRef, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import Modal from '../../../../../components/Modal/Modal'
import ApiService from '../../../../../services/Api'
import { BACKEND_ROUTES } from '../../../../../constants/routes'
import { COLORS } from '../../../../../constants/colors'
import styles from './styles'

interface Props {
  visible: boolean
  onClose: () => void
  onDeleted?: () => void
  courseId: number | null
}

export default function DeleteCourseModal({
  visible,
  onClose,
  onDeleted,
  courseId,
}: Props) {
  const [deleting, setDeleting] = useState(false)
  const completedRef = useRef(false)

  const handleSuccessFlow = (id: number | null) => {
    completedRef.current = true
    console.debug('DeleteCourseModal: delete success for', id)
    if (typeof onDeleted === 'function') {
      try {
        onDeleted()
      } catch (cbErr) {
        console.warn('DeleteCourseModal: onDeleted callback error', cbErr)
      }
    }
    setTimeout(() => {
      try {
        onClose()
      } catch (e) {
        console.warn('DeleteCourseModal: onClose error', e)
      }
    }, 120)
  }

  const onDelete = async () => {
    if (courseId == null) return
    if (deleting) return
    if (completedRef.current) return

    setDeleting(true)
    try {
      // Llamada al servicio (puede lanzar por parseo JSON si el backend responde sin cuerpo)
      await ApiService.delete(`${BACKEND_ROUTES.courses}/${courseId}`)

      // Si llega acá sin lanzar, todo OK
      handleSuccessFlow(courseId)
    } catch (e: any) {
      // Si el error viene por JSON parse (respuesta 204/empty body) lo tratamos como éxito
      const msg = String(e?.message ?? e)
      const isEmptyJsonError =
        msg.includes('JSON Parse error') ||
        msg.includes('Unexpected end of input') ||
        msg.includes('Unexpected token') // por si varía el mensaje

      if (isEmptyJsonError) {
        console.debug('DeleteCourseModal: backend returned empty body; treating as success', msg)
        handleSuccessFlow(courseId)
        return
      }

      // Otros errores: los reportamos y permitimos reintento
      console.warn('DeleteCourseModal: Delete error:', e)
      setDeleting(false)
    }
  }

  return (
    <Modal showModal={visible} onClose={onClose} setShowModal={onClose}>
      {deleting ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.statusText}>Eliminando curso...</Text>
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.header}>¿Eliminar este curso?</Text>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, styles.cancelBtn]}
              onPress={() => {
                completedRef.current = false
                onClose()
              }}
              disabled={deleting}
            >
              <Text style={[styles.btnText, styles.cancelText]}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.deleteBtn]}
              onPress={onDelete}
              disabled={deleting}
            >
              <Text style={[styles.btnText, styles.deleteText]}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Modal>
  )
}
