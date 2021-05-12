import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Image, Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import firebase from './database/firebase';
import colors from './app/config/colors';
import BottomTabsScreen from './app/screens/BottomTabScreen';
import LoginScreen from './app/screens/LoginScreen';
import DetailsOperation from './app/screens/operations/DetailsOperation';
import UpdateOperation from './app/screens/operations/UpdateOperation';
import ViewAllOperation from './app/screens/operations/ViewAllOperation';
import { DrawerContent } from './app/screens/DrawerContent';

const Drawer = createDrawerNavigator();
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
                            id: user?.uid,
                            gmail: user?.email,
                            profile_picture: user?.photoURL,
                            first_last_name: user?.displayName
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
                    <Drawer.Navigator drawerContent={(props) => <DrawerContent user={state?.user} {...props} />}>
                        <Drawer.Screen
                            name="BottomTabsScreen"
                            component={BottomTabsScreen}
                            initialParams={{ user: state?.user }}
                            options={{
                                headerTitle: 'TTM - Diario de Trading',
                                // eslint-disable-next-line react/display-name
                                headerLeft: () => (
                                    <Image style={styles.logo} source={require('./app/assets/rocket.png')} />
                                ),
                                headerStyle: {
                                    backgroundColor: colors.mainColor
                                },
                                headerTintColor: colors.white,
                                headerTitleStyle: {
                                    fontWeight: 'bold'
                                }
                            }}
                        />
                        <Drawer.Screen
                            name="UpdateOperation"
                            component={UpdateOperation}
                            options={{
                                headerTitle: 'Modificar Operación',
                                headerStyle: {
                                    backgroundColor: colors.mainColor
                                },
                                headerTintColor: colors.white,
                                headerTitleStyle: {
                                    fontWeight: 'bold'
                                }
                            }}
                        />
                        <Drawer.Screen
                            name="ViewAllOperation"
                            component={ViewAllOperation}
                            options={{
                                headerTitle: 'Operaciones',
                                headerStyle: {
                                    backgroundColor: colors.mainColor
                                },
                                headerTintColor: colors.white,
                                headerTitleStyle: {
                                    fontWeight: 'bold'
                                }
                            }}
                        />
                        <Drawer.Screen
                            name="DetailsOperation"
                            component={DetailsOperation}
                            options={{
                                headerTitle: 'Detalles',
                                headerStyle: {
                                    backgroundColor: colors.mainColor
                                },
                                headerTintColor: colors.white,
                                headerTitleStyle: {
                                    fontWeight: 'bold'
                                }
                            }}
                        />
                    </Drawer.Navigator>
                    // <Stack.Navigator>
                    //     <Stack.Screen
                    //         name="BottomTabsScreen"
                    //         component={BottomTabsScreen}
                    //         initialParams={{ user: state?.user }}
                    //         options={{
                    //             headerTitle: 'TTM - Diario de Trading',
                    //             // eslint-disable-next-line react/display-name
                    //             headerLeft: () => (
                    //                 <Image style={styles.logo} source={require('./app/assets/rocket.png')} />
                    //             ),
                    //             headerStyle: {
                    //                 backgroundColor: colors.mainColor
                    //             },
                    //             headerTintColor: colors.white,
                    //             headerTitleStyle: {
                    //                 fontWeight: 'bold'
                    //             }
                    //         }}
                    //     />
                    //     <Stack.Screen
                    //         name="UpdateOperation"
                    //         component={UpdateOperation}
                    //         options={{
                    //             title: 'Modificar Operación',
                    //             headerStyle: {
                    //                 backgroundColor: colors.mainColor
                    //             },
                    //             headerTintColor: colors.white,
                    //             headerTitleStyle: {
                    //                 fontWeight: 'bold'
                    //             }
                    //         }}
                    //     />
                    //     <Stack.Screen
                    //         name="ViewAllOperation"
                    //         component={ViewAllOperation}
                    //         options={{
                    //             title: 'Operaciones',
                    //             headerStyle: {
                    //                 backgroundColor: colors.mainColor
                    //             },
                    //             headerTintColor: colors.white,
                    //             headerTitleStyle: {
                    //                 fontWeight: 'bold'
                    //             }
                    //         }}
                    //     />
                    //     <Stack.Screen
                    //         name="DetailsOperation"
                    //         component={DetailsOperation}
                    //         options={{
                    //             title: 'Detalles',
                    //             headerStyle: {
                    //                 backgroundColor: colors.mainColor
                    //             },
                    //             headerTintColor: colors.white,
                    //             headerTitleStyle: {
                    //                 fontWeight: 'bold'
                    //             }
                    //         }}
                    //     />
                    // </Stack.Navigator>
                )}
            </NavigationContainer>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    logo: {
        height: 40,
        marginLeft: 15,
        width: 40
    }
});
