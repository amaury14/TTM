import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../../config/colors';

const TTMSplitter = () => {
    return <View style={styles.splitter} />;
};

const styles = StyleSheet.create({
    splitter: {
        backgroundColor: colors.white,
        height: 1,
        margin: 10,
        width: 370
    }
});

export default TTMSplitter;
