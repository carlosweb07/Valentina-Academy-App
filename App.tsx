// App.tsx
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { ContextApp } from './src/context/ContextApp';
import { ROLES } from './src/constants/roles';

export default function App() {
  const [user, setUser] = useState({
    id: '',
    email: '',
    first_name: '',
    last_name: '',
    username: ''
  });
  const [completed, setCompleted] = useState(false);

  return (
    <ContextApp.Provider value={{ user, setUser, completed, setCompleted }}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ContextApp.Provider>
  );
}
