import React from "react";
import { View, StyleSheet } from "react-native";
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { TDMContext } from "../screens/components/context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import firebase from "../../database/firebase";
import colors from '../config/colors';

export function DrawerContent(props) {

    const paperTheme = useTheme();

    const { toggleTheme } = React.useContext(TDMContext);

    const singOut = () => {
        firebase.firebase.auth().signOut();
    };

    return (
        <View style={styles.view1}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={styles.view2}>
                            <Avatar.Image
                                source={{
                                    uri: "https://api.adorable.io/avatars/50/abott@adorable.png",
                                }}
                                size={50}
                            />
                            <View style={styles.view3}>
                                <Title style={styles.title}></Title>
                                <Caption style={styles.caption}></Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>
                                </Paragraph>
                                <Caption style={styles.caption}></Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>
                                </Paragraph>
                                <Caption style={styles.caption}></Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name="home-outline" color={color} size={size} />
                            )}
                            label="Dashboard"
                            onPress={() => {
                                props.navigation.navigate("Dashboard");
                            }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name="account-outline" color={color} size={size} />
                            )}
                            label="Agregar Operación"
                            onPress={() => {
                                props.navigation.navigate("RegisterOperation");
                            }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name="settings-outline" color={color} size={size} />
                            )}
                            label="Settings"
                            onPress={() => {
                                // console.log("Settings");
                            }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name="account-check-outline" color={color} size={size} />
                            )}
                            label="Support"
                            onPress={() => {
                                // console.log("Support");
                            }}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple
                            onPress={() => {
                                toggleTheme();
                            }}
                        >
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark} />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon name="exit-to-app" color={color} size={size} />
                    )}
                    label="Sign Out"
                    onPress={() => {
                        singOut();
                    }}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomDrawerSection: {
        borderTopColor: colors.grayLigth,
        borderTopWidth: 1,
        marginBottom: 15,
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    drawerContent: {
        flex: 1,
    },
    drawerSection: {
        marginTop: 15,
    },
    paragraph: {
        fontWeight: "bold",
        marginRight: 3,
    },
    preference: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    row: {
        alignItems: "center",
        flexDirection: "row",
        marginTop: 20,
    },
    section: {
        alignItems: "center",
        flexDirection: "row",
        marginRight: 15,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 3,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    view1: {
        flex: 1
    },
    view2: {
        flexDirection: "row",
        marginTop: 15
    },
    view3: {
        flexDirection: "column",
        marginLeft: 15
    }
});
