// src/navigation/AppNavigator.tsx
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ContextApp } from '../context/ContextApp'
import { ROLES } from '../constants/roles'

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
import { Text, TouchableOpacity } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function AppNavigator() {
  const { completed, setCompleted } = useContext(ContextApp)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

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

      <Stack.Screen name="Admin">
      {() => (
        <IsAuthorized>
        <HasPermissions role={ROLES.admin}>
          <AdminPage />
        </HasPermissions>
        </IsAuthorized>
      )}
      </Stack.Screen>

      <Stack.Group screenOptions={{ presentation: 'modal' }}>
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