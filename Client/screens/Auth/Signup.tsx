import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import CheckBox from 'react-native-check-box';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';

const Signup = ({navigation} : any) => {
    const [isSelected, setSelection] = useState(false);
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const createUser = async () => {
        try {
            console.log('here')
            const res = await axios.post('http://192.168.212.46:8080/api/v1/user/signup', values); // Fixed typo here
            console.log('here')
            if (res.status >= 200 && res.status < 300) {
                console.log('Signup successfully');
                setValues({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                })
                navigation.navigate('Main')
            }
        } catch (error: any) {
            console.log('Error signing up:', error.response ? error.response.data : error.message);
        }
    };

    const changeHandler = (name: string, value: string) => {
        setValues({ ...values, [name]: value }); // Correctly update state without e.target
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined} // Adjust padding for iOS
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // For Android, set a little offset
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, paddingHorizontal: 25 }}>
                    <SafeAreaView style={{ flex: 1 }}>
                        {/* Back Button in the Top Left */}
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={24} color="black" />
                        </TouchableOpacity>

                        <View style={styles.container}>
                            <Text style={styles.header}>Signup</Text>
                            <TouchableOpacity style={styles.googlebtn}>
                                <Ionicons name="logo-google" size={24} color="black" />
                                <Text style={styles.textbtn}>Sign Up with Google</Text>
                            </TouchableOpacity>
                            <Text style={styles.text}>or signup with</Text>
                        </View>

                        <View style={styles.inpContainer}>
                            <View style={{ width: '100%' }}>
                                <Text style={styles.inpText}>Full name</Text>
                                <TextInput
                                    placeholder='Full name'
                                    style={styles.inp}
                                    value={values.name}
                                    onChangeText={(text) => changeHandler('name', text)} // Correctly using onChangeText
                                />
                            </View>
                            <View style={{ width: '100%', marginTop: 10 }}>
                                <Text style={styles.inpText}>Email address</Text>
                                <TextInput
                                    placeholder='Email'
                                    keyboardType='email-address'
                                    style={styles.inp}
                                    value={values.email}
                                    onChangeText={(text) => changeHandler('email', text)} // Correctly using onChangeText
                                />
                            </View>
                            <View style={{ width: '100%', marginTop: 10 }}>
                                <Text style={styles.inpText}>Password</Text>
                                <TextInput
                                    placeholder='Password'
                                    style={styles.inp}
                                    value={values.password}
                                    secureTextEntry={true}
                                    onChangeText={(text) => changeHandler('password', text)} // Correctly using onChangeText
                                />
                            </View>
                            <View style={{ width: '100%', marginTop: 10 }}>
                                <Text style={styles.inpText}>Confirm password</Text>
                                <TextInput
                                    placeholder='Confirm password'
                                    secureTextEntry={true}
                                    style={styles.inp}
                                    value={values.confirmPassword}
                                    onChangeText={(text) => changeHandler('confirmPassword', text)} // Correctly using onChangeText
                                />
                            </View>
                            <View>
                                <CheckBox
                                    isChecked={isSelected}
                                    onClick={() => setSelection(!isSelected)}
                                    rightText='By creating an account, I accept Hiring terms of Use and Privacy Policy'
                                    rightTextStyle={{ color: '#6C6F72' }}
                                    style={styles.checkbox}
                                    checkedCheckBoxColor='#59CDBE'
                                />
                            </View>
                            <TouchableOpacity
                                style={[styles.googlebtn, styles.loginbtn]}
                                onPress={createUser} // Call createUser on press
                            >
                                <Text style={[styles.textbtn, { color: 'white', fontWeight: '500' }]}>Sign up</Text>
                            </TouchableOpacity>
                            <Text style={{ marginTop: 30, textAlign: 'center' }}>
                                Have an account?{' '}
                                <Text
                                    onPress={()=>{navigation.navigate('Login')}}
                                    style={{ color: '#0000EE' }} // Navigate to Signin screen
                                >
                                    Sign in here
                                </Text>
                            </Text>
                        </View>
                    </SafeAreaView>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Signup;

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 20,
        left: 10,
        zIndex: 10,
    },
    container: {
        alignItems: 'center',
        padding: 20,
        marginTop: 10, 
    },
    header: {
        fontSize: 25,
        fontWeight: '600'
    },
    googlebtn: {
        width: '100%' ,
        paddingVertical: 15 ,
        backgroundColor: '#F4F7FF' ,
        alignItems: 'center' ,
        marginTop: 10 ,
        borderRadius: 8 ,
        flexDirection: 'row' ,
        justifyContent: 'center'
    },
    textbtn: {
        fontSize: 15,
        fontWeight: '600',
        paddingLeft: 5
    },
    text: {
        marginTop: 30
    },
    inp: {
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderColor: '#CBD2E0',
        borderWidth: 1,
        borderRadius: 6
    },
    inpText: {
        fontWeight: '600',
        fontSize: 13,
        marginBottom: 4
    },
    inpContainer: {
        marginTop: 15
    },
    checkbox: {
        marginRight: 20,
        marginTop: 30
    },
    loginbtn: {
        borderRadius: 50,
        backgroundColor: '#1443C3',
        marginTop: 20
    }
});
