import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import firebase from '../../../database/firebase';
import colors from '../../config/colors';
import OperationCard from './OperationCard';

const ViewAllOperation = () => {
  const navigation = useNavigation();

  const [state, setState] = useState({
    operations: [],
    loading: true
  });

  const handlePropChange = (name, value) => {
    setState({ ...state, [name]: value });
  }

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
      await firebase.fireDb.collection('operations').onSnapshot(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          const { ...data } = doc.data();
          operations.push({ id: doc.id, ...data });
        })
        handlePropChange('operations', operations);
      });
      handlePropChange('loading', false);
    } catch(error) {
      console.log(error)
    }
  }

  const deleteOperation = async (id) => {
    handlePropChange('loading', true);
    const dbRef = firebase.fireDb.collection('operations').doc(id)
    await dbRef.delete();
    fetchOperations();
    handlePropChange('loading', false);
    props.navigation.navigate('DashboardScreen');
  }

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
        style={{ height: 0.2, width: '100%' }}
      />
    );
  };

  const listItemView = (item) => {
    return (
      <OperationCard
        item={item}
        deleteClick={() => openConfirmationAlert(item.id)}
        updateClick={() => navigation.navigate('UpdateOperation', { id: item.id })}
      />
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
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
  },
  noRecords: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.mainColor
  },
  loader: {
    marginTop: 20
  }
});

export default ViewAllOperation;