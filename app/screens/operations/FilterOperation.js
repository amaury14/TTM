import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Icon } from 'react-native-elements';
import RadioGroup from 'react-native-radio-buttons-group';

import firebase from '../../../database/firebase';
import colors from '../../config/colors';
import { getRadioConfigColor } from '../../config/radioGroup';
import utils from '../../utils/util';
import TTMSplitter from '../components/TTMSplitter';
import OperationCard from './OperationCard';

const FilterOperation = (props) => {
    const navigation = useNavigation();
    const user = props?.route?.params?.user;

    const [state, setState] = useState({
        operations: [],
        opState: getRadioConfigColor(colors.white),
        searchString: '',
        loading: true
    });

    const handlePropChange = (name, value) => {
        setState({ ...state, [name]: value });
    };

    const getFieldByState = (opStateValue) => {
        return opStateValue === 1 ? 'startDate' : 'closeDate';
    };

    useEffect(() => {
        fetchOperations(state?.opState, state?.searchString);
    }, []);

    // Refreshing data on component focus
    useEffect(() => {
        const unsubscribe = navigation?.addListener('focus', () => {
            fetchOperations(state?.opState, state?.searchString);
        });
        return unsubscribe;
    }, [navigation]);

    const fetchOperations = async (opState, searchString) => {
        const opStateValue = opState?.find((item) => item?.selected)?.value;
        try {
            handlePropChange('loading', true);
            let operations = [];
            await firebase.fireDb
                .collection('operations')
                .where('opState', '==', opStateValue)
                .where('userId', '==', user?.id)
                .onSnapshot((querySnapshot) => {
                    querySnapshot?.docs?.forEach((doc) => {
                        const { ...data } = doc?.data();
                        operations?.push({ id: doc?.id, ...data });
                    });
                    if (!!searchString && searchString != '' && searchString?.length > 1) {
                        // Filter by searchString
                        operations = operations?.filter((element) =>
                            element?.pairCoin?.toLowerCase()?.includes(searchString?.toLowerCase())
                        );
                    }
                    handlePropChange(
                        'operations',
                        utils.sortArrayDescending(operations, getFieldByState(opStateValue))
                    );
                });
            handlePropChange('loading', false);
        } catch (error) {
            // Catch error
        }
    };

    const deleteOperation = async (id) => {
        handlePropChange('loading', true);
        const dbRef = firebase.fireDb.collection('operations').doc(id);
        await dbRef?.delete();
        fetchOperations(state?.opState, state?.searchString);
        handlePropChange('loading', false);
    };

    const openConfirmationAlert = (id) => {
        Alert.alert('Advertencia', 'Está seguro de eliminar esta operación?', [
            { text: 'Aceptar', onPress: () => deleteOperation(id) },
            { text: 'Cancelar' }
        ]);
    };

    const updateOnValueChange = async (field, value) => {
        await handlePropChange(field, value);
        fetchOperations(state?.opState, state?.searchString);
    };

    const listViewItemSeparator = () => {
        return <View style={styles.lisView} />;
    };

    const listItemView = (item) => {
        return (
            <TouchableOpacity onLongPress={() => navigation.navigate('DetailsOperation', { item, user })}>
                <OperationCard
                    item={item}
                    deleteClick={() => openConfirmationAlert(item?.id)}
                    updateClick={() =>
                        navigation.navigate('UpdateOperation', {
                            id: item?.id,
                            user
                        })
                    }
                />
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.label}>Estado de la operación:</Text>
                        <RadioGroup
                            radioButtons={state?.opState}
                            onPress={(value) => updateOnValueChange('opState', value)}
                            layout="row"
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <TextInput
                        style={styles.input}
                        value={state?.searchString}
                        underlineColorAndroid={colors.underlineColorAndroid}
                        placeholder="Escriba para buscar..."
                        placeholderTextColor={colors.white}
                        onChangeText={(value) => handlePropChange('searchString', value)}
                        blurOnSubmit={false}
                    />
                    <TouchableOpacity style={styles.buttonClear} onPress={() => handlePropChange('searchString', '')}>
                        <Icon name="x-square" type="feather" color={colors.black} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonSearch}
                        onPress={() => fetchOperations(state?.opState, state?.searchString)}
                    >
                        <Icon name="search" type="feather" color={colors.black} />
                    </TouchableOpacity>
                </View>
                <TTMSplitter />
                <ScrollView>
                    {!state?.loading && (
                        <View style={styles.loader}>
                            <ActivityIndicator size="large" color={colors.gray2} />
                        </View>
                    )}
                    {state?.loading && (
                        <View style={styles.row}>
                            <FlatList
                                data={state?.operations}
                                ItemSeparatorComponent={listViewItemSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => listItemView(item)}
                                refreshing={state?.loading}
                                ListEmptyComponent={<Text style={styles.noRecords}>No se encontraron registros</Text>}
                            />
                        </View>
                    )}
                </ScrollView>
        </SafeAreaView>
    );
};

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
        marginRight: 5,
        padding: 5,
        width: 38
    },
    buttonSearch: {
        alignItems: 'center',
        backgroundColor: colors.blue,
        borderRadius: 8,
        color: colors.white,
        marginRight: 5,
        padding: 5,
        width: 38
    },
    column: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-start'
    },
    input: {
        borderColor: colors.white,
        borderRadius: 8,
        borderWidth: 1.5,
        height: 40,
        marginRight: 5,
        padding: 3,
        width: 260
    },
    label: {
        color: colors.white,
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10
    },
    lisView: {
        height: 0.2,
        width: '100%'
    },
    loader: {
        marginTop: 20
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
        marginBottom: 10
    }
});

export default FilterOperation;
