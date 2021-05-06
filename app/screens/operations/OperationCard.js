import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

import images from '../../assets';
import colors from '../../config/colors';

const OperationCard = (props) => {
    const item = props.item;

    const getProfitPercent = (triggerPrice, takeProfit) => {
        const amount = parseFloat(takeProfit) - parseFloat(triggerPrice);
        const res = (amount * 100) / parseFloat(triggerPrice);
        return isNaN(res.toFixed(2)) ? '-' : `${res.toFixed(2)}%`;
    }

    const getIcon = (pair) => {
        const pieces = pair.toString().toLowerCase().split('/');
        if (pieces.length === 1) {
            const image1 = images.logos[pieces[0]];
            return (
                <View style={styles.row}>
                    {!!image1 &&
                    <Image
                        style={styles.tinyLogo}
                        source={images.logos[pieces[0]]}
                    />}
                    {!image1 &&
                    <Text style={styles.pair}>{pieces[0].toUpperCase()}</Text>}
                </View>
            );
        } else if (pieces.length === 2) {
            const image1 = images.logos[pieces[0]];
            const image2 = images.logos[pieces[1]];
            return (
                <View style={styles.row}>
                    {!!image1 &&
                    <Image
                        style={styles.tinyLogo}
                        source={images.logos[pieces[0]]}
                    />}
                    {!image1 &&
                    <Text style={styles.pair}>{pieces[0].toUpperCase()}</Text>}

                    <Text style={styles.coinSplitter}>/</Text>

                    {!!image2 &&
                    <Image
                        style={styles.tinyLogo}
                        source={images.logos[pieces[1]]}
                    />}
                    {!image2 &&
                    <Text style={styles.pair}>{pieces[1].toUpperCase()}</Text>}
                </View>
            );
        }
    };

    return (
        <View>
            {item && (
                <View
                    key={item.op_id}
                    style={styles.card}>
                    <View style={styles.column1}>
                        {getIcon(item.pairCoin)}
                        <Text style={styles.investment}>{item.investment} USDT</Text>
                    </View>
                    <View style={styles.column2}>
                        <Text style={styles.label}>Rango de Precios</Text>
                        <Text style={styles.value}>{item.lowerLimit} - {item.upperLimit}</Text>
                    </View>
                    <View style={styles.column3}>
                        <Text style={styles.label}>% Posible Profit</Text>
                        <Text style={styles.value}>{getProfitPercent(item.triggerPrice, item.takeProfit)}</Text>
                    </View>
                    <View style={styles.column4}>
                        <Icon
                            name='edit'
                            type='feather'
                            color={colors.mainColor}
                            onPress={props.updateClick} />
                        <Icon
                            name='trash-2'
                            type='feather'
                            color={colors.red}
                            onPress={props.deleteClick} />
                    </View>
                </View>)}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        flex: 1,
        width: 380,
        backgroundColor: colors.white,
        padding: 10,
        marginTop: 8,
        marginBottom: 8,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 8,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    },
    coinSplitter: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    column1: {
        flexDirection: 'column',
        width: 90,
    },
    column2: {
        flexDirection: 'column',
        marginTop: 1,
        width: 120,
    },
    column3: {
        flexDirection: 'column',
        marginTop: 1,
        width: 125,
    },
    column4: {
        flexDirection: 'column',
        width: 25,
    },
    investment: {
        color: colors.investment,
        fontSize: 15,
        fontWeight: 'bold',
    },
    label: {
        color: colors.mainColor,
        fontSize: 14,
        fontWeight: '900',
    },
    pair: {
        color: colors.black,
        fontSize: 15.5,
        fontWeight: 'bold',
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    tinyLogo: {
        height: 28,
        width: 28,
    },
    value: {
        color: colors.value,
        fontSize: 15,
        fontWeight: 'bold',
    },
});


export default OperationCard;