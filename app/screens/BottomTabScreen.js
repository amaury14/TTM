import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import colors from "../config/colors";
import TDMTabBar from "./components/TDMTabBar";
import DashboardScreen from "./DashboardScreen";
import RegisterOperation from "./operations/RegisterOperation";
import SettingsScreen from "./SettingsScreen";

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
                        title: "Dashboard",
                        headerStyle: {
                            backgroundColor: colors.mainColor,
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
                <Tab.Screen
                    name="RegisterOperation"
                    component={RegisterOperation}
                    initialParams={{ user: props.route.params.user }}
                    options={{
                        headerTitle: "Agregar Operación",
                        headerStyle: {
                            backgroundColor: colors.mainColor,
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
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
    body: {
        backgroundColor: "white",
        flex: 1,
        justifyContent: "center",
    },
    container: {
        flex: 1,
    },
    splitter: {
        backgroundColor: "gray",
        height: 1,
        margin: 10,
        width: "100%",
    },
});

export default BottomTabsScreen;
