import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegisterOperation from './operations/RegisterOperation';
import ViewAllUser from './user/ViewAllUser';
import DashboardScreen from './DashboardScreen';
import RegisterUser from './user/RegisterUser';
import UpdateUser from './user/UpdateUser';
import UpdateOperation from './operations/UpdateOperation';
import ViewAllOperation from './operations/ViewAllOperation';

import colors from '../config/colors';

const Tab = createBottomTabNavigator();

function BottomTabsScreen() {
  return (
    <SafeAreaView style={styles.container}>
        <Tab.Navigator>
            <Tab.Screen
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
            <Tab.Screen
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
        </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    splitter: {
      margin: 10,
      backgroundColor: 'gray',
      width: '100%',
      height: 1,
    }
});


export default BottomTabsScreen;