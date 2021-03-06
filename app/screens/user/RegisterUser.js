import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TextInput,
    View
} from 'react-native';

import firebase from '../../../database/firebase';
import colors from '../../config/colors';
import TTMButtom from '../components/TTMButtom';

const RegisterUser = (props) => {
    const [state, setState] = useState({
        userName: '',
        userMail: '',
        userAddress: '',
        userPhone: '',
        loading: false
    });

    const handlePropChange = (name, value) => {
        setState({ ...state, [name]: value });
    };

    const showAlert = (title, text) => {
        Alert.alert(title, text, [{ text: 'Aceptar' }], { cancelable: false });
    };

    const fireNewUser = async () => {
        if (state?.userName === '') {
            showAlert('Advertencia', 'Rellene el Nombre de usuario');
            return;
        }
        if (state?.userMail === '') {
            showAlert('Advertencia', 'Rellene el Correo');
            return;
        }
        if (state?.userPhone === '') {
            showAlert('Advertencia', 'Rellene el Celular');
            return;
        }

        try {
            handlePropChange('loading', true);
            await firebase.fireDb.collection('users').add({
                userName: state?.userName,
                userMail: state?.userMail,
                userPhone: state?.userPhone,
                userAddress: state?.userAddress
            });
            handlePropChange('loading', false);
            props?.navigation?.navigate('DashboardScreen');
        } catch (error) {
            // Catch error
        }
    };

    return (
        <SafeAreaView style={styles.flex1}>
            <View style={styles.flex1}>
                <View style={styles.flex1}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <KeyboardAvoidingView behavior="padding" style={styles.key}>
                            <TextInput
                                style={styles.input}
                                underlineColorAndroid={colors.underlineColorAndroid}
                                placeholder="Usuario"
                                placeholderTextColor={colors.mainColor}
                                onChangeText={(value) => handlePropChange('userName', value)}
                                blurOnSubmit={false}
                            />
                            <TextInput
                                style={styles.input}
                                underlineColorAndroid={colors.underlineColorAndroid}
                                placeholder="Email"
                                placeholderTextColor={colors.mainColor}
                                onChangeText={(value) => handlePropChange('userMail', value)}
                                blurOnSubmit={false}
                            />
                            <TextInput
                                style={styles.input}
                                underlineColorAndroid={colors.underlineColorAndroid}
                                placeholder="# Celular"
                                placeholderTextColor={colors.mainColor}
                                onChangeText={(value) => handlePropChange('userPhone', value)}
                                blurOnSubmit={false}
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={styles.inputNotes}
                                underlineColorAndroid={colors.underlineColorAndroid}
                                placeholder="Address"
                                placeholderTextColor={colors.mainColor}
                                maxLength={225}
                                numberOfLines={3}
                                multiline={true}
                                onChangeText={(value) => handlePropChange('userAddress', value)}
                                blurOnSubmit={false}
                            />
                            <TTMButtom title="Guardar" customClick={() => fireNewUser()} />
                            {state.loading && (
                                <View style={styles.loader}>
                                    <ActivityIndicator size="large" color={colors.gray2} />
                                </View>
                            )}
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    flex1: {
        backgroundColor: colors.white,
        flex: 1
    },
    input: {
        borderColor: colors.gray,
        borderRadius: 8,
        borderWidth: 1.5,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 10,
        padding: 5
    },
    inputNotes: {
        borderColor: colors.gray,
        borderRadius: 8,
        borderWidth: 1.5,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 10,
        padding: 5,
        textAlignVertical: 'top'
    },
    key: {
        flex: 1,
        justifyContent: 'space-between'
    },
    loader: {
        marginTop: 20
    }
});

export default RegisterUser;
