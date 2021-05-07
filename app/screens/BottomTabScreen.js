import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import colors from '../config/colors';
import TDMTabBar from './components/TDMTabBar';
import DashboardScreen from './DashboardScreen';
import FilterOperation from './operations/FilterOperation';
import RegisterOperation from './operations/RegisterOperation';
// import SettingsScreen from "./SettingsScreen";

const Tab = createBottomTabNavigator();

function BottomTabsScreen(props) {
    return (
        <SafeAreaView style={styles.container}>
            <Tab.Navigator tabBar={(props) => <TDMTabBar {...props} />}>
                <Tab.Screen
                    name="DashboardScreen"
                    component={DashboardScreen}
                    initialParams={{ user: props.route.params.user }}
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
                    initialParams={{ user: props.route.params.user }}
                    options={{
                        headerTitle: 'Agregar Op',
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
                    name="FilterOperation"
                    component={FilterOperation}
                    initialParams={{ user: props.route.params.user }}
                    options={{
                        headerTitle: 'Filtrar Ops',
                        headerStyle: {
                            backgroundColor: colors.mainColor,
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
                {/* <Tab.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          initialParams={{ user: props.route.params.user }}
          options={{
            headerTitle: "Configuración",
            headerStyle: {
              backgroundColor: colors.mainColor,
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        /> */}
            </Tab.Navigator>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default BottomTabsScreen;
