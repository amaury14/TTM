import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import colors from '../../config/colors';

const TTMHeader = (props) => {
    const navigation = useNavigation();
    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.menu} onPress={() => navigation?.goBack()}>
                <FontAwesomeIcon icon="arrow-left" size={30} color={colors.white} />
            </TouchableOpacity>
            <Text style={styles.text}>{props?.text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        backgroundColor: colors.mainColor,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 15
    },
    text: {
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15
    }
});

export default TTMHeader;
