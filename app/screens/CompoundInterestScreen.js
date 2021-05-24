import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import colors from '../config/colors';
import TTMSplitter from './components/TTMSplitter';
import TTMButtom from './components/TTMButtom';
import TTMHeader from './components/TTMHeader';

const CompoundInterestScreen = () => {
    const initialState = {
        investment: 0,
        monthlyRate: 0,
        months: 0,
        result: []
    };

    const [state, setState] = useState({
        ...initialState
    });

    const handlePropChange = (name, value) => {
        setState({ ...state, [name]: value });
    };

    const showAlert = (title, text) => {
        Alert.alert(title, text, [{ text: 'Aceptar' }], { cancelable: false });
    };

    const calculateInterest = () => {
        if (state?.investment <= 0 || state?.investment === '') {
            showAlert('Advertencia', 'Rellene la Inversión');
            return;
        }
        if (state?.months <= 0 || state?.months === '') {
            showAlert('Advertencia', 'Rellene los Meses');
            return;
        }
        if (state?.monthlyRate <= 0 || state?.monthlyRate === '') {
            showAlert('Advertencia', 'Rellene el % por Mes');
            return;
        }
        handlePropChange('result', []);
        let array = [];
        for (let i = 0; i < state?.months; i++) {
            const lastValue = array?.[i - 1]?.total ?? 0;
            const value = i == 0 ? lastValue + parseFloat(state?.investment) : lastValue;
            const total = parseFloat(value) + (parseFloat(value) * parseFloat(state?.monthlyRate)) / 100;
            array?.push({
                total: isNaN(total?.toFixed(2)) ? 0 : parseFloat(total?.toFixed(2)),
                month: i + 1,
                previous: value
            });
        }
        handlePropChange('result', array);
    };

    const listViewItemSeparator = () => {
        return <View style={styles.lisView} />;
    };

    const listItemView = (item) => {
        return (
            <View style={styles.row2}>
                <View style={styles.column1}>
                    <Text style={styles.label2}>{item?.month}</Text>
                </View>
                <View style={styles.column2}>
                    <Text style={styles.label2}>${item?.previous}</Text>
                </View>
                <View style={styles.column2}>
                    <Text style={styles.label2}>${item?.total}</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={[colors.mainColor, colors.mainColor, colors.mainColor, colors.white, colors.white]}
                style={styles.background}
            >
                <TTMHeader text={'Calc. de Interés Compuesto'} />
                <View style={styles.row}>
                    <Text style={styles.label}>* Campos requeridos</Text>
                </View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.label}>* Inversión</Text>
                        <TextInput
                            style={styles.input}
                            value={state?.investment}
                            underlineColorAndroid={colors.underlineColorAndroid}
                            placeholder="Inversión"
                            placeholderTextColor={colors.white}
                            onChangeText={(value) => handlePropChange('investment', value)}
                            blurOnSubmit={false}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>* Meses</Text>
                        <TextInput
                            style={styles.input}
                            value={state?.months}
                            underlineColorAndroid={colors.underlineColorAndroid}
                            placeholder="Meses"
                            placeholderTextColor={colors.white}
                            onChangeText={(value) => handlePropChange('months', value)}
                            blurOnSubmit={false}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>* % por Mes</Text>
                        <TextInput
                            style={styles.input}
                            value={state?.monthlyRate}
                            underlineColorAndroid={colors.underlineColorAndroid}
                            placeholder="% por Mes"
                            placeholderTextColor={colors.white}
                            onChangeText={(value) => handlePropChange('monthlyRate', value)}
                            blurOnSubmit={false}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <TTMButtom title="Limpiar" style={styles.buttonClear} customClick={() => setState(initialState)} />
                    <TTMButtom title="Calcular" style={styles.buttonSearch} customClick={() => calculateInterest()} />
                </View>
                <TTMSplitter />
                <View style={styles.row2}>
                    <View style={styles.column1}>
                        <Text style={styles.label2}>Mes</Text>
                    </View>
                    <View style={styles.column2}>
                        <Text style={styles.label2}>$ Previo</Text>
                    </View>
                    <View style={styles.column2}>
                        <Text style={styles.label2}>$ Total</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={styles.row}>
                        <FlatList
                            data={state?.result}
                            ItemSeparatorComponent={listViewItemSeparator}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => listItemView(item)}
                            refreshing={state?.loading}
                            ListEmptyComponent={<Text style={styles.noRecords}>No hay resultados</Text>}
                        />
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default CompoundInterestScreen;

const styles = StyleSheet.create({
    background: {
        height: '100%',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0
    },
    buttonClear: {
        alignItems: 'center',
        backgroundColor: colors.red,
        borderRadius: 8,
        color: colors.white,
        marginLeft: 5,
        marginRight: 5,
        padding: 5,
        width: 150
    },
    buttonSearch: {
        alignItems: 'center',
        backgroundColor: colors.blue,
        borderRadius: 8,
        color: colors.white,
        marginLeft: 5,
        marginRight: 5,
        padding: 5,
        width: 150
    },
    column: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    column1: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '20%'
    },
    column2: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '40%'
    },
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-start'
    },
    input: {
        borderColor: colors.gray,
        borderRadius: 8,
        borderWidth: 1.5,
        color: colors.white,
        height: 30,
        marginRight: 5,
        padding: 3,
        width: 110
    },
    label: {
        color: colors.white,
        fontSize: 12,
        fontWeight: 'bold'
    },
    label2: {
        color: colors.black,
        fontSize: 16,
        fontWeight: 'bold'
    },
    lisView: {
        height: 0.2,
        width: '100%'
    },
    noRecords: {
        alignSelf: 'center',
        color: colors.white,
        fontSize: 17,
        fontWeight: 'bold'
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 10,
        marginTop: 10
    },
    row2: {
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 8,
        elevation: 11,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 8,
        marginLeft: 10,
        marginRight: 10,
        padding: 5,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68
    }
});
