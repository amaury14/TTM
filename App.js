import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import colors from './app/config/colors';
import BottomTabsScreen from './app/screens/BottomTabScreen';
import LoginScreen from './app/screens/LoginScreen';
import UpdateOperation from './app/screens/operations/UpdateOperation';
import ViewAllOperation from './app/screens/operations/ViewAllOperation';
import DetailsOperation from './app/screens/operations/DetailsOperation';

const Stack = createStackNavigator();

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="LoginScreen"
                        component={LoginScreen}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="BottomTabsScreen"
                        component={BottomTabsScreen}
                        options={{
                            headerTitle: 'To The Moon',
                            headerLeft: () => null,
                            headerStyle: {
                                backgroundColor: colors.mainColor,
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />
                    <Stack.Screen
                        name="UpdateOperation"
                        component={UpdateOperation}
                        options={{
                            title: 'Modificar Operación',
                            headerStyle: {
                                backgroundColor: colors.mainColor,
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />
                    <Stack.Screen
                        name="ViewAllOperation"
                        component={ViewAllOperation}
                        options={{
                            title: 'Operaciones',
                            headerStyle: {
                                backgroundColor: colors.mainColor,
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />
                    <Stack.Screen
                        name="DetailsOperation"
                        component={DetailsOperation}
                        options={{
                            title: 'Detalles',
                            headerStyle: {
                                backgroundColor: colors.mainColor,
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />
                    {/* <Stack.Screen
                        name="Register"
                        component={RegisterUser}
                        options={{
                            title: 'Agregar Usuario',
                            headerStyle: {
                                backgroundColor: colors.mainColor,
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />
                    <Stack.Screen
                        name="UpdateUser"
                        component={UpdateUser}
                        options={{
                            title: 'Modificar Usuario',
                            headerStyle: {
                                backgroundColor: colors.mainColor,
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />         
                    <Stack.Screen
                        name="ViewAll"
                        component={ViewAllUser}
                        options={{
                            title: 'Usuarios',
                            headerStyle: {
                                backgroundColor: colors.mainColor,
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />  */}
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    }
});
