import React from 'react';
import { StyleSheet, Text } from 'react-native';

import colors from '../../config/colors';

const TTMText = (props) => {
    return <Text style={styles.text}>{props?.text}</Text>;
};

const styles = StyleSheet.create({
    text: {
        color: colors.darkBlue,
        fontSize: 18,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 16
    }
});

export default TTMText;
