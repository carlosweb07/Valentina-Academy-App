import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import Navbar from '../../../components/Navbar/Navbar'
import AdminSkeleton from '../skeleton/AdminSkeleton'
import CreateUserModal from './components/CreateModal/CreateModal'
import EditUserModal from './components/EditModal/EditModal'
import DeleteUserModal from './components/DeleteModal/DeleteModal'
import ApiService from '../../../services/Api'
import { BACKEND_ROUTES } from '../../../constants/routes'
import { SPANISH_ROLES } from '../../../constants/roles'
import { User } from '../../../interfaces/App'

import styles from './styles'

export default function UsersAdmin() {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const resp = await ApiService.get<User[]>(BACKEND_ROUTES.users)
        if (!mounted) return
        setUsers(resp)
      } catch (e) {
        console.warn('Error loading users', e)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [refresh])

  const toggle = (id: string) => {
    setExpanded(s => {
      const copy = new Set(s)
      copy.has(id) ? copy.delete(id) : copy.add(id)
      return copy
    })
  }

  if (loading) return <AdminSkeleton />

  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar />
      <View style={styles.header}>
        <Text style={styles.title}>Administración de usuarios</Text>
        <TouchableOpacity onPress={() => setShowCreate(true)}>
          <FontAwesome5 name="plus" size={24} color={styles.icon.color} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        {users.map(u => (
          <View key={u.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{u.username}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => { setSelectedId(u.id); setShowEdit(true) }}
                >
                  <FontAwesome5 name="pen-to-square" size={20} color={styles.icon.color} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => { setSelectedId(u.id); setShowDelete(true) }}
                  style={styles.deleteIcon}
                >
                  <FontAwesome5 name="trash" size={20} color={styles.deleteIcon.color} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggle(u.id)}>
                  <FontAwesome5
                    name="caret-right"
                    size={20}
                    color={styles.icon.color}
                    style={expanded.has(u.id) ? styles.caretOpen : undefined}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {expanded.has(u.id) && (
              <View style={styles.cardBody}>
                <Text style={styles.detail}><Text style={styles.bold}>Nombre:</Text> {u.first_name} {u.last_name}</Text>
                <Text style={styles.detail}><Text style={styles.bold}>Email:</Text> {u.email}</Text>
                <Text style={styles.detail}><Text style={styles.bold}>Rol:</Text> {SPANISH_ROLES[u.role]}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <CreateUserModal
        visible={showCreate}
        onClose={() => { setShowCreate(false); setRefresh(r => !r) }}
      />
      <EditUserModal
        visible={showEdit}
        onClose={() => { setShowEdit(false); setRefresh(r => !r) }}
        userId={selectedId}
      />
      <DeleteUserModal
        visible={showDelete}
        onClose={() => { setShowDelete(false); setRefresh(r => !r) }}
        userId={selectedId}
      />
    </SafeAreaView>
  )
}
