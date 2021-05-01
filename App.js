import 'react-native-gesture-handler';

import React from 'react';
import { Dimensions, StyleSheet, SafeAreaView, StatusBar, Platform, View } from 'react-native';
import { useDimensions, useDeviceOrientation } from "@react-native-community/hooks";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import DashboardScreen from './app/screens/DashboardScreen';
import RegisterUser from './app/screens/user/RegisterUser';
import ViewAllUser from './app/screens/user/ViewAllUser';
import RegisterOperation from './app/screens/operations/RegisterOperation';
import ViewAllOperation from './app/screens/operations/ViewAllOperation';
import UpdateOperation from './app/screens/operations/UpdateOperation';
import UpdateUser from './app/screens/user/UpdateUser';

import colors from './app/config/colors';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DashboardScreen">
        <Stack.Screen
          name="DashboardScreen"
          component={DashboardScreen}
          options={{
            title: 'Dashboard', //Set Header Title
            headerStyle: {
              backgroundColor: colors.placeholderBlue, //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterUser}
          options={{
            title: 'Agregar Usuario', //Set Header Title
            headerStyle: {
              backgroundColor: colors.placeholderBlue, //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="UpdateUser"
          component={UpdateUser}
          options={{
            title: 'Modificar Usuario', //Set Header Title
            headerStyle: {
              backgroundColor: colors.placeholderBlue, //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />        
        <Stack.Screen
          name="ViewAll"
          component={ViewAllUser}
          options={{
            title: 'Usuarios', //Set Header Title
            headerStyle: {
              backgroundColor: colors.placeholderBlue, //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="RegisterOperation"
          component={RegisterOperation}
          options={{
            title: 'Agregar Operación', //Set Header Title
            headerStyle: {
              backgroundColor: colors.placeholderBlue, //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="UpdateOperation"
          component={UpdateOperation}
          options={{
            title: 'Modificar Operación', //Set Header Title
            headerStyle: {
              backgroundColor: colors.placeholderBlue, //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="ViewAllOperation"
          component={ViewAllOperation}
          options={{
            title: 'Operaciones', //Set Header Title
            headerStyle: {
              backgroundColor: colors.placeholderBlue, //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
});
