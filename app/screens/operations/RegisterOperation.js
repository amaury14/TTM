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
import { Icon } from 'react-native-elements';
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

  let showAlert = (title, text) => {
    Alert.alert(title, text,
      [{ text: 'Aceptar' }],
      {cancelable: false},
    );
  };
  
  let register_operation = () => {  
    if (!pairCoin) {
      showAlert('Advertencia', 'Rellene el Par/Moneda');
      return;
    }
    if (!investment) {
      showAlert('Advertencia', 'Rellene la Inversión');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_ops (pairCoin, investment, lowPoint, highPoint, startPoint, grids, startDate, stopLoss, triggerPrice, takeProfit, profitPercent, notes, psicotrading, closeDate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [pairCoin, investment, lowPoint, highPoint, startPoint, grids, startDate, stopLoss, triggerPrice, takeProfit, profitPercent, notes, psicotrading, closeDate],
        (tx, results) => {
          console.log('register operation', results.rowsAffected);
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
        <View style={styles.form}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <KeyboardAvoidingView
                behavior="padding"
                style={{flex: 1, justifyContent: 'space-between'}}>
                <View style={styles.row}>
                  <Text style={styles.label}>* Campos requeridos</Text>
                </View>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.label}>* Par/Moneda</Text>
                    <TextInput style={styles.input}
                      value={pairCoin}
                      underlineColorAndroid={colors.underlineColorAndroid}
                      placeholder="Par/Moneda"
                      placeholderTextColor={colors.placeholderBlue}
                      onChangeText={(pairCoin) => setPairCoin(pairCoin)}
                      blurOnSubmit={false}                  
                    />
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.label}>* Inversión</Text>
                    <TextInput style={styles.input}
                      value={investment}
                      underlineColorAndroid={colors.underlineColorAndroid}
                      placeholder="Inversión"
                      placeholderTextColor={colors.placeholderBlue}
                      onChangeText={(investment) => setInvestment(investment)}
                      blurOnSubmit={false}                  
                    />
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.label}>Grids (bots)</Text>
                    <TextInput style={styles.input}
                    value={grids}
                    underlineColorAndroid={colors.underlineColorAndroid}
                    placeholder="Grids"
                    placeholderTextColor={colors.placeholderBlue}
                    onChangeText={(grids) => setGrids(grids)}
                    blurOnSubmit={false}                  
                    /> 
                  </View>                 
                </View>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.label}>Low Point</Text>
                    <TextInput style={styles.input}
                        value={lowPoint}
                        underlineColorAndroid={colors.underlineColorAndroid}
                        placeholder="Low Point"
                        placeholderTextColor={colors.placeholderBlue}
                        onChangeText={(lowPoint) => setLowPoint(lowPoint)}
                        blurOnSubmit={false}                  
                      />
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.label}>Start Point</Text>
                    <TextInput style={styles.input}
                      value={startPoint}
                      underlineColorAndroid={colors.underlineColorAndroid}
                      placeholder="Start Point"
                      placeholderTextColor={colors.placeholderBlue}
                      onChangeText={(startPoint) => setStartPoint(startPoint)}
                      blurOnSubmit={false}                  
                    />
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.label}>High Point</Text>
                    <TextInput style={styles.input}
                      value={highPoint}
                      underlineColorAndroid={colors.underlineColorAndroid}
                      placeholder="High Point"
                      placeholderTextColor={colors.placeholderBlue}
                      onChangeText={(highPoint) => setHighPoint(highPoint)}
                      blurOnSubmit={false}                  
                    />                
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.label}>Stop Loss</Text>
                    <TextInput style={styles.input}
                    value={stopLoss}
                    underlineColorAndroid={colors.underlineColorAndroid}
                    placeholder="Stop Loss"
                    placeholderTextColor={colors.placeholderBlue}
                    onChangeText={(stopLoss) => setStopLoss(stopLoss)}
                    blurOnSubmit={false}                  
                    />
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.label}>Trigger Price</Text>
                    <TextInput style={styles.input}
                    value={triggerPrice}
                    underlineColorAndroid={colors.underlineColorAndroid}
                    placeholder="Trigger Price"
                    placeholderTextColor={colors.placeholderBlue}
                    onChangeText={(triggerPrice) => setTriggerPrice(triggerPrice)}
                    blurOnSubmit={false}                  
                    />
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.label}>Take Profit</Text>
                    <TextInput style={styles.input}
                    value={takeProfit}
                    underlineColorAndroid={colors.underlineColorAndroid}
                    placeholder="Take Profit"
                    placeholderTextColor={colors.placeholderBlue}
                    onChangeText={(takeProfit) => setTakeProfit(takeProfit)}
                    blurOnSubmit={false}
                    />
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.label}>% de Ganancia</Text>
                    <TextInput style={styles.input}
                    value={profitPercent}
                    underlineColorAndroid={colors.underlineColorAndroid}
                    placeholder="% de Ganancia"
                    placeholderTextColor={colors.placeholderBlue}
                    onChangeText={(profitPercent) => setProfitPercent(profitPercent)}
                    blurOnSubmit={false}
                    />
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.label}>Psicotrading</Text>
                    <TextInput style={styles.inputLong}
                    value={psicotrading}
                    underlineColorAndroid={colors.underlineColorAndroid}
                    placeholder="Psicotrading"
                    placeholderTextColor={colors.placeholderBlue}
                    onChangeText={(psicotrading) => setPsicotrading(psicotrading)}
                    blurOnSubmit={false}
                    />
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.row2}>
                    <Text style={styles.label}>Fecha de Inicio</Text>
                    <Icon style={styles.dateIcon}
                      reverse
                      name='event'
                      type='material'
                      size={15}
                      color={colors.placeholderBlue}
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
                  </View>
                  <View style={styles.row2}>
                    <Text style={styles.label}>Fecha de Cierre</Text>
                    <Icon
                      reverse
                      name='today'
                      type='material'
                      size={15}
                      color={colors.placeholderBlue}
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
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.label}>Apuntes</Text>
                    <TextInput style={styles.inputNotes}
                    value={notes}
                    underlineColorAndroid={colors.underlineColorAndroid}
                    placeholder="Aquí anote sus apuntes, pensamientos, sentimientos en el trading, movimeinto del mercado, etc..."
                    placeholderTextColor={colors.placeholderBlue}
                    onChangeText={(notes) => setNotes(notes)}
                    maxLength={225}
                    numberOfLines={5}
                    multiline={true}           
                    />
                  </View>
                </View>
                <Mybutton title="Save" customClick={register_operation} />
              </KeyboardAvoidingView>
            </ScrollView>  
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
    column: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start'
    },
    dateIcon: {
      height: 20,
      width: 20
    },
    deleteIcon: {
        width: 50,
        height: 50,
        backgroundColor: colors.secondary,
        position: "absolute",
        top: 40,
        right: 30,
    },
    form: {
      flex: 1,
      backgroundColor: 'white',
      padding: 15,
    },
    label: {
      fontSize: 12,
      color: colors.placeholderBlue,
      fontWeight: 'bold',
    },
    image: {
        width: "100%",
        height: "100%",
    },
    input: {
      borderRadius: 8,
      borderColor: colors.gray,
      borderWidth: 1.5,
      marginRight: 5,
      padding: 3,
      height: 30,
      width: 110,
    },
    inputNotes: {
      borderRadius: 8,
      borderColor: colors.gray,
      borderWidth: 1.5,
      marginRight: 5,
      padding: 5,
      height: 130,
      width: 350,
      textAlignVertical: 'top',
    },
    inputLong: {
      borderRadius: 8,
      borderColor: colors.gray,
      borderWidth: 1.5,
      marginRight: 5,
      padding: 3,
      height: 30,
      width: 230,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginBottom: 20,
    },
    row2: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    viewContainer: {
        backgroundColor: colors.black,
        flex: 1,
    }
})

export default RegisterOperation;