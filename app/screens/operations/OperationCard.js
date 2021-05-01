import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

import colors from '../../config/colors';
import images from '../../assets/index';

const OperationCard = (props) => {
    const item = props.item;

    const getProfitPercent = (triggerPrice, takeProfit) => {
        const amount = parseInt(takeProfit) - parseInt(triggerPrice);
        const res = (amount * 100) / parseInt(triggerPrice);
        return res.toFixed(2);
    }

    let getIcon = (pair) => {
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
                        {/* <Text style={styles.pair}>{item.pairCoin}</Text> */}
                        {getIcon(item.pairCoin)}
                        <Text style={styles.investment}>{item.investment} USDT</Text>        
                    </View>
                    <View style={styles.column2}>
                        <Text style={styles.label}>Rango de Precios</Text>
                        <Text style={styles.value}>{item.lowPoint} - {item.highPoint}</Text>
                    </View>
                    <View style={styles.column3}>
                        <Text style={styles.label}>% Posible Profit</Text>
                        <Text style={styles.value}>{getProfitPercent(item.triggerPrice, item.takeProfit)}%</Text>
                    </View>
                    <View style={styles.column4}>
                        <Icon
                        name='edit'
                        type='feather'
                        color={colors.placeholderBlue}
                        onPress={props.updateClick} />
                        <Icon
                        name='trash-2'
                        type='feather'
                        color={colors.placeholderBlue}
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
        fontWeight: 'bold',
        fontSize: 23
    },
    column1: {
        flexDirection: 'column',
        width: 90,
    },
    column2: {
        flexDirection: 'column',
        width: 120,
        marginTop: 1,
    },
    column3: {
        flexDirection: 'column',
        width: 125,
        marginTop: 1,
    },
    column4: {
        flexDirection: 'column',
        width: 25,
    },
    pair: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 15.5,
    },
    investment: {
        color: colors.investment,
        fontWeight: 'bold',
        fontSize: 15,
    },
    label: {
        color: colors.placeholderBlue,
        fontWeight: '900',
        fontSize: 14,
    },
    tinyLogo: {
        width: 23,
        height: 23,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    value: {
        color: colors.value,
        fontWeight: 'bold',
        fontSize: 15,
    },
});


export default OperationCard;