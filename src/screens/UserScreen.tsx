import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, Alert, ActivityIndicator } from 'react-native'
import { useQuery } from '@apollo/client';

import { GET_USER_INFO } from '../graphql/queries';
import { Community, User_User } from '../graphql/queries/User/types';
import { CommunityLogo, SlideUpComponent, UserAvatar } from '../components';

export function UserScreen() {
    const { params }: any = useRoute()
    const [userInfo, setUserInfo] = useState<User_User>()
    const [community, setCommunity] = useState<Community>()

    const paramsUser = params?.user
    const paramsCommunityId = params?.communities?.[1].id
    const user = userInfo?.user
    const getCommunitiesList = user?.communitiesWhereMember
    const styleOverrideValue = getCommunitiesList?.[1]?.styleOverride?.background?.value
    const userCommunityId = getCommunitiesList?.[1].id
    const communityId = userCommunityId ?? paramsCommunityId
    const id = community?.id ?? communityId

    const styleOverride =
        community?.styleOverride?.background?.value
            ? community?.styleOverride?.background?.value
            : styleOverrideValue

    const { data, error, loading } = useQuery<User_User>(GET_USER_INFO, {
        variables: {
            where: {
                username: paramsUser?.username ?? 'test_werz_1',
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
        <View style={{
            ...styles.container,
            backgroundColor: styleOverride ? styleOverride : 'tomato'
        }}>
            <CommunityLogo id={id} />
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
                getCommunitiesList={getCommunitiesList}
                setCommunity={setCommunity}
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