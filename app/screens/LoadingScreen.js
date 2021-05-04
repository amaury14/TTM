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
    body: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.white,
    },
    background: {
        flex: 1,
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
        justifyContent: 'center',
    },
    logo: {
        position: 'absolute',
        top: 50,
        height: 150,
        width: 150
    }
});

export default LoadingScreen;
