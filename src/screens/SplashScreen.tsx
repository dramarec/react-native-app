import React, { useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const SplashScreen = () => {
    const navigation = useNavigation()

    useEffect(() => {
        const checkedUser = async (): Promise<any> => {
            if (await isAuthenticated()) {
                navigation.navigate('UserScreen')
            } else {
                navigation.navigate('MainScreen')
            }
        }
        checkedUser()
    }, [navigation])

    const isAuthenticated = async () => {
        // await AsyncStorage.removeItem('token')
        const token = await AsyncStorage.getItem('token')
        return !!token
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator />
        </View>
    )
}
