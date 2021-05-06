import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import firebase from '../../../database/firebase';
import colors from '../../config/colors';

const ViewAllUser = () => {
    const [state, setState] = useState({
        users: [],
        loading: false
    });

    const handlePropChange = (name, value) => {
        setState({ ...state, [name]: value });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            handlePropChange('loading', true);
            let users = [];
            await firebase.fireDb.collection('users').onSnapshot(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    const { ...data } = doc.data();
                    users.push({ id: doc.id, ...data });
                });
                handlePropChange('users', users);
            });
            handlePropChange('loading', false);
        } catch(error) {
            // Catch error
        }
    };

    let listViewItemSeparator = () => {
        return (
            <View
                style={styles.listView}
            />
        );
    };

    let listItemView = (item) => {
        return (
            <View
                key={item.id}
                style={styles.listViewItem}>
                <Text>Id: {item.id}</Text>
                <Text>Nombre: {item.first_name}</Text>
                <Text>Apellidos: {item.last_name}</Text>
                <Text>Correo: {item.gmail}</Text>
                <Text>Locale: {item.locale}</Text>
                <Text>Picture URL: {item.profile_picture}</Text>
                <Text>Registrado: {item.created_at}</Text>
                <Text>Ultimo login: {item.last_logged_in}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.view1}>
                <View style={styles.view2}>
                    {state.loading && <View style={styles.loader}>
                        <ActivityIndicator size="large" color={colors.mainColor} />
                    </View>}
                    <FlatList
                        data={state.users}
                        ItemSeparatorComponent={listViewItemSeparator}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => listItemView(item)}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    listView: {
        backgroundColor: colors.gray2,
        height: 0.2,
        width: '100%'
    },
    listViewItem: {
        backgroundColor: colors.white,
        padding: 20
    },
    loader: {
        marginTop: 20
    },
    safeArea: {
        flex: 1
    },
    view1: {
        backgroundColor: colors.white,
        flex: 1,
    },
    view2: {
        flex: 1
    }
});

export default ViewAllUser;