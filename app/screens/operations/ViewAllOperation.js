import React, { useState, useEffect } from 'react';
import { Alert, FlatList, Text, View, SafeAreaView, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';
import OperationCard from './OperationCard';

var db = SQLite.openDatabase('TDM.db');

const ViewAllOperation = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  let getOperations = () => {
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

  getOperations();

  let deleteOperation = (op_id) => {
    console.log('entro');
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM table_ops where op_id=?',
        [op_id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Operation deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => getOperations()
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Please insert a valid Operation Id');
          }
        },
      );
    });
  };

  let listViewItemSeparator = () => {
    return (
      <View
        style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }}
      />
    );
  };

  let listItemView = (item) => {
    return (
      <OperationCard item={item} customClick={() => deleteOperation(item.op_id)} />
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
  }
});

export default ViewAllOperation;