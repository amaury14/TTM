import React, { useEffect, useState } from 'react';
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

const UpdateUser = (props) => {
    const { id } = props?.route?.params;
    const initialState = {
        id: '',
        userName: '',
        userMail: '',
        userAddress: '',
        userPhone: ''
    };

    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserById(id);
    }, []);

    const handlePropChange = (name, value) => {
        setState({ ...state, [name]: value });
    };

    const showAlert = (title, text) => {
        Alert.alert(title, text, [{ text: 'Aceptar' }], { cancelable: false });
    };

    const getUserById = async (id) => {
        const dbRef = firebase.fireDb.collection('users').doc(id);
        const doc = await dbRef?.get();
        const user = doc?.data();
        setState({
            ...user,
            id: user?.id
        });
        setLoading(false);
    };

    const updateUser = async () => {
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
        const dbRef = firebase.fireDb.collection('users').doc(id);
        await dbRef?.set({
            userName: state?.userName,
            userMail: state?.userMail,
            userAddress: state?.userAddress,
            userPhone: state?.userPhone
        });
        setState(initialState);
        props?.navigation?.navigate('DashboardScreen');
    };

    const deleteUser = async () => {
        const dbRef = firebase.fireDb.collection('users').doc(id);
        await dbRef?.delete();
        props?.navigation?.navigate('DashboardScreen');
    };

    const openConfirmationAlert = () => {
        Alert.alert('Advertencia', 'Está seguro de eliminar el usuario?', [
            { text: 'Aceptar', onPress: () => deleteUser() },
            { text: 'Cancelar' }
        ]);
    };

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color={colors.gray2} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.view1}>
            <View style={styles.view2}>
                <View style={styles.view1}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <KeyboardAvoidingView behavior="padding" style={styles.keyboardView}>
                            <TextInput
                                style={styles.input}
                                value={state?.userName}
                                underlineColorAndroid={colors.underlineColorAndroid}
                                placeholder="Enter Name"
                                placeholderTextColor={colors.mainColor}
                                onChangeText={(value) => handlePropChange('userName', value)}
                                blurOnSubmit={false}
                            />
                            <TextInput
                                style={styles.input}
                                value={state?.userMail}
                                underlineColorAndroid={colors.underlineColorAndroid}
                                placeholder="Enter Email"
                                placeholderTextColor={colors.mainColor}
                                onChangeText={(value) => handlePropChange('userMail', value)}
                                blurOnSubmit={false}
                            />
                            <TextInput
                                style={styles.input}
                                value={state?.userPhone}
                                underlineColorAndroid={colors.underlineColorAndroid}
                                placeholder="# Celular"
                                placeholderTextColor={colors.mainColor}
                                onChangeText={(value) => handlePropChange('userPhone', value)}
                                blurOnSubmit={false}
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={styles.inputNotes}
                                value={state?.userAddress}
                                underlineColorAndroid={colors.underlineColorAndroid}
                                placeholder="Enter Address"
                                placeholderTextColor={colors.mainColor}
                                maxLength={225}
                                numberOfLines={3}
                                multiline={true}
                                onChangeText={(value) => handlePropChange('userAddress', value)}
                                blurOnSubmit={false}
                            />
                            <TTMButtom title="Guardar" action="save" customClick={() => updateUser()} />
                            <TTMButtom title="Eliminar" action="delete" customClick={() => openConfirmationAlert()} />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
    keyboardView: {
        flex: 1,
        justifyContent: 'space-between'
    },
    view1: {
        flex: 1
    },
    view2: {
        backgroundColor: colors.white,
        flex: 1
    }
});

export default UpdateUser;
