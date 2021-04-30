import React, {useState} from 'react';
import {
    Alert,
    Button,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';
// import Icon from 'react-native-ico-material-design';
import { Icon } from 'react-native-elements';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as SQLite from 'expo-sqlite';

import colors from '../../config/colors';

var db = SQLite.openDatabase('TDM.db');

const RegisterOperation = ({navigation}) => {
    let [pairCoin, setPairCoin] = useState('');
    let [investment, setInvestment] = useState('');
    let [lowPoint, setLowPoint] = useState('');
    let [highPoint, setHighPoint] = useState('');
    let [startPoint, setStartPoint] = useState('');
    let [grids, setGrids] = useState('');
    let [startDate, setStartDate] = useState(new Date());
    let [stopLoss, setStopLoss] = useState('');
    let [triggerPrice, setTriggerPrice] = useState('');
    let [takeProfit, setTakeProfit] = useState('');
    // =================
    let [profitPercent, setProfitPercent] = useState('');
    let [notes, setNotes] = useState('');
    let [psicotrading, setPsicotrading] = useState('');
    let [closeDate, setCloseDate] = useState(new Date());
    let [showStartDate, setShowStartDate] = useState(false);
    let [showCloseDate, setShowCloseDate] = useState(false);
  
    let register_operation = () => {  
      console.log(pairCoin, investment, startDate, closeDate);
      if (!pairCoin) {
        alert('Please fill Pair/Coin');
        return;
      }
      if (!investment) {
        alert('Please fill Investment');
        return;
      }
  
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO table_ops (pairCoin, investment, lowPoint, highPoint, startPoint, grids, startDate, stopLoss, triggerPrice, takeProfit, profitPercent, notes, psicotrading, closeDate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
          [pairCoin, investment, lowPoint, highPoint, startPoint, grids, startDate, stopLoss, triggerPrice, takeProfit, profitPercent, notes, psicotrading, closeDate],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'Op Registered Successfully',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('DashboardScreen'),
                  },
                ],
                {cancelable: false},
              );
            } else {
              alert('Registration Failed');
              navigation.navigate('DashboardScreen');
            } 
          },
        );
      });
    };

    const showDatepicker = (type, action) => {
        switch (type) {
            case 'startDate': {
                setShowStartDate(action);
                break;
            }
            case 'closeDate': {
                setShowCloseDate(action);
                break;
            }
        }
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
                  placeholder="Enter Pair/Coin"
                  onChangeText={(pairCoin) => setPairCoin(pairCoin)}
                  style={{padding: 10}}
                />
                <Mytextinput
                  placeholder="Enter investment"
                  onChangeText={(investment) => setInvestment(investment)}
                  maxLength={10}
                  style={{padding: 10}}
                />
                <Mytextinput
                  placeholder="Enter lowPoint"
                  onChangeText={(lowPoint) => setLowPoint(lowPoint)}
                  maxLength={10}
                  style={{padding: 10}}
                />
                <Mytextinput
                  placeholder="Enter highPoint"
                  onChangeText={(highPoint) => setHighPoint(highPoint)}
                  maxLength={10}
                  style={{padding: 10}}
                />
                <Mytextinput
                  placeholder="Enter startPoint"
                  onChangeText={(startPoint) => setStartPoint(startPoint)}
                  maxLength={10}
                  style={{padding: 10}}
                />
                <Mytextinput
                  placeholder="Enter grids"
                  onChangeText={(grids) => setGrids(grids)}
                  maxLength={10}
                  style={{padding: 10}}
                />
                <Icon
                reverse
                name='event'
                type='material'
                color='#517fa4'
                onPress={() => showDatepicker('startDate', true)} />
                {showStartDate && (
                    <DateTimePicker
                    value={startDate}
                    mode="date"
                    is24Hour="false"
                    display="default"
                    onChange={(event, selectedDate) => { setStartDate(selectedDate); showDatepicker('startDate', false)}}
                    />
                )}
                <Mytextinput
                  placeholder="Enter stopLoss"
                  onChangeText={(stopLoss) => setStopLoss(stopLoss)}
                  maxLength={10}
                  style={{padding: 10}}
                />
                <Mytextinput
                  placeholder="Enter triggerPrice"
                  onChangeText={(triggerPrice) => setTriggerPrice(triggerPrice)}
                  maxLength={10}
                  style={{padding: 10}}
                />
                <Mytextinput
                  placeholder="Enter takeProfit"
                  onChangeText={(takeProfit) => setTakeProfit(takeProfit)}
                  maxLength={10}
                  style={{padding: 10}}
                />

                <Mytextinput
                  placeholder="Enter profitPercent"
                  onChangeText={(profitPercent) => setProfitPercent(profitPercent)}
                  maxLength={10}
                  style={{padding: 10}}
                />
                <Mytextinput
                  placeholder="Enter notes"
                  onChangeText={(notes) => setNotes(notes)}
                  maxLength={225}
                  numberOfLines={5}
                  multiline={true}
                  style={{textAlignVertical: 'top', padding: 10}}
                />
                <Mytextinput
                  placeholder="Enter psicotrading"
                  onChangeText={(psicotrading) => setPsicotrading(psicotrading)}
                  maxLength={10}
                  style={{padding: 10}}
                />
                <Icon
                reverse
                name='today'
                type='material'
                color='#5a7fa4'
                onPress={() => showDatepicker('closeDate', true)} />
                {showCloseDate && (
                    <DateTimePicker
                    value={closeDate}
                    mode={'date'}
                    is24Hour={false}
                    display="default"
                    onChange={(event, selectedDate) => { setCloseDate(selectedDate); showDatepicker('closeDate', false)}}
                    />
                )}
                <Mybutton title="Save" customClick={register_operation} />
              </KeyboardAvoidingView>
            </ScrollView>
          </View>          
        </View>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    closeIcon: {
        width: 50,
        height: 50,
        backgroundColor: colors.primary,
        position: "absolute",
        top: 40,
        left: 30,
    },
    deleteIcon: {
        width: 50,
        height: 50,
        backgroundColor: colors.secondary,
        position: "absolute",
        top: 40,
        right: 30,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    viewContainer: {
        backgroundColor: colors.black,
        flex: 1,
    }
})

export default RegisterOperation;