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
    ScrollView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import backImg from '@/assets/images/backgroundProfile.png';
import Me from '@/assets/images/ME.jpg';
import Post from './Post';
import { UserInfo } from '@/context/UserInfo';
import { UserState } from '@/hooks/contextHook';
import useCrud from '@/hooks/useCrud';

const UserProfile = ({ navigation, route }: any) => {


    const { otherUser } = route.params ?? {};

    const { token, user , setUser } = UserState() ?? {}
    const { get, update, post } = useCrud()
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchingData = async () => {

            try {
                const response = await get(`api/v1/post?userId=${otherUser._id}`, token)
                setData(response)
            } catch (error) {
                console.log(error)
            }

        }

        fetchingData()

    }, [])


    const followingUser = async () => {
        try {
            const response = await update(`api/v1/user/${otherUser._id}`, {}, token)
            setUser(response.user);
            setOtherInfo(response.otherUser)
            console.log('here is other User',response.otherUser)
            const resChat = await post('api/v1/chat', { recieverId: otherUser._id }, token)

            
            console.log('you have followed this account and create chat with him successfully')
        } catch (error) {
            console.log(error)
        }
    }


    const scrollY = useRef(new Animated.Value(0)).current;

    // Interpolating translateY for the image and container
    const imageTranslateY = scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: [0, 55], // Move image up as you scroll
        extrapolate: 'clamp',
    });

    const containerTranslateY = scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: [0, -200], // Move container up as you scroll
        extrapolate: 'clamp',
    });

    // Interpolating borderRadius for the profileContainer
    const borderRadius = scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: [50, 0], // Adjust corner radius based on scroll
        extrapolate: 'clamp',
    });

    // Interpolating opacity for the backIcon
    const arrowOpacity = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0], // Fade out as you scroll down
        extrapolate: 'clamp',
    });

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={backImg} style={styles.backImg}>
                {/* Animated View for the backIcon */}
                <Animated.View
                    style={[styles.backIcon, { opacity: arrowOpacity }]} // Apply interpolated opacity
                >
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
                                <Text style={{ fontWeight: '700', fontSize: 20, marginBottom: 4 }}>{otherUser.followers.length}</Text>
                                <Text style={{ fontWeight: '500', fontSize: 14 }}>Followers</Text>
                            </View>

                            {/* Profile Image */}
                            <Animated.View
                                style={[
                                    styles.profileImageContainer,
                                    { transform: [{ translateY: imageTranslateY }] },
                                ]}
                            >
                                <Image source={{uri : otherUser.img}} style={styles.profileImg} />
                                <Animated.View style={{ marginTop: 50 }}>
                                    <Text style={{ fontSize: 18, fontWeight: '700' }}>@{otherUser.name}</Text>
                                </Animated.View>
                            </Animated.View>
                            <View style={[styles.followersInfo, { marginLeft: 20 }]}>
                                <Text style={{ fontWeight: '700', fontSize: 20, marginBottom: 4 }}>{otherUser.following.length}</Text>
                                <Text style={{ fontWeight: '500', fontSize: 14 }}>Following</Text>
                            </View>
                        </View>
                        <View style={styles.bio}>
                            <Text style={styles.bioText}>
                                {otherUser.bio}
                            </Text>
                            <View style={styles.btnContainer}>

                                {
                                    user.following.includes(otherUser._id) ?
                                        <View
                                            style={styles.btn}
                                        >
                                            <Text style={[styles.btnText]}>Followed</Text>
                                        </View>

                                        :
                                        <TouchableOpacity style={[styles.btn, { backgroundColor: '#5790DF' }]} onPress={followingUser}>
                                            <Text style={[styles.btnText, { color: 'white' }]}  >Follow</Text>
                                        </TouchableOpacity>
                                }

                                <TouchableOpacity style={styles.btn}>
                                    <Text style={styles.btnText}>Send chat</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* Scrollable content */}
                        <Animated.ScrollView
                            contentContainerStyle={{ flexGrow: 1 }}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                                { useNativeDriver: true }
                            )}
                            scrollEventThrottle={16}
                            bounces={false}  // Disable bouncing/overscrolling
                        >
                            <View style={styles.postContainer}>
                                {
                                    data.map((item: any) => (
                                        <Post data={item} />
                                    ))
                                }
                            </View>
                        </Animated.ScrollView>
                    </View>
                </Animated.View>
            </ImageBackground>
        </SafeAreaView >
    );
};

export default UserProfile;

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
