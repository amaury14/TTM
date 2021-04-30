import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';

var db = SQLite.openDatabase('TDM.db');

const OperationCard = (props) => {
    const item = props.item;

    return (
        <View>
            {item && (
                <View
                key={item.op_id}
                style={{ backgroundColor: 'gray', padding: 20 }}>
                <Text>Pair/Coin: {item.pairCoin}</Text>
                <Text>Investment: {item.investment}</Text>
                <Text>SL: {item.stopLoss}</Text>
                <Text>SP: {item.startPoint}</Text>
                <Text>TP: {item.takeProfit}</Text>
                <Icon
                name='delete'
                type='material'
                color='red'
                onPress={props.customClick} />
            </View>)}
        </View>
    );
};

export default OperationCard;