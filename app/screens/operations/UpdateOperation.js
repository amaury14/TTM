import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
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

import firebase from '../../../database/firebase';
import colors from '../../config/colors';
import radioConfig from '../../config/radioGroup';
import TDMButtom from '../components/TDMButtom';


const UpdateOperation = (props) => {
    const { id } = props.route.params;
    let radioButtonsData = radioConfig;

    const initialState = {
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
      closeDate: null,
      opState: radioButtonsData
    };

    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(false);

    useEffect(() => {
      getOperationById(id);
    }, []);

    const handlePropChange = (name, value) => {
      setState({ ...state, [name]: value });
      console.log(state.opState);
    }

    const showAlert = (title, text) => {
      Alert.alert(title, text,
        [{ text: 'Aceptar' }],
        {cancelable: false},
      );
    };

    const getOperationById = async (id) => {
      const dbRef = firebase.fireDb.collection('operations').doc(id);
      const doc = await dbRef.get();
      const operation = doc.data();
      const opIndex = radioButtonsData.findIndex(item => item.value === operation.opState);
        let newRadioButtonsData = [...radioButtonsData];
        radioButtonsData.forEach((element, index) => {
            newRadioButtonsData[index] = {
              ...newRadioButtonsData[index],
              selected: index === opIndex ? true : false
            };
        });
      setState({
        ...operation,
        id: operation.id,
        opState: newRadioButtonsData
      });
      setLoading(false);
    };
  
    const updateOperation = async () => {
      const stateSelected = state.opState.find(item => item.selected).value;
      if (state.pairCoin === "") {
        showAlert('Advertencia', 'Rellene el Par/Moneda');
        return;
      }
      if (state.investment === "") {
        showAlert('Advertencia', 'Rellene la Inversión');
        return;
      }
      if (stateSelected !== '1') {
        handlePropChange('closeDate', new Date());
      }
      try {
        setLoading2(true);
        const dbRef = firebase.fireDb.collection('operations').doc(id)
        await dbRef.set({
          pairCoin: state.pairCoin,
          investment: state.investment,
          lowerLimit: state.lowerLimit,
          upperLimit: state.upperLimit,
          grids: state.grids,
          startDate: state.startDate,
          stopLoss: state.stopLoss,
          triggerPrice: state.triggerPrice,
          takeProfit: state.takeProfit,
          profitPercent: state.profitPercent,
          notes: state.notes,
          closeDate: state.closeDate,
          opState: stateSelected
        });
        setState(initialState);
        setLoading2(false);
        props.navigation.navigate('DashboardScreen');
      } catch(error) {
        console.log(error);
      }
    };

    if (loading) {
      return (
        <View style={styles.flex1}>
          <ActivityIndicator size="large" color={colors.mainColor} />
        </View>
      );
    }
  
    return (
      <SafeAreaView style={styles.flex1}>
        <View style={styles.flex1}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <KeyboardAvoidingView
                behavior="padding"
                style={styles.key}>
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
                      onChangeText={(value) => handlePropChange('pairCoin', value)}
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
                      onChangeText={(value) => handlePropChange('investment', value)}
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
                    onChangeText={(value) => handlePropChange('grids', value)}
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
                    onChangeText={(value) => handlePropChange('stopLoss', value)}
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
                        onChangeText={(value) => handlePropChange('lowerLimit', value)}
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
                      onChangeText={(value) => handlePropChange('upperLimit', value)}
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
                    onChangeText={(value) => handlePropChange('triggerPrice', value)}
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
                    onChangeText={(value) => handlePropChange('takeProfit', value)}
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
                    onChangeText={(value) => handlePropChange('profitPercent', value)}
                    blurOnSubmit={false}
                    keyboardType="numeric"
                    />
                  </View>
                </View>
                <View style={styles.row}>
                  <RadioGroup 
                    radioButtons={state.opState} 
                    onPress={(value) => handlePropChange('opState', value)} 
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
                    onChangeText={(value) => handlePropChange('notes', value)}
                    maxLength={225}
                    numberOfLines={8}
                    multiline={true}           
                    />
                  </View>
                </View>
                <TDMButtom title="Guardar" customClick={() => updateOperation()} />
                {loading2 && <View style={styles.loader}>
                <ActivityIndicator size="large" color={colors.mainColor} />
              </View>}
              </KeyboardAvoidingView>
            </ScrollView>
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
    },
    loader: {
      marginTop: 20
    }
})

export default UpdateOperation;