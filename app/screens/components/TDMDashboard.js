import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import firebase from '../../../database/firebase';
import colors from '../../config/colors';

const TDMDashboard = (props) => {
    const navigation = useNavigation();

    const [state, setState] = useState({
        operations: [],
        negatives: 0,
        positives: 0,
        performancePercentReal: 0,
        performancePercent: 0,
        loading: true
    });

    // Refreshing data on component focus
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchOperations();
        });
        return unsubscribe;
    }, [navigation]);

    // Update data on enter to component
    useEffect(() => {
        fetchOperations();
    }, []);

    const handlePropChange = (name, value) => {
        setState({ ...state, [name]: value });
    };

    const getProfitPercent = (number) => {
        return isNaN(number.toFixed(2)) ? '-' : `${number.toFixed(2)}%`;
    };

    const fetchOperations = async () => {
        try {
          handlePropChange('loading', true);
          await firebase.fireDb.collection('operations').where("opState", "==", "2").onSnapshot(querySnapshot => {
            let operations = [];
            let positives = 0;
            let negatives = 0;
            let totalPerformance = 0;
            querySnapshot.docs.forEach(doc => {
              const { ...data } = doc.data();
              operations.push({ id: doc.id, ...data });
                if (data.profitPercent !== '') {
                    totalPerformance += parseInt(data.profitPercent);
                    if (parseInt(data.profitPercent) > 0) {
                        positives++;
                    } else {
                        negatives++;
                    }
                }
            })
            setState({
                ...state,
                operations,
                positives,
                negatives,
                performancePercentReal: (totalPerformance/operations?.length),
                performancePercent: (totalPerformance/operations?.length)/100
            });
          });
          handlePropChange('loading', false);
        } catch(error) {
          console.log(error)
        }
    };

    return (
        <View>
            {!state.loading &&
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.white} />
                </View>}
            {state.operations &&
                <View style={styles.card}>
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={styles.label}>Positivas</Text>
                            <Text style={styles.valueBig}>{state.positives}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.label}>Negativas</Text>
                            <Text style={styles.valueBig}>{state.negatives}</Text>
                        </View>
                        <View style={styles.columnLong}>
                            <Text style={styles.label}>Rango</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.columnLong}>
                            <Text style={styles.label}>% Performance Profit</Text>
                            <View style={styles.row2}>
                                {/* <ProgressBar
                                borderRadius={12}
                                progress={performancePercent}
                                color={colors.mainColor}
                                height={18}
                                width={150} /> */}
                                <Text style={styles.value}>{getProfitPercent(state.performancePercentReal)}</Text>
                            </View> 
                        </View>
                        <View style={styles.columnLong}>
                            <Text style={styles.label}>Negativas</Text>
                            <Text style={styles.value}>{state.negatives}</Text>
                        </View>
                    </View>           
                </View>
            }
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
    loader: {
        marginTop: 20
    }
});


export default TDMDashboard;