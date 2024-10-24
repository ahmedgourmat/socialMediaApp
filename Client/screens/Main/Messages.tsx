import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import MessageItem from '@/components/MessageItem'
import { UserState } from '@/hooks/contextHook'
import useCrud from '@/hooks/useCrud'

const Messages = ({ navigation }: any) => {

  const {token} = UserState() ?? {}
  const {get} = useCrud()

  const [chats , setChats] = useState([])
  const [refreshing, setRefreshing] = useState(false);

  // Function to fetch chats data
  const fetchChats = async () => {
    try {
      const response = await get('api/v1/chat', token)
      setChats(response)
    } catch (error) {
      console.log(error)
    }
  }

  // Fetch data when the component is first mounted
  useEffect(() => {
    fetchChats()
  }, [])

  // Refresh function to be called when the user pulls down
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchChats(); // Re-fetch the chats data
    } catch (error) {
      console.log(error)
    } finally {
      setRefreshing(false); // Stop the refreshing indicator
    }
  }, [token]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.headSection}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headText}>Messages</Text>
        <TouchableOpacity>
          <Ionicons name="create-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.inp} placeholder='Search' />
      </View>

      <FlatList
        data={chats}
        keyExtractor={(item: any) => item._id.toString()} // Ensure unique keys
        renderItem={({ item }: any) => <MessageItem chat={item} navigation={navigation} />} // Pass the item to MessageItem
        style={styles.messagesContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> // Pull-to-refresh
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
