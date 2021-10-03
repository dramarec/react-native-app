import React from 'react'
import { useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, Image } from 'react-native'
import config from '../../config'
import icons from '../constants/icons';

const community = config.COMMUNITY_URL
const avatar = config.AVATAR_URL

export function UserScreen() {
    const { params }: any = useRoute()
    console.log("🔥🚀 ===> UserScreen ===> params", params);
    // const communityId = params?.communities?.[0].id
    // console.log("🔥🚀 ===> UserScreen ===> communityId", communityId);
    const user = params?.user
    // console.log("🔥🚀 ===> UserScreen ===> user", user);
    const styleOverride = params?.communities?.[0].styleOverride.background.value

    return (
        <View style={{
            ...styles.container,
            backgroundColor: styleOverride
        }}>

            <View style={styles.logoWrap} >
                <Image
                    source={icons.logo_def}
                    // source={{
                    //     uri: `${community}${communityId}`,
                    // }}
                    style={styles.logo}
                />
            </View>

            <Image
                source={icons.avatar_def}
                // source={{
                //     uri: `${avatar}${user?.id}`
                // }}
                style={{
                    ...styles.avatar,
                }}
            />
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ ...styles.textName, marginRight: 5 }}>{user?.firstName}</Text>
                <Text style={styles.textName}>{user?.lastName}</Text>
            </View>
            <Text style={styles.username}>
                @{user.username}
            </Text>
        </View >
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
        marginBottom: 16,
        width: 120,
        height: 120,
    },
    textName: {
        fontSize: 24,
        lineHeight: 24,
        color: 'white'
    },
    username: {
        textAlign: 'center',
        color: 'white',
        fontSize: 14,
        lineHeight: 14,
    }
})