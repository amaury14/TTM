import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import firebase from '../../../database/firebase';
import colors from '../../config/colors';
import TDMButtom from '../components/TDMButtom';

const RegisterUser = (props) => {

  const [state, setState] = useState({
    userName: '',
    userMail: '',
    userAddress: '',
    userPhone: '',
    loading: false
  });

  const handlePropChange = (name, value) => {
    setState({ ...state, [name]: value });
  }

  const showAlert = (title, text) => {
    Alert.alert(title, text,
      [{ text: 'Aceptar' }],
      {cancelable: false},
    );
  };

  const fireNewUser = async () => {
    if (state.userName === '') {
      showAlert('Advertencia', 'Rellene el Nombre de usuario');
      return;
    }
    if (state.userMail === '') {
      showAlert('Advertencia', 'Rellene el Correo');
      return;
    }
    if (state.userPhone === '') {
      showAlert('Advertencia', 'Rellene el Celular');
      return;
    }
    
    try {
      handlePropChange('loading', true);
      await firebase.fireDb.collection('users').add({
        userName: state.userName,
        userMail: state.userMail,
        userPhone: state.userPhone,
        userAddress: state.userAddress
      });
      handlePropChange('loading', false);
      props.navigation.navigate('DashboardScreen');
    } catch(error) {
      console.log(error)
    }
  };

  return (
    <SafeAreaView style={styles.flex1}>
      <View style={styles.flex1}>
        <View style={styles.flex1}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={styles.key}>
              <TextInput style={styles.input}
              underlineColorAndroid={colors.underlineColorAndroid}
              placeholder="Usuario"
              placeholderTextColor={colors.mainColor}
              onChangeText={(value) => handlePropChange('userName', value)}
              blurOnSubmit={false}                  
              />
              <TextInput style={styles.input}
              underlineColorAndroid={colors.underlineColorAndroid}
              placeholder="Email"
              placeholderTextColor={colors.mainColor}
              onChangeText={(value) => handlePropChange('userMail', value)}
              blurOnSubmit={false}                  
              />
              <TextInput style={styles.input}
              underlineColorAndroid={colors.underlineColorAndroid}
              placeholder="# Celular"
              placeholderTextColor={colors.mainColor}
              onChangeText={(value) => handlePropChange('userPhone', value)}
              blurOnSubmit={false}
              keyboardType="numeric"                 
              />
              <TextInput style={styles.inputNotes}
              underlineColorAndroid={colors.underlineColorAndroid}
              placeholder="Address"
              placeholderTextColor={colors.mainColor}
              maxLength={225}
              numberOfLines={3}
              multiline={true}
              onChangeText={(value) => handlePropChange('userAddress', value)}
              blurOnSubmit={false}                  
              />
              <TDMButtom title="Guardar" customClick={() => fireNewUser()} />
              {state.loading && <View style={styles.loader}>
                <ActivityIndicator size="large" color={colors.mainColor} />
              </View>}
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
    backgroundColor: colors.white
  },
  key: {
    flex: 1,
    justifyContent: 'space-between'
  },
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
  loader: {
    marginTop: 20
  }
});

export default RegisterUser;
