// App.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { ContextAppProvider } from './src/context/ContextApp';

export default function App() {
  return (
    <ContextAppProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ContextAppProvider>
  );
}
