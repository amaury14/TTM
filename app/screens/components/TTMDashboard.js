import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Linking, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

import firebase from '../../../database/firebase';
import images from '../../assets';
import colors from '../../config/colors';
import TTMButtom from './TTMButtom';

const TTMDashboard = (props) => {
    const navigation = useNavigation();
    const user = props?.user;

    const [state, setState] = useState({
        operations: [],
        negatives: 0,
        positives: 0,
        total: 0,
        performancePercentReal: 0,
        performancePercent: 0,
        loading: true,
        modalVisible: false,
        modalView: 'about',
        open: [],
        investment: 0
    });

    // Refreshing data on component focus
    useEffect(() => {
        const unsubscribe = navigation?.addListener('focus', () => {
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
        return isNaN(number?.toFixed(2)) ? '-' : `${number?.toFixed(2)}%`;
    };

    const getInvestment = (number) => {
        return isNaN(number?.toFixed(2)) ? '-' : `$${number?.toFixed(2)}`;
    };

    const getRankByPerformance = (type, number) => {
        if (isNaN(number) || number <= 0) {
            return type === 'label' ? 'Perdedor' : images.ranks.loser;
        } else {
            if (number > 0 && number <= 10) {
                return type === 'label' ? 'Estudiante' : images.ranks.prey;
            }
            if (number > 10 && number <= 20) {
                return type === 'label' ? 'Junior' : images.ranks.junior;
            }
            if (number > 20 && number <= 30) {
                return type === 'label' ? 'Semi Senior' : images.ranks.semisenior;
            }
            if (number > 30 && number <= 40) {
                return type === 'label' ? 'Senior' : images.ranks.senior;
            }
            if (number > 40 && number <= 50) {
                return type === 'label' ? 'Avanzado' : images.ranks.advanced;
            }
            if (number > 50 && number <= 70) {
                return type === 'label' ? 'Profesional' : images.ranks.professional;
            }
            if (number > 70) {
                return type === 'label' ? 'Maestro' : images.ranks.master;
            }
        }
    };

    const getRankDescriptionByPerformance = (number) => {
        if (isNaN(number) || number <= 0) {
            return 'Comprende rendimiento menor que 0% o inexistente, en la operativa.';
        } else {
            if (number > 0 && number <= 10) {
                return 'Comprende rendimiento entre 0% y 10%, en la operativa.';
            }
            if (number > 10 && number <= 20) {
                return 'Comprende rendimiento entre 10% y 20%, en la operativa.';
            }
            if (number > 20 && number <= 30) {
                return 'Comprende rendimiento entre 20% y 30%, en la operativa.';
            }
            if (number > 30 && number <= 40) {
                return 'Comprende rendimiento entre 30% y 40%, en la operativa.';
            }
            if (number > 40 && number <= 50) {
                return 'Comprende rendimiento entre 40% y 50%, en la operativa.';
            }
            if (number > 50 && number <= 70) {
                return 'Comprende rendimiento entre 50% y 70%, en la operativa.';
            }
            if (number > 70) {
                return 'Comprende rendimiento mayor a 70%, en la operativa.';
            }
        }
    };

    const fetchOperations = async () => {
        try {
            handlePropChange('loading', true);
            await firebase.fireDb
                .collection('operations')
                .where('userId', '==', user?.id)
                .onSnapshot((querySnapshot) => {
                    let operations = [];
                    let positives = 0;
                    let negatives = 0;
                    let totalPerformance = 0;
                    let investment = 0;
                    let open = [];
                    let total = querySnapshot?.docs?.length;
                    querySnapshot?.docs?.forEach((doc) => {
                        const { ...data } = doc?.data();
                        if (data?.opState === '2') {
                            operations?.push({ id: doc?.id, ...data });
                            if (data?.profitPercent !== '') {
                                totalPerformance += parseInt(data?.profitPercent);
                                if (parseInt(data?.profitPercent) > 0) {
                                    positives++;
                                } else {
                                    negatives++;
                                }
                            }
                        } else if (data?.opState === '1') {
                            open?.push({ id: doc?.id, ...data });
                            investment = investment + parseFloat(data?.investment);
                        }
                    });
                    setState({
                        ...state,
                        operations,
                        positives,
                        negatives,
                        total,
                        performancePercentReal: totalPerformance / operations?.length,
                        performancePercent: totalPerformance / operations?.length / 100,
                        open,
                        investment
                    });
                });
            handlePropChange('loading', false);
        } catch (error) {
            // Catch error
        }
    };

    const signOut = () => {
        firebase.firebase.auth().signOut();
    };

    const getModalView = () => {
        switch (state?.modalView) {
        case 'about': {
            return (
                <View>
                    <Text style={styles.modalText}>TTM - To The Moon</Text>
                    <Text style={styles.modalText}>Diario de Trading</Text>
                    <Text style={styles.modalText}>Desarrollador: Amaury Chong Rodríguez</Text>
                    <Text style={styles.modalText}>Contacto:</Text>
                    <TouchableOpacity onPress={() => Linking.openURL('mailto:amaurychong@gmail.com')}>
                        <Text style={styles.emailLink}>amaurychong@gmail.com</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        case 'rank': {
            return (
                <View>
                    <Text style={styles.modalText}>
                            Rango: {getRankByPerformance('label', state?.performancePercentReal)}
                    </Text>
                    <Text style={styles.modalText}>
                            % Rendimiento: {getProfitPercent(state?.performancePercentReal)}
                    </Text>
                    <Text style={styles.modalText}>
                            Descripción: {getRankDescriptionByPerformance(state?.performancePercentReal)}
                    </Text>
                </View>
            );
        }
        }
    };

    const openModal = (modalView, modalVisible) => {
        setState({
            ...state,
            modalView,
            modalVisible
        });
    };

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={state?.modalVisible}
                onRequestClose={() => handlePropChange('modalVisible', !state?.modalVisible)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {getModalView()}
                        <View style={styles.buttonModal}>
                            <TTMButtom
                                title="Cerrar"
                                customClick={() => handlePropChange('modalVisible', !state?.modalVisible)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={styles.card}>
                {!state?.loading && (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color={colors.gray2} />
                    </View>
                )}
                {state?.loading && state?.operations && (
                    <View>
                        <View style={styles.corner}>
                            <TouchableOpacity style={styles.button} onPress={() => signOut()}>
                                <Icon name="power" type="feather" size={30} color={colors.red} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => openModal('about', true)}>
                                <Icon name="info" type="feather" size={30} color={colors.blue} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.columnRank}>
                            <Text style={styles.label}>Rango</Text>
                            <Text style={styles.value}>
                                {getRankByPerformance('label', state?.performancePercentReal)}
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.logoContainer} onPress={() => openModal('rank', true)}>
                            <Image
                                style={styles.logo}
                                source={getRankByPerformance('icon', state?.performancePercentReal)}
                            />
                        </TouchableOpacity>
                        <View style={styles.row2}>
                            <Text style={styles.label}>Operaciones Cerradas</Text>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text style={styles.label}>Total</Text>
                                <Text style={styles.valueBigWhite}>{state?.total}</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.label}>Pos(+)</Text>
                                <Text style={styles.valueBigGreen}>{state?.positives}</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.label}>Neg(-)</Text>
                                <Text style={styles.valueBigRed}>{state?.negatives}</Text>
                            </View>
                        </View>
                        <View style={styles.row3}>
                            <View style={styles.column2}>
                                <Text style={styles.label}>% Rend</Text>
                                <View style={styles.row2}>
                                    <Text style={styles.value}>{getProfitPercent(state?.performancePercentReal)}</Text>
                                </View>
                            </View>
                            <View style={styles.column2}>
                                <Text style={styles.label}>$ Inversión</Text>
                                <View style={styles.row2}>
                                    <Text style={styles.value}>{getInvestment(state?.investment)}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            </View>
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
        marginTop: 8,
        padding: 3,
        width: 38
    },
    buttonModal: {
        bottom: 10,
        position: 'absolute',
        right: 0
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: 8,
        elevation: 11,
        height: 160,
        marginBottom: 8,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 8,
        padding: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        width: 380
    },
    centeredView: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        marginTop: 22
    },
    column: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    column2: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: 85
    },
    columnRank: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        position: 'absolute',
        right: 50,
        top: 0,
        width: 110
    },
    corner: {
        position: 'absolute',
        right: -5,
        top: -10
    },
    emailLink: {
        color: colors.blue,
        fontSize: 20,
        fontStyle: 'italic',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
    label: {
        color: colors.mainColor,
        fontSize: 15,
        fontWeight: '900'
    },
    loader: {
        marginTop: 20
    },
    logo: {
        height: 100,
        width: 100
    },
    logoContainer: {
        height: 100,
        position: 'absolute',
        right: 92,
        top: 45,
        width: 100
    },
    modalText: {
        fontSize: 20,
        marginBottom: 15,
        textAlign: 'center'
    },
    modalView: {
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 20,
        elevation: 5,
        height: 280,
        margin: 20,
        padding: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        width: 300
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginRight: 210
    },
    row2: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    row3: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    value: {
        color: colors.mainColor,
        fontSize: 18,
        fontWeight: 'bold'
    },
    valueBigGreen: {
        color: colors.secondary,
        fontSize: 30,
        fontWeight: 'bold'
    },
    valueBigRed: {
        color: colors.red,
        fontSize: 30,
        fontWeight: 'bold'
    },
    valueBigWhite: {
        color: colors.mainColor,
        fontSize: 30,
        fontWeight: 'bold'
    }
});

export default TTMDashboard;
