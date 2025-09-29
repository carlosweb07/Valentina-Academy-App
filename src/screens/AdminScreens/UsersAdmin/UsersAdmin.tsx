import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  ImageBackground,
  View,
  Animated,
  Text,
  Easing,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome5 } from '@expo/vector-icons'
import Navbar from '../../../components/Navbar/Navbar'
import AdminSkeleton from '../skeleton/AdminSkeleton'
import CreateUserModal from './components/CreateModal/CreateModal'
import EditUserModal from './components/EditModal/EditModal'
import DeleteUserModal from './components/DeleteModal/DeleteModal'
import ApiService from '../../../services/Api'
import { BACKEND_ROUTES } from '../../../constants/routes'
import { ROLES } from '../../../constants/roles'
import { User } from '../../../interfaces/Models'
import { COLORS } from '../../../constants/colors'
import fondo from '../../../../assets/background.jpg'

import styles from './styles'

export default function UsersAdmin() {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const [expanded, setExpanded] = useState<Set<number>>(new Set())
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  // animación reload
  const spinAnim = useRef(new Animated.Value(0)).current
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  // mounted guard
  const mountedRef = useRef(true)
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  const loadData = useCallback(async () => {
    try {
      if (mountedRef.current) setLoading(true)
      const usersResp = await ApiService.get<User[]>(BACKEND_ROUTES.users)
      if (!mountedRef.current) return
      setUsers(usersResp ?? [])
    } catch (e) {
      console.warn('Error loading users', e)
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const toggleExpand = (id: number) => {
    setExpanded(prev => {
      const copy = new Set(prev)
      if (copy.has(id)) copy.delete(id)
      else copy.add(id)
      return copy
    })
  }

  const onReload = () => {
    spinAnim.setValue(0)
    Animated.timing(spinAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start()

    // limpiar estados relacionados
    setExpanded(new Set())
    setSelectedId(null)

    loadData()
  }

  if (loading) {
    return <AdminSkeleton />
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar />
      <ImageBackground
        source={fondo}
        style={styles.image}
        imageStyle={styles.imageRounded}
        resizeMode="cover"
      >
        <View style={styles.header}>
          <Text style={styles.heading}>Administración de usuarios</Text>

          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <TouchableOpacity onPress={onReload}>
              <FontAwesome5 name="redo-alt" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity onPress={() => setShowCreate(true)}>
            <FontAwesome5 name="plus" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.list}>
          {users.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.heading}>No hay usuarios</Text>
            </View>
          ) : (
            users.map(u => (
              <View key={u.id} style={styles.courseItem}>
                <TouchableOpacity
                  onPress={() => toggleExpand(u.id)}
                  onLongPress={() => {
                    setSelectedId(u.id)
                    setShowEdit(true)
                  }}
                  style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <Text style={styles.cardTitle}>{u.username}</Text>
                  <FontAwesome5
                    name={expanded.has(u.id) ? 'caret-down' : 'caret-right'}
                    size={18}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>

                {expanded.has(u.id) && (
                  <View style={styles.courseDetails}>
                    <Text style={styles.cardBody}><Text style={styles.bold}>Nombre:</Text><Text style={styles.text}> {u.first_name} {u.last_name}</Text></Text>
                    <Text style={styles.cardBody}><Text style={styles.bold}>Email:</Text><Text style={styles.text}> {u.email}</Text></Text>
                    <Text style={styles.cardBody}><Text style={styles.bold}>Rol:</Text><Text style={styles.text}> {ROLES[u.role]?.translate ?? u.role}</Text></Text>

                    <TouchableOpacity
                      onPress={() => {
                        setSelectedId(u.id)
                        setShowDelete(true)
                      }}
                      style={{ marginTop: 8 }}
                    >
                      <Text style={styles.deleteButton}>Eliminar</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))
          )}
        </ScrollView>

        <CreateUserModal
          visible={showCreate}
          onClose={() => {
            setShowCreate(false)
            loadData()
          }}
        />

        <EditUserModal
          visible={showEdit}
          userId={selectedId}
          onClose={() => {
            setShowEdit(false)
            setSelectedId(null)
            loadData()
          }}
        />

        <DeleteUserModal
          visible={showDelete}
          userId={selectedId}
          onClose={() => {
            setShowDelete(false)
            setSelectedId(null)
            loadData()
          }}
        />
      </ImageBackground>
    </SafeAreaView>
  )
}