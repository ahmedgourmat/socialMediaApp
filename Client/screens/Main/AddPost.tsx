import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import useCrud from '@/hooks/useCrud';
import { UserState } from '@/hooks/contextHook';

const AddPost = () => {
  const [img, setImg] = useState('');
  const [loading, setLoading] = useState(false);  // Add loading state
  const { post } = useCrud()
  const { token } = UserState() ?? {}

  const openGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      setImg(selectedImage);
      await uploadImage(selectedImage); // Upload the image
    }
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const capturedImage = result.assets[0].uri;
      setImg(capturedImage);
      await uploadImage(capturedImage); // Upload the image
    }
  };

  const uploadImage = async (imageUri : any) => {
    setLoading(true);  // Start loading

    const base64Img = await toBase64(imageUri);

    try {
      const response = await post('api/v1/post', { img: base64Img }, token);
      console.log(response);
      Alert.alert(response.message);
    } catch (error) {
      console.error('Error uploading image: ', error);
      Alert.alert('Error uploading image.');
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  const toBase64 = async (uri : any) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result); // Get base64 string
      };
      reader.readAsDataURL(blob);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Post</Text>
      {loading ? ( // Display loading indicator if loading state is true
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={openGallery}>
            <Text style={styles.buttonText}>Open Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={openCamera}>
            <Text style={styles.buttonText}>Open Camera</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#007BFF',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});
