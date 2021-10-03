import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, Image, Alert, ActivityIndicator } from 'react-native'
import config from '../../config'
import icons from '../constants/icons';
import { useApolloClient, useQuery } from '@apollo/client';
import { GET_USER_INFO } from '../graphql/queries';
import { User, User_User } from '../graphql/queries/User/types';

const community = config.COMMUNITY_URL
const avatar = config.AVATAR_URL

export function UserScreen() {
    const { params }: any = useRoute()
    // const client = useApolloClient();
    // console.log("🔥🚀 ===> UserScreen ===> client", client);
    const paramsUser = params?.user
    const paramsCommunityId = params?.communities?.[0].id
    // const styleOverride = params?.communities?.[0].styleOverride.background.value

    const [userInfo, setUserInfo] = useState<User_User>()
    const user = userInfo?.user
    console.log("🔥🚀 ===> UserScreen ===> user", user);
    const styleOverride = user?.communitiesWhereMember?.[0].styleOverride.background.value
    const userCommunityId = user?.communitiesWhereMember?.[0].id
    const communityId = userCommunityId ? userCommunityId : paramsCommunityId

    const { data, error, loading } = useQuery<User_User>(GET_USER_INFO, {
        variables: {
            where: {
                username: paramsUser?.username || 'test_werz_1',
            }
        }
    })

    useEffect(() => {
        if (error) {
            Alert.alert('Error fetching projects', error.message);
        }
    }, [error]);

    useEffect(() => {
        if (data) {
            setUserInfo(data);
        }
    }, [data]);

    if (loading) return <ActivityIndicator size="large" />


    function iconLogo() {
        if (communityId) {
            return (<Image
                source={{ uri: `${community}${communityId}` }}
                style={{
                    ...styles.logo, backgroundColor: 'white',
                    borderWidth: 2,
                    borderColor: "#ffffff"
                }}
            />)
        } else {
            return (<Image
                source={icons.logo_def}
                style={styles.logo}
            />)
        }
    }

    function iconAvatar() {
        if (user) {
            return (
                <Image
                    source={{
                        uri: `${avatar}${user?.id}`
                    }}
                    style={{
                        ...styles.avatar,
                    }}
                />
            )
        } else {
            return (
                <Image
                    source={icons.avatar_def}
                    style={{
                        ...styles.avatar,
                    }}
                />
            )
        }
    }

    return (
        <View style={{
            ...styles.container,
            backgroundColor: styleOverride
        }}>

            <View style={styles.logoWrap} >
                {iconLogo()}
            </View>

            {iconAvatar()}

            <View style={{ flexDirection: 'row' }}>
                <Text style={{ ...styles.textName, marginRight: 5 }}>
                    {user?.firstName}
                </Text>
                <Text style={styles.textName}>
                    {user?.lastName}
                </Text>
            </View>
            <Text style={styles.textUsername}>
                @{user?.username}
            </Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logoWrap: {
        position: 'absolute',
        top: 64,
        left: 32,
    },
    logo: {
        height: 24,
        width: 94,
    },
    avatarWrap: {
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 50,
        borderWidth: 1,
        marginBottom: 16,
    },
    textName: {
        fontSize: 24,
        lineHeight: 24,
        color: 'white'
    },
    textUsername: {
        textAlign: 'center',
        color: 'white',
        fontSize: 14,
        lineHeight: 14,
    }
})