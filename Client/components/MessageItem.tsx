import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import me from '@/assets/images/ME.jpg'
import Feather from '@expo/vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';


const MessageItem = ({navigation} : any) => {

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

    return (
        <View
            style={styles.messageContainer}
        >
            <TouchableOpacity
                onPress={()=>{navigation.navigate('ChatScreen')}}
                style={[styles.messageContainer , {paddingRight : 100}]}
            >
                <Image source={me} style={styles.img} />
                <View>
                    <Text
                        style={styles.messageInfoName}

                    >Ahmed Gourmat</Text>
                    <Text
                        style={styles.messageInfoText}
                    >Sent 3m ago</Text>
                </View>
            </TouchableOpacity>
            <Feather name="camera" size={28} color="black" onPress={openCamera} />
        </View>
    )
}

export default MessageItem

const styles = StyleSheet.create({
    messageContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center'
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 20
    },
    messageInfoName: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 3
    },
    messageInfoText: {
        color: '#8E8E8E'
    }
})