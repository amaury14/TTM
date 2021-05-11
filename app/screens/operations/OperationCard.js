import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

import images from '../../assets';
import colors from '../../config/colors';

const OperationCard = (props) => {
    const item = props?.item;

    const getProfitPercent = () => {
        const amount = parseFloat(item?.takeProfit ?? item?.upperLimit) - parseFloat(item?.triggerPrice);
        const res = (amount * 100) / parseFloat(item?.triggerPrice);
        return isNaN(res?.toFixed(2)) ? '-' : `${res?.toFixed(2)}%`;
    };

    const getDates = () => {
        const start = item?.startDate ? new Date(item?.startDate)?.toLocaleDateString() : '...';
        const end = item?.closeDate ? new Date(item?.closeDate)?.toLocaleDateString() : '...';
        return `${start} - ${end}`;
    };

    const getPriceRange = () => {
        if (item?.lowerLimit && item?.upperLimit) {
            return (
                <View>
                    <Text style={styles.value}>LL: {item?.lowerLimit}</Text>
                    <Text style={styles.value}>UL: {item?.upperLimit}</Text>
                </View>
            );
        } else if (item?.triggerPrice && item?.takeProfit) {
            return (
                <View>
                    <Text style={styles.value}>SP: {item?.triggerPrice}</Text>
                    <Text style={styles.value}>TP: {item?.takeProfit}</Text>
                </View>
            );
        }
        return (
            <View>
                <Text style={styles.value}>-</Text>
            </View>
        );
    };

    const getIcon = (pair) => {
        const pieces = pair?.toString()?.toLowerCase()?.split('/');
        if (pieces?.length === 1) {
            const image1 = images.logos[pieces?.[0]];
            return (
                <View style={styles.row}>
                    {!!image1 && <Image style={styles.tinyLogo} source={images.logos[pieces?.[0]]} />}
                    {!image1 && <Text style={styles.pair}>{pieces?.[0]?.toUpperCase()}</Text>}
                </View>
            );
        } else if (pieces.length === 2) {
            const image1 = images.logos[pieces?.[0]];
            const image2 = images.logos[pieces?.[1]];
            return (
                <View style={styles.row}>
                    {!!image1 && <Image style={styles.tinyLogo} source={images.logos[pieces?.[0]]} />}
                    {!image1 && <Text style={styles.pair}>{pieces?.[0]?.toUpperCase()}</Text>}

                    <Text style={styles.coinSplitter}>/</Text>

                    {!!image2 && <Image style={styles.tinyLogo} source={images.logos[pieces?.[1]]} />}
                    {!image2 && <Text style={styles.pair}>{pieces?.[1]?.toUpperCase()}</Text>}
                </View>
            );
        }
    };

    return (
        <View>
            {item && (
                <View key={item?.op_id} style={styles.card}>
                    <View style={styles.column1}>
                        {getIcon(item?.pairCoin)}
                        <Text style={styles.investment}>{item?.investment} USDT</Text>
                    </View>
                    <View style={styles.column2}>
                        <Text style={styles.label}>Rango de Precios</Text>
                        {getPriceRange()}
                    </View>
                    <View style={styles.column3}>
                        <Text style={styles.label}>% Posible Profit</Text>
                        <Text style={styles.value}>{getProfitPercent()}</Text>
                    </View>
                    <View style={styles.column4}>
                        <TouchableOpacity style={styles.button} onPress={props?.updateClick}>
                            <Icon name="edit" type="feather" color={colors.mainColor} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={props?.deleteClick}>
                            <Icon name="trash-2" type="feather" color={colors.red} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dates}>
                        <Text style={styles.investment}>{getDates()}</Text>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: colors.gray,
        borderRadius: 8,
        color: colors.white,
        marginRight: 2,
        padding: 3,
        width: 30
    },
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
            height: 5
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        minHeight: 88
    },
    coinSplitter: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    column1: {
        flexDirection: 'column',
        marginRight: 3,
        width: 90
    },
    column2: {
        flexDirection: 'column',
        marginRight: 2,
        marginTop: 1,
        width: 120
    },
    column3: {
        flexDirection: 'column',
        marginTop: 1,
        width: 125
    },
    column4: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: 25
    },
    dates: {
        left: 12,
        position: 'absolute',
        top: 67
    },
    investment: {
        color: colors.investment,
        fontSize: 15,
        fontWeight: 'bold'
    },
    label: {
        color: colors.mainColor,
        fontSize: 14,
        fontWeight: '900'
    },
    pair: {
        color: colors.black,
        fontSize: 15.5,
        fontWeight: 'bold'
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    tinyLogo: {
        height: 28,
        width: 28
    },
    value: {
        color: colors.value,
        fontSize: 15,
        fontWeight: 'bold'
    }
});

export default OperationCard;
