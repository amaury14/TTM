import 'react-native-gesture-handler';
import mobileAds from 'react-native-google-mobile-ads';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Image, Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import AddNote from './app/screens/notes/AddNote';
import colors from './app/config/colors';
import BottomTabsScreen from './app/screens/BottomTabScreen';
import CompoundInterestScreen from './app/screens/CompoundInterestScreen';
import { DrawerContent } from './app/screens/DrawerContent';
import LoginScreen from './app/screens/LoginScreen';
import DetailsOperation from './app/screens/operations/DetailsOperation';
import NoteDetails from './app/screens/notes/NoteDetails';
import UpdateNote from './app/screens/notes/UpdateNote';
import UpdateOperation from './app/screens/operations/UpdateOperation';
import ViewAllOperation from './app/screens/operations/ViewAllOperation';
import TradingCalculatorScreen from './app/screens/TradingCalculatorScreen';
import firebase from './database/firebase';

// in App.js
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fab, far, fas);

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8958974719234949~7089830958';

export default function App() {
    let [state, setState] = useState({
        isLoggedIn: false,
        user: null
    });

    useEffect(() => {
        mobileAds()
            .initialize()
            .then((adapterStatuses) => {
                // console.log('🚀 ~ adapterStatuses:', adapterStatuses);
                // Initialization complete!
            });
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
        });
    }, []);

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
                                    <Image style={styles.logo} source={require('./app/assets/header-logo.png')} />
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
                        <Drawer.Screen
                            name="CompoundInterestScreen"
                            component={CompoundInterestScreen}
                            options={{
                                headerTitle: 'Interés Compuesto',
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
                            name="TradingCalculatorScreen"
                            component={TradingCalculatorScreen}
                            options={{
                                headerTitle: 'Calculadora de Trading',
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
                            name="AddNote"
                            component={AddNote}
                            initialParams={{ user: state?.user }}
                            options={{
                                headerTitle: 'Agregar Apunte',
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
                            name="UpdateNote"
                            component={UpdateNote}
                            options={{
                                headerTitle: 'Modificar Apunte',
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
                            name="NoteDetails"
                            component={NoteDetails}
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
                )}
                {/* <BannerAd
                    unitId={adUnitId}
                    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true
                    }}
                /> */}
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
