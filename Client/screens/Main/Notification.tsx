import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'

const Notification = ({navigation} : any) => {
  return (
    <SafeAreaView
      style={{flex : 1 , backgroundColor : 'white'}}
    >
      <View
        style={styles.headSection}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text
          style={styles.headText}
        >Notification</Text>
      </View>
    </SafeAreaView>
  )
}

export default Notification

const styles = StyleSheet.create({
  headSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  headText: {
    fontSize: 22,
    fontWeight: '600',
    marginLeft : 20
  },
})