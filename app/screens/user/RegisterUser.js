import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native';
import TDMButtom from '../components/TDMButtom';
import * as SQLite from 'expo-sqlite';

import colors from '../../config/colors';

var db = SQLite.openDatabase('TDM.db');

const RegisterUser = ({navigation}) => {
  let [userName, setUserName] = useState('');
  let [userMail, setUserMail] = useState('');
  let [userAddress, setUserAddress] = useState('');

  let register_user = () => {
    if (!userName) {
      alert('Please fill name');
      return;
    }
    if (!userMail) {
      alert('Please fill Contact Email');
      return;
    }
    if (!userAddress) {
      alert('Please fill Address');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (user_name, user_mail, user_address) VALUES (?,?,?)',
        [userName, userMail, userAddress],
        (tx, results) => {
          console.log('register user', results.rowsAffected);
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
              underlineColorAndroid={colors.underlineColorAndroid}
              placeholder="Enter Name"
              placeholderTextColor={colors.mainColor}
              onChangeText={(userName) => setUserName(userName)}
              blurOnSubmit={false}                  
              />
              <TextInput style={styles.input}
              underlineColorAndroid={colors.underlineColorAndroid}
              placeholder="Enter Email"
              placeholderTextColor={colors.mainColor}
              onChangeText={(userMail) => setUserMail(userMail)}
              blurOnSubmit={false}                  
              />
              <TextInput style={styles.inputNotes}
              underlineColorAndroid={colors.underlineColorAndroid}
              placeholder="Enter Address"
              placeholderTextColor={colors.mainColor}
              maxLength={225}
              numberOfLines={3}
              multiline={true}
              onChangeText={(userAddress) => setUserAddress(userAddress)}
              blurOnSubmit={false}                  
              />
              <TDMButtom title="Guardar" customClick={register_user} />
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

export default RegisterUser;
