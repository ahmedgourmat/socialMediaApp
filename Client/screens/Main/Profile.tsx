import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import backImg from '@/assets/images/backgroundProfile.png';
import Post from './Post';
import { UserState } from '@/hooks/contextHook';
import useCrud from '@/hooks/useCrud';

const Profile = ({ navigation }: any) => {
  const { user, token } = UserState() ?? {};
  const { get } = useCrud();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const response = await get(`api/v1/post?userId=${user?._id}`, token);
        setPost(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchingData();
  }, [user, token]);

  // Interpolations for animations
  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 55],
    extrapolate: 'clamp',
  });

  const containerTranslateY = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -200],
    extrapolate: 'clamp',
  });

  const borderRadius = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [50, 0],
    extrapolate: 'clamp',
  });

  const arrowOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backImg} style={styles.backImg}>
        <Animated.View style={[styles.backIcon, { opacity: arrowOpacity }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[
            styles.profileContainer,
            {
              transform: [{ translateY: containerTranslateY }],
              borderTopLeftRadius: borderRadius,
              borderTopRightRadius: borderRadius,
            },
          ]}
        >
          <View>
            <View style={styles.firstInfoProfile}>
              <View style={[styles.followersInfo, { marginRight: 20 }]}>
                <Text style={styles.followerCount}>{user?.followers?.length}</Text>
                <Text style={styles.infoLabel}>Followers</Text>
              </View>

              <Animated.View
                style={[
                  styles.profileImageContainer,
                  { transform: [{ translateY: imageTranslateY }] },
                ]}
              >
                <Image source={{ uri: user?.img }} style={styles.profileImg} />
                <Animated.View style={styles.userNameContainer}>
                  <Text style={styles.userName}>@{user?.name}</Text>
                </Animated.View>
              </Animated.View>

              <View style={[styles.followersInfo, { marginLeft: 20 }]}>
                <Text style={styles.followerCount}>{user?.following?.length}</Text>
                <Text style={styles.infoLabel}>Following</Text>
              </View>
            </View>

            <View style={styles.bio}>
              <Text style={styles.bioText}>{user?.bio}</Text>
              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.editProfileBtn}>
                  <Text style={styles.editProfileBtnText}>Edit profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Saves')}>
                  <Text style={styles.btnText}>Saves</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Animated.ScrollView
              contentContainerStyle={styles.scrollContainer}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true }
              )}
              scrollEventThrottle={16}
              bounces={false}
            >
              <View style={styles.postContainer}>
                {loading ? (
                  <ActivityIndicator size="large" color="#5790DF" />
                ) : (
                  post.map((item: any) => (
                    <Post key={item._id} data={item} />
                  ))
                )}
              </View>
            </Animated.ScrollView>
          </View>
        </Animated.View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backImg: {
    flex: 1,
  },
  backIcon: {
    backgroundColor: '#FFF',
    width: 44,
    height: 44,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    zIndex: 3,
  },
  profileContainer: {
    marginTop: 110,
    flex: 1,
    backgroundColor: '#E6EEFA',
    zIndex: 2,
    position: 'relative',
  },
  firstInfoProfile: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
  },
  profileImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 2,
  },
  profileImg: {
    width: 99,
    height: 99,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: 'white',
    position: 'absolute',
    top: -50,
    zIndex: 9999,
  },
  followersInfo: {
    alignItems: 'center',
  },
  followerCount: {
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 4,
  },
  infoLabel: {
    fontWeight: '500',
    fontSize: 14,
  },
  bio: {
    paddingHorizontal: 40,
    marginTop: 55,
  },
  bioText: {
    textAlign: 'center',
    color: '#6C7A9C',
  },
  btnContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },
  editProfileBtn: {
    backgroundColor: '#5790DF',
    width: 120,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  editProfileBtnText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '400',
  },
  btn: {
    backgroundColor: 'white',
    width: 120,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  btnText: {
    fontSize: 15,
    fontWeight: '400',
  },
  userNameContainer: {
    marginTop: 50,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  postContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingVertical: 20,
  },
});
