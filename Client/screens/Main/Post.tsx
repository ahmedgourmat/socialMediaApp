import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Me from '@/assets/images/ME.jpg';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import CommentsModal from '@/components/CommentsModal';
import useCrud from '@/hooks/useCrud';
import { UserState } from '@/hooks/contextHook';
import { useNavigation } from '@react-navigation/native';

const Post = ({ data }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { get, post, remove , update } = useCrud(); // Added del for DELETE requests
  const { token, user } = UserState() ?? {};
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false); // Track if the post is saved
  const [likes, setLikes] = useState(data.likes || 0); // Track the number of likes
  const [isLiked, setIsLiked] = useState(data.isLikedByUser || false); // Track if the user has liked the post
  const navigation = useNavigation<any>();
  console.log

  // Fetch comments
  const fetchingData = async () => {
    try {
      setLoading(true);
      const response = await get(`api/v1/comments/${data._id}`, token);
      setComments(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Open profile based on user match
  const openProfile = () => {
    if (user.email == data.userP.email) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('UserProfile', { otherUser: data.userP });
    }
  };

  // Check if the post is already saved
  const checkIfSaved = async () => {
    try {
      const response = await get(`api/v1/saves/${data._id}`, token);
      setIsSaved(response.saved); // Update based on the API response
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfSaved(); // Check if post is saved when component mounts
  }, []);

  // Toggle save/unsave post
  const toggleSavePost = async () => {
    try {
      if (isSaved) {
        // Unsave the post
        const response = await remove(`api/v1/saves/${data._id}`, token); // Delete request to unsave
        setIsSaved(false);
      } else {
        // Save the post
        const response = await post('api/v1/saves', { postId: data._id }, token);
        setIsSaved(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Toggle like/unlike post
  const toggleLike = async () => {
    try {
      if (isLiked) {
        // Unlike the post
        await remove(`api/v1/likes/${data._id}`, token);
        setLikes((prev : any) => prev - 1);
        setIsLiked(false);
      } else {
        // Like the post
        await update(`api/v1/post/${data._id}`,{}, token);
        setLikes((prev : any) => prev + 1);
        setIsLiked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.postContainer}>
      <Pressable style={styles.profileInfo} onPress={openProfile}>
        <Image source={Me} style={styles.profileImage} />
        <View>
          <Text style={styles.profileText1}>{data.userP.name}</Text>
          <Text style={styles.profileText2}>@{data.userP.name}</Text>
        </View>
      </Pressable>
      <Image src={data.img} style={styles.postImage} />
      <View style={styles.postActivity}>
        <View style={styles.activitySection}>
          <FontAwesome6
            name="heart"
            size={24}
            color={isLiked ? 'red' : 'black'}
            onPress={toggleLike} // Toggle like on press
          />
          <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 5, marginRight: 15 }}>{likes}</Text>
          <FontAwesome5
            name="comment"
            size={24}
            color="black"
            onPress={() => { setModalVisible(true); fetchingData(); }}
          />
          <Text style={{ fontSize: 16, fontWeight: '600', marginHorizontal: 5 }}>{comments.length}</Text>
        </View>
        <View style={styles.activitySection}>
          <Feather
            name="bookmark"
            size={26}
            color={isSaved ? 'blue' : 'black'}
            onPress={toggleSavePost}
          />
        </View>
      </View>
      <CommentsModal modalVisible={modalVisible} setModalVisible={setModalVisible} comments={comments} postId={data._id} loading={loading} />
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  postContainer: {
    padding: 14,
    backgroundColor: '#E6EEFA',
    borderRadius: 40,
    marginBottom: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 50,
    marginRight: 10,
  },
  profileText1: {
    fontWeight: '700',
    fontSize: 16,
  },
  profileText2: {
    color: '#6C7A9C',
    fontSize: 14,
  },
  postImage: {
    height: 268,
    width: 350,
    borderRadius: 30,
  },
  postActivity: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  activitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
