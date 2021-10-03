import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, Image, Alert, ActivityIndicator, Animated, TouchableOpacity, FlatList } from 'react-native'
import { useQuery } from '@apollo/client';
import SlidingUpPanel from 'rn-sliding-up-panel';

import { GET_USER_INFO } from '../graphql/queries';
import { Community, User_User } from '../graphql/queries/User/types';
import config from '../../config'
import icons from '../constants/icons';
import { SIZES } from '../constants/Layout';

const communityUrl = config.COMMUNITY_URL
const avatarUrl = config.AVATAR_URL
const iconUrl = config.ICON_URL

export function UserScreen() {
    const { params }: any = useRoute()

    let _panel: any = useRef(null)
    const [allowDragging, setAllowDragging] = useState(true);
    const _draggedValue = useRef(new Animated.Value(0)).current;

    const paramsUser = params?.user
    const paramsCommunityId = params?.communities?.[0].id
    // const styleOverride = params?.communities?.[0].styleOverride.background.value

    const [userInfo, setUserInfo] = useState<User_User>()
    const user = userInfo?.user
    const getCommunitiesList = user?.communitiesWhereMember
    const styleOverride = user?.communitiesWhereMember?.[0].styleOverride.background.value
    const userCommunityId = user?.communitiesWhereMember?.[0].id
    const communityId = userCommunityId ? userCommunityId : paramsCommunityId

    const [community, setCommunity] = useState<Community>()
    console.log("🔥🚀 ===> UserScreen ===> community", community);
    const { data, error, loading } = useQuery<User_User>(GET_USER_INFO, {
        variables: {
            where: {
                username: paramsUser?.username ? paramsUser?.username : 'test_werz_1',
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

    const onCommunityId = (id: string) => {
        const handleCommunity = getCommunitiesList?.find(el => {
            return el.id === id
        })
        setCommunity(handleCommunity)
        _panel.hide()
    }

    function iconLogo() {
        if (communityId) {
            return (<Image
                source={{ uri: `${communityUrl}${communityId}` }}
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
                        uri: `${avatarUrl}${user?.id}`
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
                        <FlatList
                            data={getCommunitiesList}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            renderItem={({ item }) => {
                                const { id } = item
                                return (
                                    <TouchableOpacity
                                        onPress={() => onCommunityId(id)}
                                    >
                                        <Image
                                            source={{
                                                uri: `${iconUrl}${id}`
                                            }}
                                            style={{
                                                width: 56,
                                                height: 56,
                                                borderColor: 'yellow',
                                                borderWidth: 1,
                                                margin: 16

                                            }}
                                        />
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                </View>
            </SlidingUpPanel>
        )
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
        height: 24,
        width: 94,
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