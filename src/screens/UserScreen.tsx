import React, { useEffect, useRef, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, Image, Alert, ActivityIndicator, Animated, TouchableOpacity, FlatList } from 'react-native'
import { useQuery } from '@apollo/client';
import SlidingUpPanel from 'rn-sliding-up-panel';

import { GET_USER_INFO } from '../graphql/queries';
import { Community, User_User } from '../graphql/queries/User/types';
import config from '../../config'
import icons from '../constants/icons';
import { SIZES } from '../constants/Layout';
import { CommunityLogo, UserAvatar } from '../components';

const iconUrl = config.ICON_URL

export function UserScreen() {
    const _draggedValue = useRef(new Animated.Value(0)).current
    let _panel: any = useRef(null)
    const { params }: any = useRoute()
    const [allowDragging, setAllowDragging] = useState(true)
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

    const onCommunityId = (id: string) => {
        const handleCommunity = getCommunitiesList?.find(el => {
            return el.id === id
        })
        setCommunity(handleCommunity)
        _panel.hide()
    }

    function rendeCommunitiesList() {
        return (
            <SlidingUpPanel
                ref={c => (_panel = c)}
                allowDragging={allowDragging}
                draggableRange={{
                    top: SIZES.height + 120,
                    bottom: 120,
                }}
                backdropOpacity={1}
                animatedValue={_draggedValue}
                snappingPoints={[SIZES.height + 120]}
                height={SIZES.height + 120}
                friction={0.8}
                onBottomReached={() => {
                    setAllowDragging(true);
                }}
            >
                <View style={styles.wrapper}>
                    <View style={{
                        height: 120,
                        justifyContent: 'flex-end',
                    }}>
                        <Text style={styles.title}>My communities</Text>
                        <View>
                            <FlatList
                                data={getCommunitiesList}
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                renderItem={({ item }) => {
                                    const { id } = item
                                    return (
                                        <TouchableOpacity
                                            onPress={() => onCommunityId(id)}>
                                            <Image
                                                source={{
                                                    uri: `${iconUrl}${id}`
                                                }}
                                                style={{
                                                    width: 56,
                                                    height: 56,
                                                    borderColor: 'white',
                                                    borderRadius: 50,
                                                    borderWidth: 1,
                                                    margin: 16
                                                }}
                                            />
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                            <Image
                                source={icons.plus}
                                style={{
                                    width: 56,
                                    height: 56,
                                    borderColor: 'white',
                                    borderRadius: 50,
                                    borderWidth: 1,
                                    margin: 16

                                }}
                            />
                        </View>
                    </View>
                </View>
            </SlidingUpPanel>
        )
    }

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

            {rendeCommunitiesList()}
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
        resizeMode: "contain",
        height: 44,
        width: 194,
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
    },
    wrapper: {
        flex: 1,
        padding: 20,
        backgroundColor: 'transparent',
        paddingTop: 621,
    },
    title: {
        fontSize: 24,
        lineHeight: 28,
        color: 'white'
    }
})