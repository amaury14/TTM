import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Mytext = (props) => {
    return <Text style={styles.text}>{props.text}</Text>;
};

const styles = StyleSheet.create({
    text: {
        color: '#111825',
        fontSize: 18,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 16,
    },
});

export default Mytext;
