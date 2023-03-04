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
import TTMHeader from '../components/TTMHeader';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8958974719234949/7113047539';

const UpdateNote = (props) => {
    const { id, user } = props?.route?.params;

    const initialState = {
        title: '',
        note: '',
        date: new Date().getTime()
    };

    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(false);

    useEffect(() => {
        getNoteById(id);
    }, [props]);

    const handlePropChange = (name, value) => {
        setState({ ...state, [name]: value });
    };

    const showAlert = (title, text) => {
        Alert.alert(title, text, [{ text: 'Aceptar' }], { cancelable: false });
    };

    const getNoteById = async (id) => {
        setLoading(true);
        const dbRef = firebase.fireDb.collection('notes').doc(id);
        const doc = await dbRef?.get();
        const note = doc?.data();
        setState({
            ...note
        });
        setLoading(false);
    };

    const updateNote = async () => {
        if (state?.title === '') {
            showAlert('Advertencia', 'Rellene el Título');
            return;
        }
        if (state?.note === '') {
            showAlert('Advertencia', 'Rellene la Nota');
            return;
        }
        try {
            setLoading2(true);
            const dbRef = firebase.fireDb.collection('notes').doc(id);
            await dbRef?.set({
                title: state?.title,
                note: state?.note,
                date: state?.date,
                userId: user?.id
            });
            setState(initialState);
            setLoading2(false);
            props?.navigation?.navigate('Notes');
        } catch (error) {
            // Catch error
        }
    };

    if (loading) {
        return (
            <View style={styles.flex1}>
                <ActivityIndicator size="large" color={colors.gray2} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.flex1}>
            <View style={styles.flex1}>
                <TTMHeader text={'Editar Apunte'} />
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
                        <TTMButtom title="Guardar" customClick={() => updateNote()} />
                        {loading2 && (
                            <View style={styles.loader}>
                                <ActivityIndicator size="large" color={colors.gray2} />
                            </View>
                        )}
                    </KeyboardAvoidingView>
                </ScrollView>
                <BannerAd
                    unitId={adUnitId}
                    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    column: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'center'
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
        height: 180,
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
        marginBottom: 10,
        marginTop: 10
    }
});

export default UpdateNote;
