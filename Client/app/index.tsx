import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from '@/navigation/AuthStack';
import AppNavigator from '@/navigation/AppStack';
import { UserContext } from '@/context/UserInfo';
import * as SecureStore from 'expo-secure-store'

const Stack = createNativeStackNavigator();

function App() {

  const [user , setUser] = React.useState({})

  React.useEffect(()=>{

    const checkingUserInfo = async()=>{
      const tempUser : any = await SecureStore.getItemAsync('user')
      setUser(tempUser)
      console.log(tempUser)
    }

    checkingUserInfo()

  },[])

  return (
    <UserContext>
      <Stack.Navigator initialRouteName={user == null ? 'Auth' : 'Main'}>
        <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={AppNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </UserContext>
  );
}

export default App;
