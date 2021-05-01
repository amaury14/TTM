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
    TextInput,
    View
} from 'react-native';
import NumericInput from 'react-native-numeric-input'
import { Icon } from 'react-native-elements';
import Mybutton from '../components/Mybutton';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as SQLite from 'expo-sqlite';

import colors from '../../config/colors';

var db = SQLite.openDatabase('TDM.db');

const UpdateOperation = ({ route, navigation }) => {
    const { op_id } = route.params;

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

    let updateAllStates = (pairCoin, investment, lowPoint, highPoint,
       startPoint, grids, startDate, stopLoss, triggerPrice, takeProfit,
       profitPercent, notes, psicotrading, closeDate) => {
      setPairCoin(pairCoin);
      setInvestment(investment);
      setLowPoint(lowPoint);
      setHighPoint(highPoint);
      setStartPoint(startPoint);
      setGrids(grids);
      setStartDate(startDate);
      setStopLoss(stopLoss);
      setTriggerPrice(triggerPrice);
      setTakeProfit(takeProfit);
      setProfitPercent(profitPercent);
      setNotes(notes);
      setPsicotrading(psicotrading);
      setCloseDate(closeDate);
    };

    const searchOperation = () => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM table_ops where op_id = ?',
          [op_id],
          (tx, results) => {
            var len = results.rows.length;
            if (len > 0) {
              let res = results.rows.item(0);
              updateAllStates(res.pairCoin, res.investment, res.lowPoint, res.highPoint,
                res.startPoint, res.grids, res.startDate, res.stopLoss, res.triggerPrice, res.takeProfit,
                res.profitPercent, res.notes, res.psicotrading, res.closeDate);
              } else {
              alert('No operation found');
              updateAllStates('', '', '', '', '', '', '', '', '', '', '', '', '', '');
            }
          },
        );
      });
    };

    searchOperation();
  
    const update_operation = () => {
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
          'UPDATE table_ops set pairCoin=?, investment=?, lowPoint=?, highPoint=?, startPoint=?, grids=?, startDate=?, stopLoss=?, triggerPrice=?, takeProfit=?, profitPercent=?, notes=?, psicotrading=?, closeDate=? where op_id=?',
          [pairCoin, investment, lowPoint, highPoint, startPoint, grids, startDate, stopLoss, triggerPrice, takeProfit, profitPercent, notes, psicotrading, closeDate, op_id],
          (tx, results) => {
            console.log('update operation', results.rowsAffected);
            navigation.navigate('DashboardScreen'); 
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
                <TextInput
                  value={pairCoin}
                  underlineColorAndroid="transparent"
                  placeholder="Enter Pair/Coin"
                  placeholderTextColor="#007FFF"
                  onChangeText={(pairCoin) => setPairCoin(pairCoin)}
                  blurOnSubmit={false}                  
                />
                <TextInput
                  value={investment}
                  underlineColorAndroid="transparent"
                  placeholder="Enter investment"
                  placeholderTextColor="#007FFF"
                  onChangeText={(investment) => setInvestment(investment)}
                  blurOnSubmit={false}                  
                />
                <TextInput
                  value={lowPoint}
                  underlineColorAndroid="transparent"
                  placeholder="Enter lowPoint"
                  placeholderTextColor="#007FFF"
                  onChangeText={(lowPoint) => setLowPoint(lowPoint)}
                  blurOnSubmit={false}                  
                />
                <TextInput
                  value={highPoint}
                  underlineColorAndroid="transparent"
                  placeholder="Enter highPoint"
                  placeholderTextColor="#007FFF"
                  onChangeText={(highPoint) => setHighPoint(highPoint)}
                  blurOnSubmit={false}                  
                />
                <TextInput
                  value={startPoint}
                  underlineColorAndroid="transparent"
                  placeholder="Enter startPoint"
                  placeholderTextColor="#007FFF"
                  onChangeText={(startPoint) => setStartPoint(startPoint)}
                  blurOnSubmit={false}                  
                />
                <TextInput
                  value={grids}
                  underlineColorAndroid="transparent"
                  placeholder="Enter grids"
                  placeholderTextColor="#007FFF"
                  onChangeText={(grids) => setGrids(grids)}
                  blurOnSubmit={false}                  
                />
                <Icon
                  reverse
                  name='event'
                  type='material'
                  color='#517fa4'
                  onPress={() => showDatepicker('startDate', true)} />
                {showStartDate && (
                    <DateTimePicker
                    value={new Date(startDate) ?? new Date()}
                    mode="date"
                    is24Hour="false"
                    display="default"
                    onChange={(event, selectedDate) => { setStartDate(selectedDate); showDatepicker('startDate', false)}}
                    />
                )}
                <TextInput
                  value={stopLoss}
                  underlineColorAndroid="transparent"
                  placeholder="Enter stopLoss"
                  placeholderTextColor="#007FFF"
                  onChangeText={(stopLoss) => setStopLoss(stopLoss)}
                  blurOnSubmit={false}                  
                />
                <TextInput
                  value={triggerPrice}
                  underlineColorAndroid="transparent"
                  placeholder="Enter triggerPrice"
                  placeholderTextColor="#007FFF"
                  onChangeText={(triggerPrice) => setTriggerPrice(triggerPrice)}
                  blurOnSubmit={false}                  
                />
                <TextInput
                  value={takeProfit}
                  underlineColorAndroid="transparent"
                  placeholder="Enter takeProfit"
                  placeholderTextColor="#007FFF"
                  onChangeText={(takeProfit) => setTakeProfit(takeProfit)}
                  blurOnSubmit={false}
                />
                <TextInput
                  value={profitPercent}
                  underlineColorAndroid="transparent"
                  placeholder="Enter profitPercent"
                  placeholderTextColor="#007FFF"
                  onChangeText={(profitPercent) => setProfitPercent(profitPercent)}
                  blurOnSubmit={false}
                />
                <TextInput
                  value={notes}
                  underlineColorAndroid="transparent"
                  placeholder="Enter notes"
                  placeholderTextColor="#007FFF"
                  onChangeText={(notes) => setNotes(notes)}
                  maxLength={225}
                  numberOfLines={5}
                  multiline={true}
                  style={{textAlignVertical: 'top', padding: 10}}                 
                />
                <TextInput
                  value={psicotrading}
                  underlineColorAndroid="transparent"
                  placeholder="Enter psicotrading"
                  placeholderTextColor="#007FFF"
                  onChangeText={(psicotrading) => setPsicotrading(psicotrading)}
                  blurOnSubmit={false}
                />
                <Icon
                  reverse
                  name='today'
                  type='material'
                  color='#5a7fa4'
                  onPress={() => showDatepicker('closeDate', true)} />
                {showCloseDate && (
                    <DateTimePicker
                    value={new Date(closeDate) ?? new Date()}
                    mode={'date'}
                    is24Hour={false}
                    display="default"
                    onChange={(event, selectedDate) => { setCloseDate(selectedDate); showDatepicker('closeDate', false)}}
                    />
                )}
                <Mybutton title="Save" customClick={update_operation} />
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

export default UpdateOperation;