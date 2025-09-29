// App.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { ContextAppProvider } from './src/context/ContextApp';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <ContextAppProvider>
      <NavigationContainer>
        <StatusBar hidden={true} />
        <AppNavigator />
      </NavigationContainer>
    </ContextAppProvider>
  );
}
