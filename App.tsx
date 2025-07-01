// App.tsx
import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { ContextApp } from './src/context/ContextApp';

export default function App() {
  const { user, setUser, completed, setCompleted } = useContext(ContextApp)

  return (
    <ContextApp.Provider value={{ user, setUser, completed, setCompleted }}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ContextApp.Provider>
  );
}
