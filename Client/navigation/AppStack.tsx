import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import Home from '@/screens/Main/Home';
import Messages from '@/screens/Main/Messages';
import Notification from '@/screens/Main/Notification'; // Import Notification
import Profile from '@/screens/Main/Profile';
import AddPost from '@/screens/Main/AddPost';
import ChatScreen from '@/screens/Main/ChatScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarStyle: {
        backgroundColor: '#FFF',  // Custom background color
        alignItems: 'center',
        height: 60
      },
      tabBarInactiveTintColor: '#000',
      tabBarActiveTintColor: '#5790DF', // Active icon color
      headerShown: false, // Hide header on each tab
      tabBarIcon: ({ color }) => {
        let iconName;
        switch (route.name) {
          case 'Home':
            iconName = <Feather name="home" size={28} color={color} />;
            break;
          case 'Messages':
            iconName = <AntDesign name="message1" size={28} color={color} />;
            break;
          case 'Add':
            iconName = <Feather name="plus-square" size={28} color={color} />;
            break;
          case 'Profile':
            iconName = <Octicons name="person" size={28} color={color} />;
            break;
          default:
            iconName = null;
        }
        return iconName;
      },
    })}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{ title: '' }}
    />
    <Tab.Screen
      name="Messages"
      component={Messages}
      options={{
        tabBarBadge: '+99',
        title: '',
      }}
    />
    <Tab.Screen
      name="Add"
      component={AddPost}
      options={{ title: '' }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{ title: '' }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Main"
      component={TabNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Notification"
      component={Notification}
      options={{
        headerShown: false,
        cardStyleInterpolator: ({ current, layouts }) => ({
          cardStyle: {
            transform: [
              {
                translateX: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layouts.screen.width, 0],
                }),
              },
            ],
          },
        }),
      }}
    />
    <Stack.Screen
      name="ChatScreen"
      component={ChatScreen}
      options={{
        headerShown: false,
        cardStyleInterpolator: ({ current, layouts }) => ({
          cardStyle: {
            transform: [
              {
                translateX: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layouts.screen.width, 0],
                }),
              },
            ],
          },
        }),
      }}
    />
  </Stack.Navigator>
);

export default AppNavigator;
