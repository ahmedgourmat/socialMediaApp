import { Button, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CheckBox from 'react-native-check-box'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native' // Import navigation hook
import { Link } from 'expo-router';
import axios from 'axios'


const Login = () => {
  const [isSelected, setSelection] = useState(false)
  const navigation = useNavigation() // Initialize navigation
  const [values, setValues] = useState({
    email: '',
    password: ''
  });


  const createUser = async () => {
    try {
      console.log('here')
      const res = await axios.post('http://192.168.205.46:8080/api/v1/user/login', values); // Fixed typo here
      console.log('here')
      if (res.status >= 200 && res.status < 300) {
        console.log('Signup successfully');
        setValues({
          email: '',
          password: ''
        })
        
      }
    } catch (error: any) {
      console.log('Error signing up:', error.response ? error.response.data : error.message);
    }
  };

  const changeHandler = (name: string, value: string) => {
    setValues({ ...values, [name]: value }); // Correctly update state without e.target
  };


  return (
    <View style={{ flex: 1, paddingHorizontal: 25 }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Back Button in the Top Left */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.container}>
          <Text style={styles.header}>Login</Text>
          <TouchableOpacity style={styles.googlebtn}>
            <Ionicons name="logo-google" size={24} color="black" />
            <Text style={styles.textbtn}>SignUp with google</Text>
          </TouchableOpacity>
          <Text style={styles.text}>or signup with</Text>
        </View>
        <View style={styles.inpContainer}>
          <View style={{ width: '100%' }}>
            <Text style={styles.inpText}>Email address</Text>
            <TextInput placeholder='Email' keyboardType='email-address' style={styles.inp} onChangeText={(text) => changeHandler('email', text)} />
          </View>
          <View style={{ width: '100%', marginTop: 30 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Text style={styles.inpText}>Password</Text>
              <Link href='/ForgetPassword' style={[styles.inpText, { fontSize: 13, fontWeight: '600', color: '#0000EE' }]}>Forget password</Link>
            </View>
            <TextInput placeholder='Password' style={styles.inp} secureTextEntry={true} onChangeText={(text) => changeHandler('password', text)} />
          </View>
          <View>
            <CheckBox
              isChecked={isSelected}
              onClick={() => setSelection(!isSelected)}
              rightText='Keep me signed in'
              leftTextStyle={{ fontSize: 20 }}
              style={styles.checkbox}
              checkedCheckBoxColor='#59CDBE'
            />
          </View>
          <TouchableOpacity style={[styles.googlebtn, styles.loginbtn]}>
            <Text style={[styles.textbtn, { color: 'white', fontWeight: '500' }]} onPress={createUser}>Login</Text>
          </TouchableOpacity>
          <Text style={{ marginTop: 30, textAlign: 'center' }}>
            Don't have an account?{' '}
            <Link
              href='/Signup'
              style={{ color: '#0000EE' }} // Navigate to Signup screen
            >
              Sign up here
            </Link>
            <Link
              href='/VerifyEmail'
              style={{ color: '#0000EE' }} // Navigate to Signup screen
            >
              Verify
            </Link>
          </Text>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default Login

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
    marginTop: 50, // Adjust margin to accommodate back button
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
    marginTop: 30
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
})
