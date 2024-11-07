import { StyleSheet } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StepOne from './signupScreens/StepOne';
import StepTwo from './signupScreens/StepTwo';
import StepThree from './signupScreens/StepThree';

const Signup = () => {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName="StepOne" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="StepOne" component={StepOne} />
            <Stack.Screen name="StepTwo" component={StepTwo} />
            <Stack.Screen name="StepThree" component={StepThree} />
        </Stack.Navigator>
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
        width: '100%',
        paddingVertical: 15,
        backgroundColor: '#F4F7FF',
        alignItems: 'center',
        marginTop: 10,
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
