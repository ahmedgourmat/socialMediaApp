import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '@/screens/Auth/Login';
import Signup from '@/screens/Auth/Signup';
import VerifyEmail from '@/screens/Auth/VerifyEmail';
import ForgetPassword from '@/screens/Auth/ForgetPassword';

const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="Signup" component={Signup} />
    <AuthStack.Screen name="VerifyEmail" component={VerifyEmail} />
    <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />
  </AuthStack.Navigator>
);

export default AuthNavigator;
