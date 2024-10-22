import { Modal, StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import useCrud from '@/hooks/useCrud'
import { UserState } from '@/hooks/contextHook'

const CommentsModal = ({ modalVisible, postId, setModalVisible, comments, loading  }: any) => {

  const [text, setText] = useState('')
  const { post } = useCrud()
  const { token } = UserState() ?? {}

  const createComment = async () => {

    try {
      const response = await post('api/v1/comments', { text, postId }, token)
      setText('')
      console.log(response)
      comments.unshift(response.comment)
      console.log('comment created successfully')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true} // Set transparent for partial modal view
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Comments</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007BFF" />
              <Text>Loading comments...</Text>
            </View>
          ) : (
            <FlatList
              data={comments}
              keyExtractor={(item) => item._id.toString()}
              renderItem={({ item }) => (
                <View style={styles.commentItem}>
                  <Text style={styles.commentUser}>{item.userC.name}</Text>
                  <Text style={styles.commentText}>{item.text}</Text>
                </View>
              )}
            />
          )}

          {/* Comment Input */}
          <View style={styles.commentInputContainer}>
            <TextInput
              placeholder="Add a comment..."
              style={styles.commentInput}
              onChangeText={(text) => setText(text)}
              value={text}
            />
            <TouchableOpacity style={styles.postButton} onPress={createComment}>
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default CommentsModal

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end', // Align the modal at the bottom
  },
  modalContent: {
    height: '50%', // Make it half the screen height
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    color: '#007BFF',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  commentUser: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  commentText: {
    color: '#333',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingVertical: 10,
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  postButton: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007BFF',
    borderRadius: 20,
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})
