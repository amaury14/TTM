import React from 'react';
import { Image, ImageBackground, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

import colors from '../config/colors';

function WelcomeScreen(props) {
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                style={styles.background}
                source={require("../assets/background.png")}
            >
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../assets/icon2.png')} />
                    <Text style={styles.logoText}>To The Moon</Text>
                </View>
                <View style={styles.loginButton}></View>
                <View style={styles.registerButton}></View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    loginButton: {
        width: "100%",
        height: 70,
        backgroundColor: colors.props,
    },    
    logo: {
        width: 100,
        height: 100,
    },
    logoContainer: {
        position: "absolute",
        top: 70,
        alignItems: "center",
    },
    logoText: {
        color: "white",
        fontSize: 20,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    registerButton: {
        width: "100%",
        height: 70,
        backgroundColor: colors.secondary,
    }
})

export default WelcomeScreen;