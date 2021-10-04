import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Alert, ActivityIndicator } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { useQuery } from '@apollo/client';

import { GET_USER_INFO } from '../graphql/queries';
import { Background, User_User } from '../graphql/queries/User/types';
import { CommunityLogo, SlideUpComponent, UserAvatar } from '../components';

export function UserScreen() {
    const { params }: any = useRoute()
    const [color, setColor] = useState<string | Background>()
    const [handleId, setHandleId] = useState<string>()
    const [userInfo, setUserInfo] = useState<User_User>()

    const paramsUser = params?.user
    const paramsCommunityId = params?.communities?.[0].id

    const user = userInfo?.user
    const getCommunitiesList = user?.communitiesWhereMember
    const userCommunityId = getCommunitiesList?.[0].id
    const communityId = userCommunityId ?? paramsCommunityId

    const { data, error, loading } = useQuery<User_User>(GET_USER_INFO, {
        variables: {
            where: {
                username: paramsUser?.username ?? 'test_werz_0',
            }
        }
    })

    useEffect(() => {
        if (error) {
            Alert.alert('Error fetching projects', error.message);
        }
    }, [error])

    useEffect(() => {
        if (data) {
            setUserInfo(data);
        }
    }, [data])

    if (loading) return <ActivityIndicator size="large" />

    return (
        <View style={[
            styles.container,
            { backgroundColor: `${color}` }
        ]}>
            <CommunityLogo id={handleId ?? communityId} />
            <UserAvatar id={user?.id} />

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

            <SlideUpComponent
                setColor={setColor}
                setCommunityId={setHandleId}
                getCommunitiesList={getCommunitiesList}
            />
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