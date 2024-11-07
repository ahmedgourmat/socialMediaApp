import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const StepOne = ({ navigation }: any) => {
    const [values, setValues] = useState({ name: '', email: '', password: '', confirmPassword: '' });

    const handleInputChange = (field: string, value: string) => {
        setValues({ ...values, [field]: value });
    };

    return (
        <View style={{ flex: 1, paddingHorizontal: 25 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <Text style={styles.header}>Sign Up - Step 1</Text>
                <View style={styles.inpContainer}>
                    <View style={{ width: '100%', marginTop: 10 }}>
                        <Text style={styles.inpText}>Full name</Text>
                        <TextInput placeholder='Full name' style={styles.inp} value={values.name} onChangeText={(text) => handleInputChange('name', text)} />
                    </View>
                    <View style={{ width: '100%', marginTop: 10 }}>
                        <Text style={styles.inpText}>Email address</Text>
                        <TextInput placeholder='Email' keyboardType='email-address' value={values.email} style={styles.inp} onChangeText={(text) => handleInputChange('email', text)} />
                    </View>
                    <View style={{ width: '100%', marginTop: 10 }}>
                        <Text style={styles.inpText}>Password</Text>
                        <TextInput placeholder='Password' value={values.password} style={styles.inp} secureTextEntry={true} onChangeText={(text) => handleInputChange('password', text)} />
                    </View>
                    <View style={{ width: '100%', marginTop: 10 }}>
                        <Text style={styles.inpText}>Confirm password</Text>
                        <TextInput placeholder='Confirm password' value={values.confirmPassword} style={styles.inp} secureTextEntry={true} onChangeText={(text) => handleInputChange('confirmPassword', text)} />
                    </View>
                    <TouchableOpacity style={[styles.googlebtn, styles.loginbtn]}>
                        <Text style={[styles.textbtn, { color: 'white', fontWeight: '500' }]} onPress={() => navigation.navigate('StepTwo', { values })}>Next</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
};

export default StepOne;

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 20,
        left: 10,
        zIndex: 10,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginTop: 50, // Adjust margin to accommodate back button
    },
    header: {
        fontSize: 25,
        fontWeight: '600',
        marginTop: 60
    },
    googlebtn: {
        width: '100%',
        paddingVertical: 15,
        backgroundColor: '#F4F7FF',
        alignItems: 'center',
        marginTop: 50,
        borderRadius: 8,
        flexDirection: 'row',
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
        flex: 1,
        justifyContent: 'center'
    },
    checkbox: {
        marginRight: 20,
        marginTop: 30,

    },
    loginbtn: {
        borderRadius: 50,
        backgroundColor: '#1443C3',
        marginTop: 20
    }
})