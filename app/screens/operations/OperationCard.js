import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';

import colors from '../../config/colors';

var db = SQLite.openDatabase('TDM.db');

const OperationCard = (props) => {
    const item = props.item;

    const getProfitPercent = (triggerPrice, takeProfit) => {
        const amount = parseInt(takeProfit) - parseInt(triggerPrice);
        return (amount * 100) - parseInt(triggerPrice); 
    }

    return (
        <View>
            {item && (
                <View
                key={item.op_id}
                style={styles.card}>
                    <View style={styles.column1}>
                        <Text style={styles.pair}>{item.pairCoin}</Text>
                        <Text style={styles.investment}>{item.investment} USDT</Text>        
                    </View>
                    <View style={styles.column2}>
                        <Text style={styles.label}>Rango de Precios:</Text>
                        <Text style={styles.value}>{item.stopLoss} - {item.takeProfit}</Text>
                    </View>
                    <View style={styles.column3}>
                        <Text style={styles.label}>Posible Profit %:</Text>
                        <Text style={styles.value}>{getProfitPercent(item.triggerPrice, item.takeProfit)}%</Text>
                    </View>
                    <View style={styles.column4}>
                        <Icon
                        name='edit'
                        type='material'
                        color='gray'
                        onPress={props.updateClick} />
                        <Icon
                        name='delete'
                        type='material'
                        color='gray'
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
        color: '#0061a8',
        fontWeight: 'bold',
        fontSize: 15,
    },
    label: {
        color: '#126e82',
        fontWeight: '900',
        fontSize: 14,
    },
    value: {
        color: '#132c33',
        fontWeight: 'bold',
        fontSize: 15,
    },
});


export default OperationCard;