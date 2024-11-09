import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import me from '@/assets/images/ME.jpg'; // Adjust this image for the other user's profile picture
import Feather from '@expo/vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import { UserState } from '@/hooks/contextHook';

const MessageItem = ({ navigation, chat }: any) => {
    // Find the other user in the chat (not the current user)
    const { user } = UserState() ?? {};

    const otherUser = chat.users.find((item: any) => item.email !== user.email);

    const openCamera = async () => {
        // Request camera permissions
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Camera access is required to take a picture.');
            return;
        }

        // Open the camera
        const result: any = await ImagePicker.launchCameraAsync({
            allowsEditing: true, // Let the user edit the picture before using it
            aspect: [4, 3], // Aspect ratio for the image
            quality: 1, // Image quality, ranging from 0 to 1
        });

        if (!result.canceled) {
            console.log(result.uri); // You can use this URI for uploading or displaying
        }
    };

    const getRelativeTime = (createdAt: string) => {
        const now = new Date();
        const messageTime = new Date(createdAt);
        const diffInMs = now.getTime() - messageTime.getTime();
        
        const minutes = Math.floor(diffInMs / (1000 * 60));
        if (minutes < 60) return `${minutes} minutes ago`;

        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hours ago`;

        const days = Math.floor(hours / 24);
        return `${days} days ago`;
    };

    return (
        <View style={styles.messageContainer}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('ChatScreen', {
                        chatId: chat._id,
                        chatName: otherUser ? otherUser.name : 'Unknown User',
                    });
                }}
                style={styles.messageContent}
            >
                <Image source={me} style={styles.img} />
                <View>
                    {/* Display the other user's name */}
                    <Text style={styles.messageInfoName}>{otherUser ? otherUser.name : 'Unknown User'}</Text>

                    {chat.latestMessage ? (
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.messageInfoText}>
                                {chat.latestMessage.sender.email === user.email ? 'You' : chat.latestMessage.sender.name} : 
                            </Text>
                            <Text style={styles.messageInfoText}>{chat.latestMessage.content}</Text>
                        </View>
                    ) : null}

                    <Text style={styles.messageInfoText}>
                        {chat.latestMessage ? getRelativeTime(chat.latestMessage.createdAt) : ''}
                    </Text>
                </View>
            </TouchableOpacity>

            {/* Camera icon on the right */}
            <Feather name="camera" size={28} color="black" onPress={openCamera} style={styles.cameraIcon} />
        </View>
    );
};

export default MessageItem;

const styles = StyleSheet.create({
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    messageContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1, // This ensures the message content takes up available space before the icon
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 20,
    },
    messageInfoName: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 3,
    },
    messageInfoText: {
        color: '#8E8E8E',
    },
    cameraIcon: {
        marginLeft: 'auto', // This pushes the icon to the right
    },
});
