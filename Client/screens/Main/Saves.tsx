import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import useCrud from '@/hooks/useCrud';
import { UserState } from '@/hooks/contextHook';
import Post from './Post';
import Ionicons from '@expo/vector-icons/Ionicons';

const Saves = () => {
  const navigation = useNavigation<any>();
  const { token } = UserState() ?? {};
  const { get } = useCrud();
  const [savedPosts, setSavedPosts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Fetch saved posts
  const fetchSavedPosts = async () => {
    try {
      const response = await get('api/v1/saves', token); // Adjust the API endpoint as needed
      console.log('here is saves', response)
      setSavedPosts(response); // Adjust based on the response structure
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSavedPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}
      >
        <Ionicons name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Saved Posts</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {loading ? (
          <Text>Loading...</Text> // Placeholder for loading state
        ) : (
          savedPosts.map((post) => <Post key={post.postS._id} data={post.postS} />) // Pass the post data to the Post component
        )}
      </ScrollView>
    </View>
  );
};

export default Saves;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft : 10
  },
  scrollViewContainer: {
    paddingBottom: 20,
  },
});
