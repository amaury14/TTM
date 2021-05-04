import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import colors from '../config/colors';
import TDMTabBar from './components/TDMTabBar';
import DashboardScreen from './DashboardScreen';
import RegisterOperation from './operations/RegisterOperation';

const Tab = createBottomTabNavigator();

function BottomTabsScreen() {
  return (
    <SafeAreaView style={styles.container}>
        <Tab.Navigator tabBar={props => <TDMTabBar {...props} />}>
            <Tab.Screen
                name="DashboardScreen"
                component={DashboardScreen}
                options={{
                    title: 'Dashboard',
                    headerStyle: {
                    backgroundColor: colors.mainColor,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                    fontWeight: 'bold',
                    },
                }}
            />
            <Tab.Screen
                name="RegisterOperation"
                component={RegisterOperation}
                options={{
                    title: 'Agregar Operación',
                    headerStyle: {
                    backgroundColor: colors.mainColor,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                    fontWeight: 'bold',
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