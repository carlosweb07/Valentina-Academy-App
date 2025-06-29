// src/navigation/AppNavigator.tsx
import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ContextApp } from '../context/ContextApp';
import { ROLES } from '../constants/roles';

// Screens
import LandingPage from '../pages/LandingPage/LandingPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import HomePage from '../pages/HomePage/Index';
import CoursePage from '../pages/CoursePage/Index';
import SurveyPage from '../pages/SurveyPage/SurveyPage';
import AdminPage from '../pages/AdminPage/AdminPage';
import UsersAdmin from '../pages/admin/UsersAdmin/UsersAdmin';
import CoursesAdmin from '../pages/admin/CoursesAdmin/CoursesAdmin';
import RecipesAdmin from '../pages/admin/RecipesAdmin/RecipesAdmin';
import IngredientsAdmin from '../pages/admin/IngredientsAdmin/IngredientsAdmin';
import SurveysAdmin from '../pages/admin/SurveysAdmin/SurveyAdmin';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

// Layouts as HOCs
import IsAuthorized from '../layouts/IsAuthorized/IsAuthorized';
import HasPermissions from '../layouts/HasPermissions/HasPermissions';
import IsCourseCompleted from '../layouts/IsCourseCompleted/IsCourseCompleted';

import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { completed } = useContext(ContextApp);

  return (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen name="Landing" component={LandingPage} options={{ headerShown:false }} />
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Register" component={RegisterPage} />
      <Stack.Screen
        name="Home"
        options={{ title: 'Inicio' }}
        component={() => (
          <IsAuthorized>
            <HasPermissions role={ROLES}>
              <HomePage />
            </HasPermissions>
          </IsAuthorized>
        )}
      />
      <Stack.Screen
        name="Course"
        options={{ title: 'Curso' }}
        component={() => (
          <IsAuthorized>
            <HasPermissions role={ROLES.student}>
              <CoursePage />
            </HasPermissions>
          </IsAuthorized>
        )}
      />
      <Stack.Screen
        name="Survey"
        options={{ title: 'Encuesta' }}
        component={() => (
          <IsAuthorized>
            <HasPermissions role={ROLES.student}>
              <IsCourseCompleted completed={completed}>
                <SurveyPage />
              </IsCourseCompleted>
            </HasPermissions>
          </IsAuthorized>
        )}
      />
      <Stack.Screen
        name="Admin"
        component={() => (
          <IsAuthorized>
            <HasPermissions role={ROLES.admin}>
              <AdminPage />
            </HasPermissions>
          </IsAuthorized>
        )}
      />
      {/* Rutas admin menores */}
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="UsersAdmin" component={UsersAdmin} />
        <Stack.Screen name="CoursesAdmin" component={CoursesAdmin} />
        <Stack.Screen name="RecipesAdmin" component={RecipesAdmin} />
        <Stack.Screen name="IngredientsAdmin" component={IngredientsAdmin} />
        <Stack.Screen name="SurveysAdmin" component={SurveysAdmin} />
      </Stack.Group>
      <Stack.Screen name="NotFound" component={NotFoundPage} options={{ title:'No encontrado' }} />
    </Stack.Navigator>
  );
}
