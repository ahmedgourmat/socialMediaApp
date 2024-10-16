import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import MessageItem from '@/components/MessageItem'

const Messages = ({ navigation }: any) => {

  const [fakeData, setFakeData] = useState([
    { id: 1, name: 'Ahmed' },
    { id: 2, name: 'Ahmed' },
    { id: 3, name: 'Ahmed' },
    { id: 4, name: 'Ahmed' },
    { id: 5, name: 'Ahmed' },
    { id: 6, name: 'Ahmed' },
    { id: 7, name: 'Ahmed' },
    { id: 8, name: 'Ahmed' },
    { id: 9, name: 'Ahmed' },
    { id: 10, name: 'Ahmed' },
    { id: 11, name: 'Ahmed' },
  ]);


  const [refreshing, setRefreshing] = useState(false);

  // Simulate data refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request to fetch new data
    setTimeout(() => {
      setFakeData([
        { id: 1, name: 'Ahmed' },
        { id: 2, name: 'Ahmed' },
        { id: 3, name: 'Ahmed' },
        { id: 4, name: 'Ahmed' },
        { id: 5, name: 'Ahmed' },
        { id: 6, name: 'Ahmed' },
        { id: 7, name: 'Ahmed' },
        { id: 8, name: 'Ahmed' },
        { id: 9, name: 'Ahmed' },
        { id: 10, name: 'Ahmed' },
        { id: 11, name: 'Ahmed' },
        { id: 12, name: 'New User' }, // Add a new item to simulate data refresh
      ]);
      setRefreshing(false); // End refreshing
    }, 2000); // Simulate a 2-second refresh
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: 'white' }}
    >
      <View
        style={styles.headSection}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text
          style={styles.headText}
        >Messages</Text>
        <TouchableOpacity>
          <Ionicons name="create-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View
        style={styles.inputContainer}
      >
        <TextInput style={styles.inp} placeholder='Search' />
      </View>
      <FlatList
        data={fakeData}
        keyExtractor={(item) => item.id.toString()} // Ensure unique keys
        renderItem={({ item }: any) => <MessageItem navigation={navigation} />} // Pass the item to MessageItem
        style={styles.messagesContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  )
}

export default Messages

const styles = StyleSheet.create({
  headSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-between',
  },
  headText: {
    fontSize: 22,
    fontWeight: '600'
  },
  inputContainer: {
    padding: 20
  },
  inp: {
    padding: 5,
    backgroundColor: '#E6E6E6',
    color: 'white',
    borderRadius: 10,
    paddingLeft: 10
  },
  messagesContainer: {
    paddingHorizontal: 20,
  }
})