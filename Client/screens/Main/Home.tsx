import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import Me from '@/assets/images/ME.jpg';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Post from './Post';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';  // Import SecureStore
import { PanGestureHandler } from 'react-native-gesture-handler';
import useCrud from '@/hooks/useCrud';
import { UserState } from '@/hooks/contextHook';

const story = [
  { name: 'User 1', img: Me, seen: true },
  { name: 'User 2', img: Me, seen: false },
  { name: 'User 3', img: Me, seen: true },
  { name: 'User 4', img: Me, seen: false },
  { name: 'User 5', img: Me, seen: true },
  { name: 'User 6', img: Me, seen: true },
  { name: 'User 7', img: Me, seen: false },
  { name: 'User 8', img: Me, seen: false },
  { name: 'User 9', img: Me, seen: true },
  { name: 'User 10', img: Me, seen: false },
  { name: 'User 11', img: Me, seen: true },
  { name: 'User 12', img: Me, seen: false },
  { name: 'User 13', img: Me, seen: true },
  { name: 'User 14', img: Me, seen: false },
  { name: 'User 15', img: Me, seen: true },
];

const Home = ({ navigation }: any) => {
  const sortedStory = [...story].sort((a, b) => (a.seen === b.seen ? 0 : a.seen ? 1 : -1));
  const [post, setPost] = useState();
  const { get } = useCrud();
  const { token } = UserState() ?? {};

  useEffect(() => {
    const fetchingData = async () => {
      try {
        console.log(token);
        const response = await get('api/v1/post', token);
        setPost(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchingData();
  }, []);

  // Function to handle the logout process
  const disconnect = async () => {
    try {
      // Clear any stored user data or tokens
      await SecureStore.deleteItemAsync('token');
      await SecureStore.deleteItemAsync('user');
    } catch (error) {
      console.log('Error during logout:', error);
    }
  };

  // Confirm logout with an alert
  const confirmLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to disconnect?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: disconnect }
      ]
    );
  };

  const handleGesture = ({ nativeEvent }: any) => {
    if (nativeEvent.translationX < -50) {
      navigation.navigate('Notification');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcons} onPress={confirmLogout}>
          <SimpleLineIcons name="logout" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Explore</Text>
        <TouchableOpacity style={styles.headerIcons} onPress={() => navigation.navigate('Notification')}>
          <Ionicons name="notifications" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <PanGestureHandler onGestureEvent={handleGesture} activeOffsetX={[-10, 10]}>
        <FlatList
          style={styles.postList}
          data={post}
          renderItem={({ item }) => <Post data={item} />}
        />
      </PanGestureHandler>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  headerIcons: {
    padding: 10,
    backgroundColor: '#E6EEFA',
    borderRadius: 50,
  },
  storySection: {
    paddingHorizontal: 15,
    height: 130,
  },
  story: {
    marginRight: 10,
    alignItems: 'center',
  },
  storyImageContainer: {
    borderWidth: 2,
    width: 68,
    height: 68,
    borderRadius: 50,
    padding: 2,
  },
  storyImage: {
    height: 60,
    width: 60,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 2,
  },
  storyName: {
    fontSize: 16,
    fontWeight: '600',
  },
  postList: {
    paddingTop: 20,
  },
});
