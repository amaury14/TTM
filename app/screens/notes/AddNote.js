import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

import firebase from '../../../database/firebase';
import colors from '../../config/colors';
import TTMButtom from '../components/TTMButtom';

const AddNote = (props) => {
    const user = props?.route?.params?.user;

    const initialState = {
        title: '',
        note: '',
        date: new Date().getTime(),
        loading: false
    };

    const [state, setState] = useState({
        ...initialState
    });

    useEffect(() => {
        setState(initialState);
    }, []);

    // Refreshing data on component focus
    useEffect(() => {
        const unsubscribe = props?.navigation?.addListener('focus', () => {
            setState(initialState);
        });
        return unsubscribe;
    }, [props?.navigation]);

    const handlePropChange = (name, value) => {
        setState({ ...state, [name]: value });
    };

    let showAlert = (title, text) => {
        Alert.alert(title, text, [{ text: 'Aceptar' }], { cancelable: false });
    };

    const fireAddNote = async () => {
        if (state?.title === '') {
            showAlert('Advertencia', 'Rellene el Título');
            return;
        }
        if (state?.note === '') {
            showAlert('Advertencia', 'Rellene la Nota');
            return;
        }
        try {
            handlePropChange('loading', true);
            await firebase.fireDb.collection('notes').add({
                title: state?.title,
                note: state?.note,
                date: state?.date,
                userId: user?.id
            });
            setState(initialState);
            handlePropChange('loading', false);
            props?.navigation?.navigate('Notes');
        } catch (error) {
            // Catch error
        }
    };

    return (
        <SafeAreaView style={styles.flex1}>
            <View style={styles.flex1}>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <KeyboardAvoidingView behavior="padding" style={styles.key}>
                        <View style={styles.row}>
                            <Text style={styles.label}>* Campos requeridos</Text>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text style={styles.label}>* Título</Text>
                                <TextInput
                                    style={styles.input}
                                    value={state?.title}
                                    underlineColorAndroid={colors.underlineColorAndroid}
                                    placeholder="Título"
                                    placeholderTextColor={colors.mainColor}
                                    onChangeText={(value) => handlePropChange('title', value)}
                                    blurOnSubmit={false}
                                />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text style={styles.label}>* Apuntes</Text>
                                <TextInput
                                    style={styles.inputNotes}
                                    value={state?.note}
                                    underlineColorAndroid={colors.underlineColorAndroid}
                                    placeholder="Escriba apuntes, pensamientos, sentimientos en el trading, movimientos del mercado, etc..."
                                    placeholderTextColor={colors.mainColor}
                                    onChangeText={(value) => handlePropChange('note', value)}
                                    numberOfLines={15}
                                    multiline={true}
                                />
                            </View>
                        </View>
                        <TTMButtom title="Guardar" customClick={() => fireAddNote()} />
                        {state?.loading && (
                            <View style={styles.loader}>
                                <ActivityIndicator size="large" color={colors.gray2} />
                            </View>
                        )}
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    column: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    flex1: {
        backgroundColor: colors.white,
        flex: 1
    },
    input: {
        borderColor: colors.gray,
        borderRadius: 8,
        borderWidth: 1.5,
        height: 30,
        marginRight: 5,
        padding: 3,
        width: 350
    },
    inputNotes: {
        borderColor: colors.gray,
        borderRadius: 8,
        borderWidth: 1.5,
        height: 300,
        marginRight: 5,
        padding: 5,
        textAlignVertical: 'top',
        width: 350
    },
    key: {
        flex: 1,
        justifyContent: 'space-between'
    },
    label: {
        color: colors.mainColor,
        fontSize: 12,
        fontWeight: 'bold'
    },
    loader: {
        marginTop: 20
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 20
    }
});

export default AddNote;
