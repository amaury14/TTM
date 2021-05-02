import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import Mytextinput from '../components/Mytextinput';
import TDMButtom from '../components/TDMButtom';
import * as SQLite from 'expo-sqlite';

var db = SQLite.openDatabase('TDM.db');

const UpdateUser = ({navigation}) => {
  let [inputUserId, setInputUserId] = useState('');
  let [userName, setUserName] = useState('');
  let [userMail, setUserMail] = useState('');
  let [userAddress, setUserAddress] = useState('');

  let updateAllStates = (name, mail, address) => {
    setUserName(name);
    setUserMail(mail);
    setUserAddress(address);
  };

  let searchUser = () => {
    console.log(inputUserId);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user where user_id = ?',
        [inputUserId],
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
  };
  let updateUser = () => {
    console.log(inputUserId, userName, userMail, userAddress);

    if (!inputUserId) {
      alert('Please fill User id');
      return;
    }
    if (!userName) {
      alert('Please fill name');
      return;
    }
    if (!userMail) {
      alert('Please fill Mail');
      return;
    }
    if (!userAddress) {
      alert('Please fill Address');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_user set user_name=?, user_mail=? , user_address=? where user_id=?',
        [userName, userMail, userAddress, inputUserId],
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
              <Mytextinput
                placeholder="Enter User Id"
                style={{padding: 10}}
                onChangeText={(inputUserId) => setInputUserId(inputUserId)}
              />
              <TDMButtom title="Search User" customClick={searchUser} />
              <Mytextinput
                placeholder="Enter Name"
                value={userName}
                style={{padding: 10}}
                onChangeText={(userName) => setUserName(userName)}
              />
              <Mytextinput
                placeholder="Enter Mail"
                value={'' + userMail}
                onChangeText={(userMail) => setUserMail(userMail)}
                maxLength={10}
                style={{padding: 10}}
                keyboardType="numeric"
              />
              <Mytextinput
                value={userAddress}
                placeholder="Enter Address"
                onChangeText={(userAddress) => setUserAddress(userAddress)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{textAlignVertical: 'top', padding: 10}}
              />
              <TDMButtom title="Update User" customClick={updateUser} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateUser;
