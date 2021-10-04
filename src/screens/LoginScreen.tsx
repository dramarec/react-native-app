import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    TouchableOpacity,
    Text,
    TextInput,
    Linking,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LOGIN_MUTATION } from '../graphql/mutations';
import { Login_Login } from '../graphql/mutations/Login/types';
import icons from '../constants/icons'

export function LoginScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<any>>()
    const goBack = () => {
        navigation.navigate('MainScreen')
    }
    const keyboardHide = () => {
        Keyboard.dismiss();
    }

    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')
    const [login, { data, error, loading }] = useMutation<Login_Login>(LOGIN_MUTATION, {
        onCompleted: data => {
            if (data?.login?.token) {
                AsyncStorage.setItem('token', data.login.token)
                    .then(() => {
                        navigation.navigate('UserScreen', {
                            ...data.login
                        })
                    })
            }
        }
    })

    useEffect(() => {
        if (error) {
            Alert.alert('Error login', error.message)
        }
    }, [error])

    let disabled = false
    if (identifier === '' || password === '') {
        disabled = true
    }

    const onSubmit = () => {
        login({ variables: { identifier, password } })
    }

    return (
        <TouchableWithoutFeedback onPress={keyboardHide}>

            <View style={styles.container}>
                <ImageBackground
                    style={styles.image}
                    source={require("../assets/images/werze_sky.png")}
                >
                    <TouchableOpacity style={styles.goBackBtn} onPress={goBack}>
                        <Text style={styles.btnText}>Go back</Text>
                    </TouchableOpacity>

                    <View
                        style={{
                            marginBottom: 310,
                        }}>

                        <View style={{
                            ...styles.form,
                        }}
                        >
                            <Text style={styles.hero}>
                                Welcome back!
                            </Text>
                            <Text style={styles.text}>
                                Log in using your username or phone number.
                            </Text>
                            <TextInput
                                value={identifier.toLowerCase()}
                                onChangeText={setIdentifier}
                                style={styles.input}
                                textAlign={"center"}
                                placeholder='Username'
                                maxLength={20}
                            />
                            <TextInput
                                style={styles.input}
                                textAlign={"center"}
                                value={password}
                                onChangeText={setPassword}
                                placeholder='Password'
                                secureTextEntry={true}
                            />

                            <Text
                                style={styles.linkText}
                                onPress={() => Linking.openURL('http://google.com')}>
                                Forgot password
                            </Text>
                        </View>

                        <TouchableOpacity
                            disabled={loading}
                            onPress={onSubmit}
                            activeOpacity={disabled ? 1 : 0.3}
                            style={{
                                ...styles.formBtn,
                            }}>
                            <Image
                                source={icons.button}
                                resizeMode="contain"
                                style={{
                                    opacity: disabled ? 0.3 : 1,
                                }}
                            />
                            {loading ? (
                                <ActivityIndicator style={{
                                    position: 'absolute',
                                }} />
                            ) : (
                                <Text
                                    style={{
                                        ...styles.formBtnText,
                                        color: disabled ? 'rgba(175, 175, 175, 0.226)' : 'white',
                                    }}
                                >
                                    Log In
                                </Text>
                            )}
                        </TouchableOpacity>

                    </View>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#5fbeeb",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    goBackBtn: {
        position: 'absolute',
        top: 76,
        left: 30
    },
    userBtn: {
        position: 'absolute',
        top: 106,
        left: 30
    },
    btnText: {
        color: "white",
        fontSize: 16,
        lineHeight: 16
    },
    form: {
        backgroundColor: 'white',
        shadowRadius: 1,
        shadowOpacity: 1,
        shadowOffset: {
            width: 2,
            height: 2
        },
        borderColor: '#1b1d2299',
        borderRadius: 8,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 24,
        paddingBottom: 24,
    },
    hero: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        marginBottom: 8,
    },
    text: {
        fontSize: 14,
        lineHeight: 22,
        textAlign: 'center',
        marginBottom: 24,
    },
    input: {
        marginRight: 'auto',
        marginLeft: 'auto',
        width: 295,
        height: 48,
        padding: 10,
        backgroundColor: 'white',
        borderColor: '#1b1d2299',
        borderWidth: 1,
        borderRadius: 8,
        shadowColor: '#3a3a3a',
        shadowRadius: 0.5,
        shadowOpacity: 0.8,
        shadowOffset: {
            width: 2,
            height: 2
        },
        marginBottom: 8,
    },
    formBtn: {
        height: 40,
        width: 128,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 40,
        shadowRadius: 1,
        shadowOpacity: 1,
        shadowOffset: {
            width: 2,
            height: 2
        },
        borderColor: 'rgba(27, 29, 34, 0.48)',

    },
    formBtnText: {
        position: 'absolute',
        fontSize: 18,
        fontWeight: 'bold',
    },
    linkText: {
        fontSize: 14,
        lineHeight: 14,
        textAlign: 'center',
        textDecorationLine: 'underline',
        color: '#1B1D22',
        opacity: 0.6,
        marginTop: 10,
    }
});