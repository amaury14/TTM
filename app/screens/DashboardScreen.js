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
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
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
          <ViewAllOperation></ViewAllOperation>
        </View>
      </View>
    </SafeAreaView>
  );

//   return (
//     <SafeAreaView style={styles.container}>
//         <ImageBackground
//             style={styles.background}
//             source={require("../assets/background.png")}
//         >
//             <View style={styles.logoContainer}>
//                 <Image style={styles.logo} source={require('../assets/icon2.png')} />
//                 <Text style={styles.logoText}>To The Moon</Text>
//             </View>
//             <View style={styles.loginButton}></View>
//             <View style={styles.registerButton}></View>
//         </ImageBackground>
//     </SafeAreaView>
//   );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    loginButton: {
        width: "100%",
        height: 70,
        backgroundColor: colors.props,
    },    
    logo: {
        width: 100,
        height: 100,
    },
    logoContainer: {
        position: "absolute",
        top: 70,
        alignItems: "center",
    },
    logoText: {
        color: "white",
        fontSize: 20,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    registerButton: {
        width: "100%",
        height: 70,
        backgroundColor: colors.secondary,
    }
});

export default DashboardScreen;
