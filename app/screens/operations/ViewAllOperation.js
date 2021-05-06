import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import firebase from '../../../database/firebase';
import colors from '../../config/colors';
import OperationCard from './OperationCard';

const ViewAllOperation = (props) => {
    const navigation = useNavigation();
    const user = props.user;

    const [state, setState] = useState({
        operations: [],
        loading: true
    });

    const handlePropChange = (name, value) => {
        setState({ ...state, [name]: value });
    };

    useEffect(() => {
        fetchOperations();
    }, []);

    // Refreshing data on component focus
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchOperations();
        });
        return unsubscribe;
    }, [navigation]);

    const fetchOperations = async () => {
        try {
            handlePropChange('loading', true);
            let operations = [];
            await firebase.fireDb.collection('operations')
                .where("opState", "==", "1")
                .where("userId", "==", user.id)
                .onSnapshot(querySnapshot => {
                    querySnapshot.docs.forEach(doc => {
                        const { ...data } = doc.data();
                        operations.push({ id: doc.id, ...data });
                    });
                    handlePropChange('operations', operations);
                });
            handlePropChange('loading', false);
        } catch(error) {
            // Catch error
        }
    };

    const deleteOperation = async (id) => {
        handlePropChange('loading', true);
        const dbRef = firebase.fireDb.collection('operations').doc(id);
        await dbRef.delete();
        fetchOperations();
        handlePropChange('loading', false);
        props.navigation.navigate('DashboardScreen');
    };

    const openConfirmationAlert = (id) => {
        Alert.alert('Advertencia', 'Está seguro de eliminar esta operación?',
            [
                { text: 'Aceptar', onPress: () => deleteOperation(id) },
                { text: 'Cancelar' }
            ]
        );
    };

    const listViewItemSeparator = () => {
        return (
            <View
                style={styles.lisView}
            />
        );
    };

    const listItemView = (item) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('DetailsOperation', { item, user })}>
                <OperationCard
                    item={item}
                    deleteClick={() => openConfirmationAlert(item.id)}
                    updateClick={() => navigation.navigate('UpdateOperation', { id: item.id, user })}
                />
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {!state.loading &&
        <View style={styles.loader}>
            <ActivityIndicator size="large" color={colors.white} />
        </View>}
            {state.loading &&
        <View>
            <FlatList
                data={state.operations}
                ItemSeparatorComponent={listViewItemSeparator}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => listItemView(item)}
                refreshing={state.loading}
                ListEmptyComponent={<Text style={styles.noRecords}>No se encontraron registros</Text>}
            />
        </View>}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-start',
    },
    lisView: {
        height: 0.2,
        width: '100%'
    },
    loader: {
        marginTop: 20
    },
    noRecords: {
        color: colors.white,
        fontSize: 17,
        fontWeight: 'bold'
    }
});

export default ViewAllOperation;