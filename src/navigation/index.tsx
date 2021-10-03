import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import { MainScreen } from '../screens';
import { LoginScreen } from '../screens/LoginScreen';

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >

      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
      />

      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
      />

    </Stack.Navigator>
  );
}
