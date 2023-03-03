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
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import firebase from '../../../database/firebase';
import colors from '../../config/colors';
import utils from '../../utils/util';
import TTMSplitter from '../components/TTMSplitter';
import NoteCard from './NoteCard';

const Notes = (props) => {
    const navigation = useNavigation();
    const user = props?.route?.params?.user;

    const [state, setState] = useState({
        notes: [],
        searchString: '',
        loading: true
    });

    const handlePropChange = (name, value) => {
        setState({ ...state, [name]: value });
    };

    useEffect(() => {
        fetchNotes(state?.searchString);
    }, []);

    // Refreshing data on component focus
    useEffect(() => {
        const unsubscribe = navigation?.addListener('focus', () => {
            fetchNotes(state?.searchString);
        });
        return unsubscribe;
    }, [navigation]);

    const fetchNotes = async (searchString) => {
        try {
            handlePropChange('loading', true);
            let notes = [];
            await firebase.fireDb
                .collection('notes')
                .where('userId', '==', user?.id)
                .onSnapshot((querySnapshot) => {
                    querySnapshot?.docs?.forEach((doc) => {
                        const { ...data } = doc?.data();
                        notes?.push({ id: doc?.id, ...data });
                    });
                    if (!!searchString && searchString != '' && searchString?.length > 1) {
                        // Filter by searchString
                        notes = notes?.filter((element) =>
                            element?.title?.toLowerCase()?.includes(searchString?.toLowerCase())
                        );
                    }
                    handlePropChange('notes', utils.sortArrayDescending(notes, 'date'));
                });
            handlePropChange('loading', false);
        } catch (error) {
            // Catch error
        }
    };

    const deleteNotes = async (id) => {
        handlePropChange('loading', true);
        const dbRef = firebase.fireDb.collection('notes').doc(id);
        await dbRef?.delete();
        fetchNotes(state?.searchString);
        handlePropChange('loading', false);
    };

    const openConfirmationAlert = (id) => {
        Alert.alert('Advertencia', 'Está seguro de eliminar esta nota?', [
            { text: 'Aceptar', onPress: () => deleteNotes(id) },
            { text: 'Cancelar' }
        ]);
    };

    const listViewItemSeparator = () => {
        return <View style={styles.lisView} />;
    };

    const listItemView = (item) => {
        return (
            <TouchableOpacity onLongPress={() => navigation.navigate('NoteDetails', { item, user })}>
                <NoteCard
                    item={item}
                    deleteClick={() => openConfirmationAlert(item?.id)}
                    updateClick={() =>
                        navigation.navigate('UpdateNote', {
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
                    <FontAwesomeIcon icon="x-square" color={colors.black} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSearch} onPress={() => fetchNotes(state?.searchString)}>
                    <FontAwesomeIcon icon="search" color={colors.black} />
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
                            data={state?.notes}
                            ItemSeparatorComponent={listViewItemSeparator}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => listItemView(item)}
                            refreshing={state?.loading}
                            ListEmptyComponent={<Text style={styles.noRecords}>No se encontraron notas</Text>}
                        />
                    </View>
                )}
            </ScrollView>
            <TouchableOpacity style={styles.buttonAdd} onPress={() => navigation.navigate('AddNote')}>
                <FontAwesomeIcon icon="plus" size={40} color={colors.black} />
            </TouchableOpacity>
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
    buttonAdd: {
        alignItems: 'center',
        backgroundColor: colors.red,
        borderRadius: 50,
        bottom: 30,
        elevation: 5,
        height: 55,
        justifyContent: 'center',
        position: 'absolute',
        right: 30,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0,
        shadowRadius: 5,
        width: 55,
        zIndex: 10
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
        marginBottom: 10,
        marginTop: 10
    }
});

export default Notes;
