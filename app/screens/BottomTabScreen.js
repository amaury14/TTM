import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import colors from '../config/colors';
import TTMTabBar from './components/TTMTabBar';
import DashboardScreen from './DashboardScreen';
import FilterOperation from './operations/FilterOperation';
import RegisterOperation from './operations/RegisterOperation';
// import SettingsScreen from "./SettingsScreen";

const DashboardStack = createStackNavigator();
const FilterOperationStack = createStackNavigator();
const RegisterOperationStack = createStackNavigator();

const Tab = createBottomTabNavigator();

function BottomTabsScreen(props) {
    return (
        <SafeAreaView style={styles.container}>
            <Tab.Navigator tabBar={(props) => <TTMTabBar {...props} />}>
                <Tab.Screen
                    name="DashboardScreen"
                    component={DashboardStackScreen}
                    initialParams={{ user: props?.route?.params?.user }}
                    options={{
                        headerTitle: 'Dashboard'
                    }}
                />
                <Tab.Screen
                    name="RegisterOperation"
                    component={RegisterOperationStackScreen}
                    initialParams={{ user: props?.route?.params?.user }}
                    options={{
                        headerTitle: 'Agregar Op'
                    }}
                />
                <Tab.Screen
                    name="FilterOperation"
                    component={FilterOperationStackScreen}
                    initialParams={{ user: props?.route?.params?.user }}
                    options={{
                        headerTitle: 'Filtrar Op'
                    }}
                />
                {/* <Tab.Screen
                    name="DashboardScreen"
                    component={DashboardScreen}
                    initialParams={{ user: props?.route?.params?.user }}
                    options={{
                        title: 'Dashboard',
                        headerStyle: {
                            backgroundColor: colors.mainColor
                        },
                        headerTintColor: colors.white,
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        }
                    }}
                />
                <Tab.Screen
                    name="RegisterOperation"
                    component={RegisterOperation}
                    initialParams={{ user: props?.route?.params?.user }}
                    options={{
                        headerTitle: 'Agregar Op',
                        headerStyle: {
                            backgroundColor: colors.mainColor
                        },
                        headerTintColor: colors.white,
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        }
                    }}
                />
                <Tab.Screen
                    name="FilterOperation"
                    component={FilterOperation}
                    initialParams={{ user: props?.route?.params?.user }}
                    options={{
                        headerTitle: 'Filtrar Ops',
                        headerStyle: {
                            backgroundColor: colors.mainColor
                        },
                        headerTintColor: colors.white,
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        }
                    }}
                />
                <Tab.Screen
                    name="SettingsScreen"
                    component={SettingsScreen}
                    initialParams={{ user: props?.route?.params?.user }}
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
        flex: 1
    },
    menu: {
        marginLeft: 20
    }
});

export default BottomTabsScreen;

const DashboardStackScreen = (props) => (
    <DashboardStack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: colors.mainColor
            },
            headerTintColor: colors.white,
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }}
    >
        <DashboardStack.Screen
            name="DashboardScreen"
            component={DashboardScreen}
            initialParams={{ user: props?.route?.params?.user }}
            options={{
                headerTitle: 'Dashboard',
                headerStyle: {
                    backgroundColor: colors.mainColor
                },
                headerTintColor: colors.white,
                headerTitleStyle: {
                    fontWeight: 'bold'
                },
                // eslint-disable-next-line react/display-name
                headerLeft: () => (
                    <TouchableOpacity style={styles.menu} onPress={() => props?.navigation?.openDrawer()}>
                        <Icon name="menu" size={30} type="feather" color={colors.white} />
                    </TouchableOpacity>
                )
            }}
        />
    </DashboardStack.Navigator>
);

const RegisterOperationStackScreen = (props) => (
    <RegisterOperationStack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: colors.mainColor
            },
            headerTintColor: colors.white,
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }}
    >
        <RegisterOperationStack.Screen
            name="RegisterOperation"
            component={RegisterOperation}
            initialParams={{ user: props?.route?.params?.user }}
            options={{
                headerTitle: 'Agregar Operación',
                headerStyle: {
                    backgroundColor: colors.mainColor
                },
                headerTintColor: colors.white,
                headerTitleStyle: {
                    fontWeight: 'bold'
                },
                // eslint-disable-next-line react/display-name
                headerLeft: () => (
                    <TouchableOpacity style={styles.menu} onPress={() => props?.navigation?.openDrawer()}>
                        <Icon name="menu" size={30} type="feather" color={colors.white} />
                    </TouchableOpacity>
                )
            }}
        />
    </RegisterOperationStack.Navigator>
);

const FilterOperationStackScreen = (props) => (
    <FilterOperationStack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: colors.mainColor
            },
            headerTintColor: colors.white,
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }}
    >
        <FilterOperationStack.Screen
            name="FilterOperation"
            component={FilterOperation}
            initialParams={{ user: props?.route?.params?.user }}
            options={{
                headerTitle: 'Filtrar Operaciones',
                headerStyle: {
                    backgroundColor: colors.mainColor
                },
                headerTintColor: colors.white,
                headerTitleStyle: {
                    fontWeight: 'bold'
                },
                // eslint-disable-next-line react/display-name
                headerLeft: () => (
                    <TouchableOpacity style={styles.menu} onPress={() => props?.navigation?.openDrawer()}>
                        <Icon name="menu" size={30} type="feather" color={colors.white} />
                    </TouchableOpacity>
                )
            }}
        />
    </FilterOperationStack.Navigator>
);
