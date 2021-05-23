import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import colors from '../../config/colors';

const TTMHeader = (props) => {
    const navigation = useNavigation();
    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.menu} onPress={() => navigation?.goBack()}>
                <Icon name="arrow-left" size={30} type="feather" color={colors.white} />
            </TouchableOpacity>
            <Text style={styles.text}>{props?.text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'flex-start',
        backgroundColor: colors.mainColor,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 15
    },
    text: {
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20
    }
});

export default TTMHeader;
