import React, { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Post from './Post';
import * as SecureStore from 'expo-secure-store';
import { PanGestureHandler } from 'react-native-gesture-handler';
import useCrud from '@/hooks/useCrud';
import { UserState } from '@/hooks/contextHook';

const Home = ({ navigation }: any) => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for initial fetch
  const [refreshing, setRefreshing] = useState(false);
  const { get } = useCrud();
  const { token } = UserState() ?? {};

  const fetchingData = async () => {
    try {
      const response = await get('api/v1/post', token);
      setPost(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Stop loading indicator after data is fetched
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  // Function to refresh the post list
  const refreshPosts = async () => {
    setRefreshing(true);
    await fetchingData();
    setRefreshing(false);
  };

  // Function to handle the logout process
  const disconnect = async () => {
    try {
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
        {loading ? ( // Show loading spinner while fetching data
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <FlatList
            style={styles.postList}
            data={post}
            renderItem={({ item }) => <Post data={item} />}
            keyExtractor={(item: any) => item._id.toString()}
            refreshing={refreshing}
            onRefresh={refreshPosts}
          />
        )}
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
  postList: {
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
