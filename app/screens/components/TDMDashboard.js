import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import * as SQLite from 'expo-sqlite';

import colors from '../../config/colors';
import images from '../../assets/index';

var db = SQLite.openDatabase('TDM.db');

const TDMDashboard = (props) => {
    const navigation = useNavigation();

    let [data, setData] = useState([]);
    let [negatives, setNegatives] = useState(0);
    let [positives, setPositives] = useState(0);
    let [performancePercentReal, setPerformancePercentReal] = useState(0);
    let [performancePercent, setPerformancePercent] = useState(0);

    const getProfitPercent = (number) => {
        return isNaN(number.toFixed(2)) ? '-' : `${number.toFixed(2)}%`;
    }

    let updateData = () => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_ops WHERE state = 1', [], (tx, results) => {
                var temp = [];
                let pos = 0;
                let neg = 0;
                let totalPerformance = 0;
                if (results.rows.length > 0) {
                    for (let i = 0; i < results.rows.length; ++i) {
                        temp.push(results.rows.item(i));
                        if (results.rows.item(i).profitPercent !== '') {
                            totalPerformance += parseInt(results.rows.item(i).profitPercent);
                            if (parseInt(results.rows.item(i).profitPercent) > 0) {
                                pos++;
                            } else {
                                neg++;
                            }
                        }
                    }
                }
                setData(temp);
                setPositives(pos);
                setNegatives(neg);
                setPerformancePercentReal((totalPerformance/temp?.length));
                setPerformancePercent((totalPerformance/temp?.length)/100);
            });
          });
    };

    // Refreshing data on component focus
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
        updateData();
        });
        return unsubscribe;
    }, [navigation]);

    // Update data on enter to component
    useEffect(() => {
        updateData();
    }, []);

    return (
        <View>
            {data && (
                <View
                style={styles.card}>
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={styles.label}>Positivas</Text>
                            <Text style={styles.valueBig}>{positives}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.label}>Negativas</Text>
                            <Text style={styles.valueBig}>{negatives}</Text>
                        </View>
                        <View style={styles.columnLong}>
                            <Text style={styles.label}>Rango</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.columnLong}>
                            <Text style={styles.label}>% Performance Profit</Text>
                            <View style={styles.row2}>
                                <ProgressBar
                                borderRadius={12}
                                progress={performancePercent}
                                color={colors.mainColor}
                                height={18}
                                width={150} />
                                <Text style={styles.value}>{getProfitPercent(performancePercentReal)}</Text>
                            </View> 
                        </View>
                        <View style={styles.columnLong}>
                            <Text style={styles.label}>Negativas</Text>
                            <Text style={styles.value}>{negatives}</Text>
                        </View>
                    </View>           
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {        
        height: 140,
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
    column: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    columnLong: {
        flexDirection: 'column',
        width: 150,
    },
    pair: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 15.5,
    },
    label: {
        color: colors.mainColor,
        fontWeight: '900',
        fontSize: 14,
    },
    tinyLogo: {
        width: 28,
        height: 28,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    row2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    value: {
        color: colors.mainColor,
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 5,
    },
    valueBig: {
        color: colors.header1,
        fontWeight: 'bold',
        fontSize: 30,
    },
});


export default TDMDashboard;