import { Alert, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import Me from '@/assets/images/ME.jpg';
import Post from './Post';
import * as ImagePicker from 'expo-image-picker';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
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
  // Sort the story: false (unseen) stories first, then true (seen) stories
  const sortedStory = [...story].sort((a, b) => (a.seen === b.seen ? 0 : a.seen ? 1 : -1));
  const [post , setPost] = useState()
  const {get} = useCrud()
  const {token} = UserState() ?? {}


  useEffect(()=>{
    const fetchingData = async()=>{

      try {

        console.log(token)
        
        const response = await get('api/v1/post' , token)
        setPost(response)

      } catch (error) {
        console.log(error) 
      }

    }

    fetchingData()

  },[])

  const openCamera = async () => {
    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Camera access is required to take a picture.');
      return;
    }

    // Open the camera
    const result: any = await ImagePicker.launchCameraAsync({
      allowsEditing: true,  // Let the user edit the picture before using it
      aspect: [4, 3],       // Aspect ratio for the image
      quality: 1,           // Image quality, ranging from 0 to 1
    });

    if (!result.canceled) {
      // Handle the image result (result.uri contains the image URI)
      console.log(result.uri); // You can use this URI for uploading or displaying
    }
  };



  const handleGesture = ({ nativeEvent }: any) => {
    if (nativeEvent.translationX > 50) {
      // Swiped to the right, open the camera
      openCamera();
    } else if (nativeEvent.translationX < -50) {
      // Swiped to the left, open notifications
      navigation.navigate('Notification');
    }
  };
  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerIcons}>
          <FontAwesome5 name="camera" size={24} color="black" onPress={openCamera} />
        </View>
        <Text style={styles.headerTitle}>Explore</Text>
        <TouchableOpacity style={styles.headerIcons} onPress={() => { navigation.navigate('Notification') }}>
          <Ionicons name="notifications" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.storySection} horizontal={true} showsHorizontalScrollIndicator={false}>
        {sortedStory.map((elem, index) => (
          <View key={index} style={styles.story}>
            <View style={[styles.storyImageContainer, { borderColor: elem.seen ? '#E0E0E0' : '#5790DF' }]}>
              <Image source={elem.img} style={styles.storyImage} />
            </View>
            <Text style={styles.storyName}>{elem.name}</Text>
          </View>
        ))}
      </ScrollView>
      <PanGestureHandler onGestureEvent={handleGesture} activeOffsetX={[-10, 10]}>
        <FlatList
          style={styles.postList}
          data={post} // Add more post data
          renderItem={({ item }) => <Post post={item} />}
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
    height: 130
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
    paddingTop: 20
  }
});
