import React, { useEffect, useState, useRef } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import useCrud from '@/hooks/useCrud';
import { UserState } from '@/hooks/contextHook';
import me from '@/assets/images/ME.jpg';

const ChatScreen = ({ navigation, route }: any) => {

    const { chatId, chatName } = route.params;
    const [message, setMessage] = useState('');
    const [messagesData, setMessagesData] = useState<any>([]);
    const { post, get } = useCrud();
    const { token, user } = UserState() ?? {};

    const scrollViewRef = useRef<ScrollView>(null); // Create a ref for ScrollView

    const openCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Camera access is required to take a picture.');
            return;
        }
        const result: any = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            console.log(result.uri);
        }
    };

    const createMessage = async () => {
        try {
            const response = await post('api/v1/message', { chatId, content: message }, token);
            setMessagesData((prevMessages: any) => [...prevMessages, response]); // Append the new message
            setMessage('');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchingData = async () => {
            try {
                const response = await get(`api/v1/message/${chatId}`, token);
                setMessagesData(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchingData();
    }, []);

    // Scroll to the bottom whenever messagesData changes
    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [messagesData]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#E6EEFA' }}>
            {/* Header */}
            <View style={styles.header}>
                <Image source={me} style={styles.img} />
                <View>
                    <Text style={{ fontSize: 19, fontWeight: '600' }}>{chatName}</Text>
                    <Text style={{ color: '#8E8E8E' }}>Last seen 11:44 AM</Text>
                </View>
                <AntDesign onPress={() => { navigation.goBack() }} style={{ marginLeft: 'auto' }} name="closecircle" size={35} color="#5790DF" />
            </View>

            {/* Chat Messages */}
            <ScrollView 
                style={styles.chatContainer} 
                ref={scrollViewRef} // Attach ref to ScrollView
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })} // Auto scroll when content size changes
            >
                {
                    messagesData.map((elem: any, index: number) => (
                        <View key={index} style={elem.sender._id !== user._id ? styles.senderMessage : styles.receiverMessage}>
                            <Text style={styles.messageText}>{elem.content}</Text>
                        </View>
                    ))
                }
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
                <TouchableOpacity onPress={createMessage}>
                    <AntDesign name="arrowright" size={30} color="#5790DF" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ChatScreen;

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
