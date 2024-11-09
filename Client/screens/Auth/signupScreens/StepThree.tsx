import useCrud from '@/hooks/useCrud';
import axios from 'axios';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as SecureStore from 'expo-secure-store'
import { UserState } from '@/hooks/contextHook';

const StepThree = ({ navigation, route }: any) => {
    const { values } = route.params;
    const {setUser} = UserState()
    const [bio, setBio] = useState('');
    const { post } = useCrud()

    const createUser = async () => {
        const userData = { ...values, bio };
        try {
            const response = await post('api/v1/user/signup', userData);
            await SecureStore.setItemAsync('token', response.token)
            await SecureStore.setItemAsync('user', JSON.stringify(response.user))
            setUser(response.user)
            console.log('Signup successfully');
            navigation.navigate('Main')
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Tell Us About Yourself (Optional)</Text>

            <TextInput
                style={styles.bioInput}
                placeholder="Your bio"
                value={bio}
                onChangeText={setBio}
                multiline
            />

            <TouchableOpacity style={styles.submitButton} onPress={createUser}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default StepThree;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    header: { fontSize: 25, fontWeight: '600', marginBottom: 20 },
    bioInput: {
        borderColor: '#CBD2E0',
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        textAlignVertical: 'top',
        height: 150,
        marginBottom: 15,
    },
    submitButton: {
        backgroundColor: '#1443C3',
        paddingVertical: 12,
        borderRadius: 50,
        alignItems: 'center',
    },
    submitButtonText: { color: '#fff', fontWeight: '500' },
    backButton: {
        marginTop: 15,
        paddingVertical: 12,
        borderRadius: 50,
        alignItems: 'center',
        borderColor: '#CBD2E0',
        borderWidth: 1,
    },
    backButtonText: { color: '#1443C3' },
});
