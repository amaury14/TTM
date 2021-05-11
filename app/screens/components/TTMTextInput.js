import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import colors from '../../config/colors';

const TTMTextInput = (props) => {
    return (
        <View style={styles.view}>
            <TextInput
                underlineColorAndroid="transparent"
                placeholder={props?.placeholder}
                placeholderTextColor="#007FFF"
                keyboardType={props?.keyboardType}
                onChangeText={props?.onChangeText}
                returnKeyType={props?.returnKeyType}
                numberOfLines={props?.numberOfLines}
                multiline={props?.multiline}
                onSubmitEditing={props?.onSubmitEditing}
                style={props?.style}
                blurOnSubmit={false}
                value={props?.value}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        borderColor: colors.blue,
        borderWidth: 1,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 10
    }
});

export default TTMTextInput;
