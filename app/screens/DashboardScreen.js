import React, {useEffect} from 'react';
import { Image, ImageBackground, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import ViewAllOperation from './operations/ViewAllOperation';
import * as SQLite from 'expo-sqlite';

import colors from '../config/colors';

var db = SQLite.openDatabase('TDM.db');

const DashboardScreen = ({navigation}) => {
  useEffect(() => {
    db.transaction(function (txn) {
        txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='table_ops'",
          [],
          function (tx, res) {
            console.log('item:', res.rows.length);
            if (res.rows.length === 0) {
              txn.executeSql('DROP TABLE IF EXISTS table_ops', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS table_ops(op_id INTEGER PRIMARY KEY AUTOINCREMENT, pairCoin VARCHAR(20), investment INT(10), lowPoint REAL, highPoint REAL, startPoint REAL, grids INT(10), startDate NUMERIC, stopLoss REAL, triggerPrice REAL, takeProfit REAL, profitPercent REAL, notes VARCHAR(255), psicotrading INT(10), closeDate NUMERIC)',
                [],
              );
            }
          },
        );
      });
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length === 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_mail VARCHAR(50), user_address VARCHAR(255))',
              [],
            );
            navigation.navigate('Register');
          }
        },
      );
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
          <Mybutton
            title="Register User"
            customClick={() => navigation.navigate('Register')}
          />
          <Mybutton
            title="View All Users"
            customClick={() => navigation.navigate('ViewAll')}
          />
          <Mybutton
            title="Register Operation"
            customClick={() => navigation.navigate('RegisterOperation')}
          />
          <View style={styles.splitter}></View>
          <ViewAllOperation></ViewAllOperation>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    splitter: {
      margin: 10,
      backgroundColor: 'gray',
      width: '100%',
      height: 1,
    }
});

export default DashboardScreen;
