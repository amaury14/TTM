import React, { useState, useEffect } from 'react';
import { Alert, FlatList, Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import OperationCard from './OperationCard';

import colors from '../../config/colors';

var db = SQLite.openDatabase('TDM.db');

const ViewAllOperation = () => {
  const navigation = useNavigation();
  let [flatListItems, setFlatListItems] = useState([]);
  let [loading, setLoading] = useState(false);

  let updateData = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM table_ops', [], (tx, results) => {
        var temp = [];
        if (results.rows.length > 0) {
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
        }
        setFlatListItems(temp);
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

  let deleteOperationAction = (op_id) => {
    setLoading(true);
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM table_ops where op_id=?',
        [op_id],
        (tx, results) => {
          console.log('delete operation', results.rowsAffected);
          updateData();
          setLoading(false)
        },
      );
    });
  };

  let deleteOperation = (op_id) => {
    Alert.alert(
      'Advertencia',
      'Desea realmente eliminar esta operación?',
      [
        {
          text: 'SI',
          onPress: () => deleteOperationAction(op_id),
        },
        {
          text: 'NO'
        },
      ],
      {cancelable: true},
    );
  };

  let listViewItemSeparator = () => {
    return (
      <View
        style={{ height: 0.2, width: '100%' }}
      />
    );
  };

  let listItemView = (item) => {
    return (
      <OperationCard
        item={item}
        deleteClick={() => deleteOperation(item.op_id)}
        updateClick={() => navigation.navigate('UpdateOperation', { op_id: item.op_id })}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
        <View>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
            refreshing={loading}
            ListEmptyComponent={<Text style={styles.noRecords}>No se encontraron registros</Text>}
          />
        </View>
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
    color: colors.placeholderBlue
  }
});

export default ViewAllOperation;