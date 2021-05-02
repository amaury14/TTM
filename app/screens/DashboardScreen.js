import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Mybutton from './components/Mybutton';
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
            if (res.rows.length === 0) {
              txn.executeSql('DROP TABLE IF EXISTS table_ops', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS table_ops(op_id INTEGER PRIMARY KEY AUTOINCREMENT, pairCoin VARCHAR(20), investment VARCHAR(20), lowerLimit VARCHAR(20), upperLimit VARCHAR(20), grids VARCHAR(20), startDate NUMERIC, stopLoss VARCHAR(20), triggerPrice VARCHAR(20), takeProfit VARCHAR(20), profitPercent VARCHAR(20), notes VARCHAR(255), closeDate NUMERIC, state VARCHAR(1))',
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
      <View style={styles.body}>
          <LinearGradient
          colors={[colors.placeholderBlue, 'transparent', 'transparent']}
          style={styles.background}
          >
            <Mybutton
              title="Register User"
              customClick={() => navigation.navigate('Register')}
            />
            <Mybutton
              title="Update User"
              customClick={() => navigation.navigate('UpdateUser')}
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
          </LinearGradient>
      </View>
  );
};

const styles = StyleSheet.create({
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: '100%',
    },
    container: {
        flex: 1,
    },
    body: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white'
    },
    splitter: {
      margin: 10,
      backgroundColor: 'gray',
      width: '100%',
      height: 1,
    }
});

export default DashboardScreen;
