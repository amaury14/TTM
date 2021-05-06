import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';

import firebase from '../../database/firebase';
import colors from '../config/colors';

const LoadingScreen = (props) => {

    useEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = async () => {
        await firebase.firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                props.navigation.navigate('BottomTabScreen');
            } else {
                props.navigation.navigate('LoginScreen');
            }
        });
    }

    return (
        <View style={styles.body}>
            <LinearGradient
                colors={[colors.mainColor, colors.mainColor, colors.mainColor, colors.white, colors.white]}
                style={styles.background}
            >
                <Image
                    style={styles.logo}
                    source={require('../assets/rocket2.png')}
                />
                <ActivityIndicator size={90} color={colors.white} />
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        alignItems: 'center',
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    body: {
        alignItems: 'center',
        backgroundColor: colors.white,
        flex: 1,
        justifyContent: 'center',
    },
    logo: {
        height: 150,
        position: 'absolute',
        top: 50,
        width: 150
    }
});

export default LoadingScreen;
