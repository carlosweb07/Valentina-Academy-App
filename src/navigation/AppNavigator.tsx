// src/navigation/AppNavigator.tsx
import React, { useContext, useEffect, useRef, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as NavigationBar from 'expo-navigation-bar';
import { ContextApp } from '../context/ContextApp'
import { ROLES } from '../constants/roles'
import { COLORS } from '../constants/colors';

// Screens
import LandingPage from '../screens/Landing/Landing'
import LoginPage from '../screens/Login/Login'
import RegisterPage from '../screens/Register/Register'
import HomePage from '../screens/Home/Index'
import CoursePage from '../screens/Course/Course'
import SurveyPage from '../screens/Survey/Survey'
import AdminPage from '../screens/Admin/Admin'
import UsersAdmin from '../screens/AdminScreens/UsersAdmin/UsersAdmin'
import CoursesAdmin from '../screens/AdminScreens/CoursesAdmin/CoursesAdmin'
import RecipesAdmin from '../screens/AdminScreens/RecipesAdmin/RecipesAdmin'
import IngredientsAdmin from '../screens/AdminScreens/IngredientsAdmin/IngredientsAdmin'
import SurveysAdmin from '../screens/AdminScreens/SurveysAdmin/SurveyAdmin'
import NotFoundPage from '../screens/NotFound/NotFound'

import IsAuthorized from '../layouts/IsAuthorized/IsAuthorized'
import HasPermissions from '../layouts/HasPermissions/HasPermissions'
import IsCourseCompleted from '../layouts/IsCourseCompleted/IsCourseCompleted'

import type { RootStackParamList } from './types'
import { 
  StatusBar, 
  Text, 
  TouchableOpacity,
  AppState
} from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function AppNavigator() {
  const { completed, setCompleted } = useContext(ContextApp)
  const appState = useRef(AppState.currentState);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const hideSystemBars = async () => {
    StatusBar.setHidden(true, 'fade')
    await NavigationBar.setVisibilityAsync("hidden")
  }

  useEffect(() => {
    hideSystemBars()

    const subscription = AppState.addEventListener("change", nextAppState => {
      appState.current = nextAppState
      hideSystemBars()
    })
    return () => {
      subscription.remove()
    }
  }, [])

  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        contentStyle: { backgroundColor: 'transparent' },
        headerTintColor: "#fff",
        headerTransparent: true,
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Landing")}
          >
            <Text
              style={{ color: '#fff', width: "100%", fontSize: 18, textAlign: 'center' }}
            >
              🏠
            </Text>
          </TouchableOpacity>
        )
      }}
    >
      <Stack.Screen
      name="Landing"
      component={LandingPage}
      options={{ headerShown: false }}
      />

      <Stack.Screen name="Login" component={LoginPage}  />
      <Stack.Screen name="Register" component={RegisterPage} />

      <Stack.Screen name="Home"  options={{ headerShown: false }}>
      {() => (
        <IsAuthorized>
        <HasPermissions role={ROLES.student}>
          <HomePage />
        </HasPermissions>
        </IsAuthorized>
      )}
      </Stack.Screen>

      <Stack.Screen name="Course" options={{ title: 'Curso' }}>
      {() => (
        <IsAuthorized>
        <HasPermissions role={ROLES.student}>
          <CoursePage setCompleted={setCompleted} />
        </HasPermissions>
        </IsAuthorized>
      )}
      </Stack.Screen>

      <Stack.Screen name="Survey" options={{ title: 'Encuesta', headerShown: false }}>
      {() => (
        <IsAuthorized>
        <HasPermissions role={ROLES.student}>
          <IsCourseCompleted completed={completed}>
          <SurveyPage />
          </IsCourseCompleted>
        </HasPermissions>
        </IsAuthorized>
      )}
      </Stack.Screen>

      <Stack.Screen name="Admin" options={{ headerShown: false }}>
      {() => (
        <IsAuthorized>
        <HasPermissions role={ROLES.admin}>
          <AdminPage />
        </HasPermissions>
        </IsAuthorized>
      )}
      </Stack.Screen>

      <Stack.Group screenOptions={{ presentation: 'modal', headerShown: false }}>
      <Stack.Screen name="UsersAdmin" component={UsersAdmin} />
      <Stack.Screen name="CoursesAdmin" component={CoursesAdmin} />
      <Stack.Screen name="RecipesAdmin" component={RecipesAdmin} />
      <Stack.Screen name="IngredientsAdmin" component={IngredientsAdmin} />
      <Stack.Screen name="SurveysAdmin" component={SurveysAdmin} />
      </Stack.Group>

      <Stack.Screen
      name="NotFound"
      component={NotFoundPage}
      options={{ title: 'No encontrado' }}
      />
    </Stack.Navigator>
  )
}