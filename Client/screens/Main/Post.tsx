import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Me from '@/assets/images/ME.jpg'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome1 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import CommentsModal from '@/components/CommentsModal';
import useCrud from '@/hooks/useCrud';
import { UserState } from '@/hooks/contextHook';

const Post = ({ post }: any) => {
    const [modalVisible, setModalVisible] = useState(false)
    const { get } = useCrud()
    const { token } = UserState() ?? {}
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false) // New loading state

    const fetchingData = async () => {
        try {
            setLoading(true) // Start loading
            console.log(token)
            console.log(post._id)

            const response = await get(`api/v1/comments/${post._id}`, token)
            console.log(response)
            setComments(response)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false) // Stop loading after fetch
        }
    }

    return (
        <View style={styles.postContainer}>
            <View style={styles.profileInfo}>
                <Image source={Me} style={styles.profileImage} />
                <View>
                    <Text style={styles.profileText1}>{post.userP.name}</Text>
                    <Text style={styles.profileText2}>@{post.userP.name}</Text>
                </View>
            </View>
            <Image src={post.img} style={styles.postImage} />
            <View style={styles.postActivity}>
                <View style={styles.activitySection}>
                    <FontAwesome6 name="heart" size={24} color="black" />
                    <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 5, marginRight: 15 }}>3K</Text>
                    <FontAwesome5 name="comment" size={24} color="black" onPress={() => { setModalVisible(true); fetchingData() }} />
                    <Text style={{ fontSize: 16, fontWeight: '600', marginHorizontal: 5 }}>102</Text>
                </View>
                <View style={styles.activitySection}>
                    <FontAwesome1 name="paper-plane" size={24} color="black" />
                    <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 5, marginRight: 15 }}>600</Text>
                    <Feather name="bookmark" size={26} color="black" />
                    <Text style={{ fontSize: 16, fontWeight: '600', marginHorizontal: 5 }}>67</Text>
                </View>
            </View>
            {/* Pass the loading state to the CommentsModal */}
            <CommentsModal modalVisible={modalVisible} setModalVisible={setModalVisible} comments={comments} postId={post._id} loading={loading} />
        </View>
    )
}

export default Post

const styles = StyleSheet.create({
    postContainer: {
        padding: 14,
        backgroundColor: '#E6EEFA',
        borderRadius: 40,
        marginBottom: 20
    },
    profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    profileImage: {
        width: 36,
        height: 36,
        borderRadius: 50,
        marginRight: 10
    },
    profileText1: {
        fontWeight: '700',
        fontSize: 16
    },
    profileText2: {
        color: '#6C7A9C',
        fontSize: 14
    },
    postImage: {
        height: 268,
        width: 350,
        borderRadius: 30
    },
    postActivity: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    activitySection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    }
})
