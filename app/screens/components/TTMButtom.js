import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import colors from '../../config/colors';

const TTMButtom = (props) => {
    return (
        <TouchableOpacity style={styles.button} onPress={props?.customClick}>
            <Text style={styles.text}>{props?.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: colors.mainColor,
        borderRadius: 8,
        color: colors.white,
        marginLeft: 35,
        marginRight: 35,
        padding: 5
    },
    text: {
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default TTMButtom;
