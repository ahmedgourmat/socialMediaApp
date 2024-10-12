import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '@/screens/Auth/Login';
import Signup from '@/screens/Auth/Signup';

const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="Signup" component={Signup} />
  </AuthStack.Navigator>
);

export default AuthNavigator;
