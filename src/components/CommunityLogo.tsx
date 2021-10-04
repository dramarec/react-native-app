import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import config from '../../config'
import icons from '../constants/icons';

const communityUrl = config.COMMUNITY_URL

interface Prop {
    id: string | undefined
}
export const CommunityLogo = ({ id }: Prop) => {

    const url = { uri: `${communityUrl}${id}` } || icons.logo_def

    return (
        <View style={styles.logoWrap} >
            <Image
                source={url}
                style={styles.logo}
            />
        </View>
    )
}

const styles = StyleSheet.create({
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

})