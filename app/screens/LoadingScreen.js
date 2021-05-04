import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

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
            <ActivityIndicator size={90} color={colors.mainColor} />
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.white,
    }
});

export default LoadingScreen;
