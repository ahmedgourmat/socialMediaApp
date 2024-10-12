import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from '@/navigation/AuthStack';
import AppNavigator from '@/navigation/AppStack';

function HomeScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {

  const user = false

  return (
    <Stack.Navigator initialRouteName={!user ? 'Auth' : 'Main'}>
      <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }}/>
      <Stack.Screen name="Main" component={AppNavigator} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default App;
