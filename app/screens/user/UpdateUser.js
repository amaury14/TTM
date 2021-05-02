import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  StyleSheet,
  TextInput
} from 'react-native';
import TDMButtom from '../components/TDMButtom';
import * as SQLite from 'expo-sqlite';

import colors from '../../config/colors';

var db = SQLite.openDatabase('TDM.db');

const UpdateUser = ({ route, navigation }) => {
  let { user_id } = route.params;

  let [userName, setUserName] = useState('');
  let [userMail, setUserMail] = useState('');
  let [userAddress, setUserAddress] = useState('');

  let showAlert = (title, text) => {
    Alert.alert(title, text,
      [{ text: 'Aceptar' }],
      {cancelable: false},
    );
  };

  let updateAllStates = (name, mail, address) => {
    setUserName(name);
    setUserMail(mail);
    setUserAddress(address);
  };

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user where user_id = ?',
        [user_id],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(res.user_name, res.user_mail, res.user_address);
          } else {
            alert('No user found');
            updateAllStates('', '', '');
          }
        },
      );
    });
  }, []);

  let updateUser = () => {
    if (!userName) {
      showAlert('Advertencia', 'Rellene el Nombre de Usuario');
      return;
    }
    if (!userMail) {
      showAlert('Advertencia', 'Rellene el Correo');
      return;
    }
    if (!userAddress) {
      showAlert('Advertencia', 'Rellene la Dirección');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_user set user_name=?, user_mail=? , user_address=? where user_id=?',
        [userName, userMail, userAddress, user_id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          navigation.navigate('DashboardScreen');
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{flex: 1, justifyContent: 'space-between'}}>
              <TextInput style={styles.input}
              value={userName}
              underlineColorAndroid={colors.underlineColorAndroid}
              placeholder="Enter Name"
              placeholderTextColor={colors.mainColor}
              onChangeText={(userName) => setUserName(userName)}
              blurOnSubmit={false}                  
              />
              <TextInput style={styles.input}
              value={userMail}
              underlineColorAndroid={colors.underlineColorAndroid}
              placeholder="Enter Email"
              placeholderTextColor={colors.mainColor}
              onChangeText={(userMail) => setUserMail(userMail)}
              blurOnSubmit={false}                  
              />
              <TextInput style={styles.inputNotes}
              value={userAddress}
              underlineColorAndroid={colors.underlineColorAndroid}
              placeholder="Enter Address"
              placeholderTextColor={colors.mainColor}
              maxLength={225}
              numberOfLines={3}
              multiline={true}
              onChangeText={(userAddress) => setUserAddress(userAddress)}
              blurOnSubmit={false}                  
              />
              <TDMButtom title="Guardar" customClick={updateUser} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    borderColor: colors.gray,
    borderWidth: 1.5,
    padding: 5,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
  },
  inputNotes: {
    borderRadius: 8,
    borderColor: colors.gray,
    borderWidth: 1.5,
    padding: 5,
    textAlignVertical: 'top',
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
  },
});

export default UpdateUser;
