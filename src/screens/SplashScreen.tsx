import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const checkedUser = async () => {
            if (await isAuthenticated()) {
                navigation.navigate('UserScreen');
            } else {
                navigation.navigate('MainScreen');
                // navigation.navigate('CommunitiesScreen');
            }
        };
        checkedUser();
    }, []);

    const isAuthenticated = async () => {
        // await AsyncStorage.removeItem('token');
        const token = await AsyncStorage.getItem('token');
        // console.log("🔥🚀 ===>SplashScreen isAuthenticated ===> token", token);
        return !!token;
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator />
        </View>
    );
};

