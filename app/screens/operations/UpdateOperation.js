import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';

import colors from '../../config/colors';
import radioConfig from '../../config/radioGroup';
import TDMButtom from '../components/TDMButtom';


const UpdateOperation = ({ route, navigation }) => {
    let { id } = route.params;
    let radioButtonsData = radioConfig;

    const [state, setState] = useState({
      pairCoin: '',
      investment: '',
      lowerLimit: '',
      upperLimit: '',
      grids: '',
      startDate: new Date(),
      stopLoss: '',
      triggerPrice: '',
      takeProfit: '',
      profitPercent: '',
      notes: '',
      closeDate: new Date(),
      opState: radioButtonsData,
    });

    const handleTextChange = (name, value) => {
      setState({ ...state, [name]: value });
    }

    let showAlert = (title, text) => {
      Alert.alert(title, text,
        [{ text: 'Aceptar' }],
        {cancelable: false},
      );
    };

    let updateAllStates = (pairCoin, investment, lowerLimit, upperLimit,
       grids, startDate, stopLoss, triggerPrice, takeProfit,
       profitPercent, notes, closeDate, opState) => {
        handleTextChange('pairCoin', pairCoin);
        handleTextChange('investment', investment);
        handleTextChange('lowerLimit', lowerLimit);
        handleTextChange('upperLimit', upperLimit);
        handleTextChange('grids', grids);
        handleTextChange('startDate', startDate);
        handleTextChange('stopLoss', stopLoss);
        handleTextChange('triggerPrice', triggerPrice);
        handleTextChange('takeProfit', takeProfit);
        handleTextChange('profitPercent', profitPercent);
        handleTextChange('notes', notes);
        handleTextChange('closeDate', closeDate);
        const opIndex = radioButtonsData.findIndex(item => item.value === opState);
        let newRadioButtonsData = [...radioButtonsData];
        radioButtonsData.forEach((element, index) => {
          newRadioButtonsData[index] = {
            ...newRadioButtonsData[index],
            selected: index === opIndex ? true : false
          };
        });
        handleTextChange('opState', newRadioButtonsData);
    };

    // useEffect(() => {
    //   db.transaction((tx) => {
    //     tx.executeSql(
    //       'SELECT * FROM table_ops where op_id = ?',
    //       [op_id],
    //       (tx, results) => {
    //         var len = results.rows.length;
    //         if (len > 0) {
    //           let res = results.rows.item(0);
    //           updateAllStates(res.pairCoin, res.investment, res.lowerLimit, res.upperLimit,
    //             res.grids, res.startDate, res.stopLoss, res.triggerPrice, res.takeProfit,
    //             res.profitPercent, res.notes, res.closeDate, res.opState);
    //         } else {
    //           updateAllStates('', '', '', '', '', '', '', '', '', '', '', '', '');
    //         }
    //       },
    //     );
    //   });
    // }, []);
  
    let update_operation = () => {
      const stateSelected = state.find(item => item.selected).value;
      if (!pairCoin) {
        showAlert('Advertencia', 'Rellene el Par/Moneda');
        return;
      }
      if (!investment) {
        showAlert('Advertencia', 'Rellene la Inversión');
        return;
      }
      if (stateSelected !== '1') {
        setCloseDate(new Date());
      }
      // db.transaction(function (tx) {
      //   tx.executeSql(
      //     'UPDATE table_ops set pairCoin=?, investment=?, lowerLimit=?, upperLimit=?, grids=?, startDate=?, stopLoss=?, triggerPrice=?, takeProfit=?, profitPercent=?, notes=?, closeDate=?, state=? where op_id=?',
      //     [pairCoin, investment, lowerLimit, upperLimit, grids, startDate, stopLoss, triggerPrice, takeProfit, profitPercent, notes, closeDate, stateSelected, op_id],
      //     (tx, results) => {
      //       console.log('update operation', results.rowsAffected);
      //       navigation.navigate('DashboardScreen'); 
      //     },
      //   );
      // });
    };
  
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{flex: 1}}>
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
                      value={state.pairCoin}
                      underlineColorAndroid={colors.underlineColorAndroid}
                      placeholder="Par/Moneda"
                      placeholderTextColor={colors.mainColor}
                      onChangeText={(value) => handleTextChange('pairCoin', value)}
                      blurOnSubmit={false}                  
                    />
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.label}>* Inversión</Text>
                    <TextInput style={styles.input}
                      value={state.investment}
                      underlineColorAndroid={colors.underlineColorAndroid}
                      placeholder="Inversión"
                      placeholderTextColor={colors.mainColor}
                      onChangeText={(value) => handleTextChange('investment', value)}
                      blurOnSubmit={false}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.label}>Grids (bots)</Text>
                    <TextInput style={styles.input}
                    value={state.grids}
                    underlineColorAndroid={colors.underlineColorAndroid}
                    placeholder="Grids"
                    placeholderTextColor={colors.mainColor}
                    onChangeText={(value) => handleTextChange('grids', value)}
                    blurOnSubmit={false}
                    keyboardType="numeric"
                    /> 
                  </View>                 
                </View>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.label}>Stop Loss</Text>
                    <TextInput style={styles.input}
                    value={state.stopLoss}
                    underlineColorAndroid={colors.underlineColorAndroid}
                    placeholder="Stop Loss"
                    placeholderTextColor={colors.mainColor}
                    onChangeText={(value) => handleTextChange('stopLoss', value)}
                    blurOnSubmit={false}
                    keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.label}>Lower Limit</Text>
                    <TextInput style={styles.input}
                        value={state.lowerLimit}
                        underlineColorAndroid={colors.underlineColorAndroid}
                        placeholder="Lower Limit"
                        placeholderTextColor={colors.mainColor}
                        onChangeText={(value) => handleTextChange('lowerLimit', value)}
                        blurOnSubmit={false}
                        keyboardType="numeric"
                      />
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.label}>Upper Limit</Text>
                    <TextInput style={styles.input}
                      value={state.upperLimit}
                      underlineColorAndroid={colors.underlineColorAndroid}
                      placeholder="Upper Limit"
                      placeholderTextColor={colors.mainColor}
                      onChangeText={(value) => handleTextChange('upperLimit', value)}
                      blurOnSubmit={false}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.label}>Trigger/Buy Price</Text>
                    <TextInput style={styles.input}
                    value={state.triggerPrice}
                    underlineColorAndroid={colors.underlineColorAndroid}
                    placeholder="Trigger Price"
                    placeholderTextColor={colors.mainColor}
                    onChangeText={(value) => handleTextChange('triggerPrice', value)}
                    blurOnSubmit={false}
                    keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.label}>Take Profit</Text>
                    <TextInput style={styles.input}
                    value={state.takeProfit}
                    underlineColorAndroid={colors.underlineColorAndroid}
                    placeholder="Take Profit"
                    placeholderTextColor={colors.mainColor}
                    onChangeText={(value) => handleTextChange('takeProfit', value)}
                    blurOnSubmit={false}
                    keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.label}>% de Ganancia</Text>
                    <TextInput style={styles.input}
                    value={state.profitPercent}
                    underlineColorAndroid={colors.underlineColorAndroid}
                    placeholder="% de Ganancia"
                    placeholderTextColor={colors.mainColor}
                    onChangeText={(value) => handleTextChange('profitPercent', value)}
                    blurOnSubmit={false}
                    keyboardType="numeric"
                    />
                  </View>
                </View>
                <View style={styles.row}>
                  <RadioGroup 
                    radioButtons={state.opState} 
                    onPress={(value) => handleTextChange('opState', value)} 
                    layout='row'
                  />
                </View>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.label}>Apuntes</Text>
                    <TextInput style={styles.inputNotes}
                    value={state.notes}
                    underlineColorAndroid={colors.underlineColorAndroid}
                    placeholder="Aquí anote sus apuntes, pensamientos, sentimientos en el trading, movimientos del mercado, etc..."
                    placeholderTextColor={colors.mainColor}
                    onChangeText={(value) => handleTextChange('notes', value)}
                    maxLength={225}
                    numberOfLines={8}
                    multiline={true}           
                    />
                  </View>
                </View>
                <TDMButtom title="Guardar" customClick={update_operation} />
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
      color: colors.mainColor,
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

export default UpdateOperation;