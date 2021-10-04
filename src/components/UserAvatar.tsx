import React from 'react'
import { Image, StyleSheet } from 'react-native'
import icons from '../constants/icons'
import config from '../../config'

const avatarUrl = config.AVATAR_URL

interface Prop {
    id: string | undefined
}

export const UserAvatar = ({ id }: Prop) => {
    const userAvatar = { uri: avatarUrl + id }
    return (
        <Image
            source={userAvatar}
            defaultSource={icons.avatar_def}
            style={{
                ...styles.avatar,

            }}
        />
    )
}
const styles = StyleSheet.create({
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 50,
        borderWidth: 1,
        marginBottom: 16,
    },
})