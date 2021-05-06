import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../config/colors';
import TDMDashboard from './components/TDMDashboard';
import ViewAllOperation from './operations/ViewAllOperation';

const DashboardScreen = (props) => {
    const user = props.route.params.user;

    useEffect(() =>
        props.navigation.addListener("beforeRemove", (e) => {
            // Prevent default behavior of leaving the screen
            e.preventDefault();
        }),
    []
    );

    return (
        <View style={styles.body}>
            <LinearGradient
                colors={[
                    colors.mainColor,
                    colors.mainColor,
                    colors.mainColor,
                    colors.white,
                    colors.white,
                ]}
                style={styles.background}
            >
                <TDMDashboard user={user} />
                <View style={styles.splitter} />
                <ViewAllOperation user={user} />
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        height: "100%",
        left: 0,
        position: "absolute",
        right: 0,
        top: 0,
    },
    body: {
        backgroundColor: colors.white,
        flex: 1,
        justifyContent: "center",
    },
    splitter: {
        backgroundColor: colors.white,
        height: 1,
        margin: 10,
        width: 370,
    },
});

export default DashboardScreen;
