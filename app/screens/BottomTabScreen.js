import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegisterOperation from './operations/RegisterOperation';
import DashboardScreen from './DashboardScreen';
import TDMTabBar from './components/TDMTabBar';

import colors from '../config/colors';

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