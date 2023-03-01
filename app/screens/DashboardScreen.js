import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../config/colors';
import TTMDashboard from './components/TTMDashboard';
import TTMSplitter from './components/TTMSplitter';
import ViewAllOperation from './operations/ViewAllOperation';

const DashboardScreen = (props) => {
    const user = props?.route?.params?.user;

    useEffect(
        () =>
            props.navigation.addListener('beforeRemove', (effect) => {
                // Prevent default behavior of leaving the screen
                effect?.preventDefault();
            }),
        []
    );

    return (
        <View style={styles.body}>
                <TTMDashboard user={user} />
                <TTMSplitter />
                <ViewAllOperation user={user} />
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        height: '100%',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0
    },
    body: {
        backgroundColor: colors.white,
        flex: 1,
        justifyContent: 'center'
    }
});

export default DashboardScreen;
