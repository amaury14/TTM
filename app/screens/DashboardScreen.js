import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../config/colors';
import TDMDashboard from './components/TDMDashboard';
import TDMSplitter from './components/TDMSplitter';
import ViewAllOperation from './operations/ViewAllOperation';

const DashboardScreen = (props) => {
    const user = props.route.params.user;

    useEffect(() =>
        props.navigation.addListener('beforeRemove', (e) => {
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
                <TDMSplitter />
                <ViewAllOperation user={user} />
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        height: '100%',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    body: {
        backgroundColor: colors.white,
        flex: 1,
        justifyContent: 'center',
    }
});

export default DashboardScreen;
