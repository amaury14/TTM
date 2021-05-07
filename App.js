import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import firebase from './database/firebase';
import colors from './app/config/colors';
import BottomTabsScreen from './app/screens/BottomTabScreen';
import LoginScreen from './app/screens/LoginScreen';
import DetailsOperation from './app/screens/operations/DetailsOperation';
import UpdateOperation from './app/screens/operations/UpdateOperation';
import ViewAllOperation from './app/screens/operations/ViewAllOperation';

const Stack = createStackNavigator();

export default function App() {
    let [state, setState] = useState({
        isLoggedIn: false,
        user: null
    });

    useEffect(
        () =>
            firebase.firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    setState({
                        user: {
                            id: user.uid,
                            gmail: user.email,
                            profile_picture: user.photoURL,
                            first_last_name: user.displayName
                        },
                        isLoggedIn: true
                    });
                } else {
                    setState({
                        user: null,
                        isLoggedIn: false
                    });
                }
            }),
        []
    );

    return (
        <SafeAreaView style={styles.container}>
            <NavigationContainer>
                {!state.isLoggedIn ? (
                    <Stack.Navigator>
                        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
                    </Stack.Navigator>
                ) : (
                    <Stack.Navigator>
                        <Stack.Screen
                            name="BottomTabsScreen"
                            component={BottomTabsScreen}
                            initialParams={{ user: state?.user }}
                            options={{
                                headerTitle: 'TTM - Diario de Trading',
                                headerLeft: () => null,
                                headerStyle: {
                                    backgroundColor: colors.mainColor
                                },
                                headerTintColor: '#fff',
                                headerTitleStyle: {
                                    fontWeight: 'bold'
                                }
                            }}
                        />
                        <Stack.Screen
                            name="UpdateOperation"
                            component={UpdateOperation}
                            options={{
                                title: 'Modificar Operación',
                                headerStyle: {
                                    backgroundColor: colors.mainColor
                                },
                                headerTintColor: '#fff',
                                headerTitleStyle: {
                                    fontWeight: 'bold'
                                }
                            }}
                        />
                        <Stack.Screen
                            name="ViewAllOperation"
                            component={ViewAllOperation}
                            options={{
                                title: 'Operaciones',
                                headerStyle: {
                                    backgroundColor: colors.mainColor
                                },
                                headerTintColor: '#fff',
                                headerTitleStyle: {
                                    fontWeight: 'bold'
                                }
                            }}
                        />
                        <Stack.Screen
                            name="DetailsOperation"
                            component={DetailsOperation}
                            options={{
                                title: 'Detalles',
                                headerStyle: {
                                    backgroundColor: colors.mainColor
                                },
                                headerTintColor: '#fff',
                                headerTitleStyle: {
                                    fontWeight: 'bold'
                                }
                            }}
                        />
                    </Stack.Navigator>
                )}
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
