// src/layouts/IsCourseCompleted/IsCourseCompleted.tsx
import React, { ReactNode, useEffect } from 'react'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import type { RootStackParamList } from '../../navigation/types'

interface Props {
  children: ReactNode
  completed: boolean
}

export default function IsCourseCompleted({ children, completed }: Props) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  useEffect(() => {
    if (!completed) {
      navigation.navigate('Home')
    }
  }, [completed, navigation])

  return <>{children}</>
}
