import React from 'react'
import { useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native'

export function UserScreen() {
    const { params } = useRoute()
    console.log("🔥🚀 ===> params", params);

    return (
        <View style={styles.container}>
            <Text>UserScreen</Text>
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
})