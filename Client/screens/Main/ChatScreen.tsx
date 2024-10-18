import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import me from '@/assets/images/ME.jpg'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';

const ChatScreen = ({ navigation }: any) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        // Logic for sending the message
        console.log('Message sent:', message);
        setMessage(''); // Clear input after sending
    };

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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#E6EEFA' }}>
            {/* Header */}
            <View style={styles.header}>
                <Image source={me} style={styles.img} />
                <View>
                    <Text style={{ fontSize: 19, fontWeight: '600' }}>Benjamin Moore</Text>
                    <Text style={{ color: '#8E8E8E' }}>Last seen 11:44 AM</Text>
                </View>
                <AntDesign onPress={() => { navigation.goBack() }} style={{ marginLeft: 'auto' }} name="closecircle" size={35} color="#5790DF" />
            </View>

            {/* Chat Messages */}
            <ScrollView style={styles.chatContainer}>
                {/* Sender's message */}
                <View style={styles.senderMessage}>
                    <Text style={styles.messageText}>Hi Catherine! How are you?</Text>
                </View>

                {/* Receiver's message */}
                <View style={styles.receiverMessage}>
                    <Text style={styles.messageTextReceiver}>I'm good and you?</Text>
                </View>

                {/* Sender's message */}
                <View style={styles.senderMessage}>
                    <Text style={styles.messageText}>I'm doing good. What are you doing?</Text>
                </View>

                {/* Receiver's message */}
                <View style={styles.receiverMessage}>
                    <Text style={styles.messageTextReceiver}>I'm working on my app design.</Text>
                </View>

                {/* Sender's message */}
                <View style={styles.senderMessage}>
                    <Text style={styles.messageText}>Let's get lunch! How about sushi?</Text>
                </View>

                {/* Receiver's message */}
                <View style={styles.receiverMessage}>
                    <Text style={styles.messageTextReceiver}>That sounds great!</Text>
                </View>
                <View style={styles.senderMessage}>
                    <Text style={styles.messageText}>Hi Catherine! How are you?</Text>
                </View>

                {/* Receiver's message */}
                <View style={styles.receiverMessage}>
                    <Text style={styles.messageTextReceiver}>I'm good and you?</Text>
                </View>

                {/* Sender's message */}
                <View style={styles.senderMessage}>
                    <Text style={styles.messageText}>I'm doing good. What are you doing?</Text>
                </View>

                {/* Receiver's message */}
                <View style={styles.receiverMessage}>
                    <Text style={styles.messageTextReceiver}>I'm working on my app design.</Text>
                </View>

                {/* Sender's message */}
                <View style={styles.senderMessage}>
                    <Text style={styles.messageText}>Let's get lunch! How about sushi?</Text>
                </View>

                {/* Receiver's message */}
                <View style={styles.receiverMessage}>
                    <Text style={styles.messageTextReceiver}>That sounds great!</Text>
                </View>
                <View style={styles.senderMessage}>
                    <Text style={styles.messageText}>Hi Catherine! How are you?</Text>
                </View>

                {/* Receiver's message */}
                <View style={styles.receiverMessage}>
                    <Text style={styles.messageTextReceiver}>I'm good and you?</Text>
                </View>

                {/* Sender's message */}
                <View style={styles.senderMessage}>
                    <Text style={styles.messageText}>I'm doing good. What are you doing?</Text>
                </View>

                {/* Receiver's message */}
                <View style={styles.receiverMessage}>
                    <Text style={styles.messageTextReceiver}>I'm working on my app design.</Text>
                </View>

                {/* Sender's message */}
                <View style={styles.senderMessage}>
                    <Text style={styles.messageText}>Let's get lunch! How about sushi?</Text>
                </View>

                {/* Receiver's message */}
                <View style={styles.receiverMessage}>
                    <Text style={styles.messageTextReceiver}>That sounds great!</Text>
                </View>
            </ScrollView>

            {/* Input Area */}
            <View style={styles.inputContainer}>
                <MaterialIcons name="photo-camera" size={28} color="#5790DF" onPress={openCamera} />
                <TextInput
                    style={styles.textInput}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Type a message..."
                />
                <TouchableOpacity onPress={handleSendMessage}>
                    <AntDesign name="arrowright" size={30} color="#5790DF" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    img: {
        height: 48,
        width: 48,
        borderRadius: 50,
        marginRight: 10
    },
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: '#8E8E8E'
    },
    chatContainer: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    senderMessage: {
        alignSelf: 'flex-start',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        marginBottom: 10,
        maxWidth: '75%',
    },
    receiverMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#5790DF',
        padding: 10,
        borderRadius: 20,
        marginBottom: 10,
        maxWidth: '75%',
    },
    messageText: {
        fontSize: 16,
        color: '#000',
    },
    messageTextReceiver: {
        fontSize: 16,
        color: '#FFF',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#E0E0E0',
    },
    textInput: {
        flex: 1,
        backgroundColor: '#F1F1F1',
        borderRadius: 20,
        padding: 10,
        marginHorizontal: 10,
    },
});
