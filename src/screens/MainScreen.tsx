import * as React from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';

export function MainScreen() {
    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.image}
                source={require("../assets/images/werze_black.png")}
            >
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>Log in</Text>
                </TouchableOpacity>

            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    btn: {
        marginBottom: 67,
    },
    btnText: {
        color: "white",
        fontSize: 20,
        fontWeight: 'bold',
    }
});
