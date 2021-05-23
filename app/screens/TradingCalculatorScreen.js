import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

import colors from '../config/colors';
import TTMSplitter from './components/TTMSplitter';
import TTMButtom from './components/TTMButtom';
import TTMHeader from './components/TTMHeader';

const TradingCalculatorScreen = () => {
    const initialState = {
        entryPrice: 0,
        stopLoss: 0,
        custom: 0,
        result: {
            oneOne: 0,
            oneTwo: 0,
            oneThree: 0,
            oneFour: 0,
            oneFive: 0,
            oneSix: 0,
            percent30: 0,
            percent40: 0,
            percent50: 0,
            percent60: 0,
            percent70: 0,
            percent80: 0,
            percent90: 0,
            percent100: 0,
            percentCustom: 0
        }
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

    const calculateTrading = () => {
        if (state?.entryPrice <= 0 || state?.entryPrice === '') {
            showAlert('Advertencia', 'Rellene el Precio de Entrada');
            return;
        }
        if (state?.stopLoss <= 0 || state?.stopLoss === '') {
            showAlert('Advertencia', 'Rellene el Stop Loss');
            return;
        }
        handlePropChange('result', initialState?.result);
        let res = initialState?.result;
        const entry = parseFloat(state?.entryPrice) ?? 0;
        const stop = parseFloat(state?.stopLoss) ?? 0;
        const custom = parseFloat(state?.custom) ?? 0;
        res = {
            ...res,
            oneOne: parseFloat(((entry - stop) + entry)?.toFixed(2)),
            oneTwo: parseFloat((((entry - stop) * 2) + entry)?.toFixed(2)),
            oneThree: parseFloat((((entry - stop) * 3) + entry)?.toFixed(2)),
            oneFour: parseFloat((((entry - stop) * 4) + entry)?.toFixed(2)),
            oneFive: parseFloat((((entry - stop) * 5) + entry)?.toFixed(2)),
            oneSix: parseFloat((((entry - stop) * 6) + entry)?.toFixed(2)),
            percent30: parseFloat((entry + (entry * 0.3))?.toFixed(2)),
            percent40: parseFloat((entry + (entry * 0.4))?.toFixed(2)),
            percent50: parseFloat((entry + (entry * 0.5))?.toFixed(2)),
            percent60: parseFloat((entry + (entry * 0.6))?.toFixed(2)),
            percent70: parseFloat((entry + (entry * 0.7))?.toFixed(2)),
            percent80: parseFloat((entry + (entry * 0.8))?.toFixed(2)),
            percent90: parseFloat((entry + (entry * 0.9))?.toFixed(2)),
            percent100: parseFloat((entry * 2)?.toFixed(2)),
            percentCustom: (custom === 0 || custom === '') ? 0 : parseFloat((entry + (entry * (custom / 100)))?.toFixed(2)),
        };
        handlePropChange('result', res);
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={[colors.mainColor, colors.mainColor, colors.mainColor, colors.white, colors.white]}
                style={styles.background}
            >
                <TTMHeader text={'Calculadora de Trading'} />
                <View style={styles.row}>
                    <Text style={styles.label}>* Campos requeridos</Text>
                </View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.label}>* Precio de Entrada</Text>
                        <TextInput
                            style={styles.input}
                            value={state?.entryPrice}
                            underlineColorAndroid={colors.underlineColorAndroid}
                            placeholder="Entrada"
                            placeholderTextColor={colors.white}
                            onChangeText={(value) => handlePropChange('entryPrice', value)}
                            blurOnSubmit={false}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>* Stop Loss</Text>
                        <TextInput
                            style={styles.input}
                            value={state?.stopLoss}
                            underlineColorAndroid={colors.underlineColorAndroid}
                            placeholder="Stop Loss"
                            placeholderTextColor={colors.white}
                            onChangeText={(value) => handlePropChange('stopLoss', value)}
                            blurOnSubmit={false}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>% Personalizado</Text>
                        <TextInput
                            style={styles.input}
                            value={state?.custom}
                            underlineColorAndroid={colors.underlineColorAndroid}
                            placeholder="Personalizado"
                            placeholderTextColor={colors.white}
                            onChangeText={(value) => handlePropChange('custom', value)}
                            blurOnSubmit={false}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <TTMButtom title="Limpiar" style={styles.buttonClear} customClick={() => setState(initialState)} />
                    <TTMButtom title="Calcular" style={styles.buttonSearch} customClick={() => calculateTrading()} />
                </View>
                <TTMSplitter />
                <ScrollView>
                    <View style={styles.row2}>
                        <Text style={styles.label2}>Take Profits por % de Profit Deseado</Text>
                    </View>
                    <View style={styles.row2}>
                        <View style={styles.column}>
                            <Text style={styles.label2}>1-1</Text>
                            <Text style={styles.label3}>$ {state?.result?.oneOne}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.label2}>1-2</Text>
                            <Text style={styles.label3}>$ {state?.result?.oneTwo}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.label2}>1-3</Text>
                            <Text style={styles.label3}>$ {state?.result?.oneThree}</Text>
                        </View>
                    </View>
                    <View style={styles.row2}>
                        <View style={styles.column}>
                            <Text style={styles.label2}>1-4</Text>
                            <Text style={styles.label3}>$ {state?.result?.oneFour}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.label2}>1-5</Text>
                            <Text style={styles.label3}>$ {state?.result?.oneFive}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.label2}>1-6</Text>
                            <Text style={styles.label3}>$ {state?.result?.oneSix}</Text>
                        </View>
                    </View>
                    <View style={styles.row2}>
                        <View style={styles.column}>
                            <Text style={styles.label2}>30%</Text>
                            <Text style={styles.label3}>$ {state?.result?.percent30}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.label2}>40%</Text>
                            <Text style={styles.label3}>$ {state?.result?.percent40}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.label2}>50%</Text>
                            <Text style={styles.label3}>$ {state?.result?.percent50}</Text>
                        </View>
                    </View>
                    <View style={styles.row2}>
                        <View style={styles.column}>
                            <Text style={styles.label2}>60%</Text>
                            <Text style={styles.label3}>$ {state?.result?.percent60}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.label2}>70%</Text>
                            <Text style={styles.label3}>$ {state?.result?.percent70}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.label2}>80%</Text>
                            <Text style={styles.label3}>$ {state?.result?.percent80}</Text>
                        </View>
                    </View>
                    <View style={styles.row2}>
                        <View style={styles.column}>
                            <Text style={styles.label2}>90%</Text>
                            <Text style={styles.label3}>$ {state?.result?.percent90}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.label2}>100%</Text>
                            <Text style={styles.label3}>$ {state?.result?.percent100}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.label2}>% Pers.</Text>
                            <Text style={styles.label3}>$ {state?.result?.percentCustom}</Text>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default TradingCalculatorScreen;

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
        justifyContent: 'space-between',
        width: '30%'
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
        color: colors.blue,
        fontSize: 18,
        fontWeight: 'bold'
    },
    label3: {
        color: colors.black,
        fontSize: 18,
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
