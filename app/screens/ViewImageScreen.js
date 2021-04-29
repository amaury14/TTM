import React from 'react';
import { Image, Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

import colors from '../config/colors';

function ViewImageScreen(props) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.closeIcon}></View>
                <View style={styles.deleteIcon}></View>
                <Image
                    resizeMode="center"
                    style={styles.image}
                    source={require('../assets/background2.png')} />
            </View>            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    closeIcon: {
        width: 50,
        height: 50,
        backgroundColor: colors.primary,
        position: "absolute",
        top: 40,
        left: 30,
    },
    deleteIcon: {
        width: 50,
        height: 50,
        backgroundColor: colors.secondary,
        position: "absolute",
        top: 40,
        right: 30,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    viewContainer: {
        backgroundColor: colors.black,
        flex: 1,
    }
})

export default ViewImageScreen;