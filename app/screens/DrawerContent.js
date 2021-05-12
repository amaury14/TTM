import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Caption, Drawer, Title } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';

import firebase from '../../database/firebase';
import colors from '../config/colors';

export function DrawerContent(props) {
    const user = props?.user;

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
                                    uri: user?.profile_picture
                                }}
                                size={50}
                            />
                            <View style={styles.view3}>
                                <Title style={styles.title}>{user?.first_last_name}</Title>
                                <Caption style={styles.caption}>{user?.gmail}</Caption>
                            </View>
                        </View>

                        {/* <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}></Paragraph>
                                <Caption style={styles.caption}></Caption>
                            </View>
                        </View> */}
                        {/* <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}></Paragraph>
                                <Caption style={styles.caption}></Caption>
                            </View>
                        </View> */}
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => <Icon name="grid" size={size} type="feather" color={color} />}
                            label="Dashboard"
                            onPress={() => props?.navigation?.navigate('DashboardScreen')}
                        />
                        <DrawerItem
                            icon={({ color, size }) => <Icon name="activity" size={size} type="feather" color={color} />}
                            label="Agregar Operación"
                            onPress={() => props?.navigation?.navigate('RegisterOperation')}
                        />
                        <DrawerItem
                            icon={({ color, size }) => <Icon name="filter" size={size} type="feather" color={color} />}
                            label="Filtrar Operación"
                            onPress={() => props?.navigation?.navigate('FilterOperation')}
                        />
                        {/* <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name="settings" size={size} type="feather" color={color} />
                            )}
                            label="Configuración"
                            onPress={() => {
                                console.log(props);
                            }}
                        /> */}
                    </Drawer.Section>
                    {/* <Drawer.Section title="Preferences">
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
                    </Drawer.Section> */}
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => <Icon name="log-out" size={size} type="feather" color={color} />}
                    label="Cerrar sesión"
                    onPress={() => singOut()}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomDrawerSection: {
        borderTopColor: colors.grayLigth,
        borderTopWidth: 1,
        marginBottom: 15
    },
    caption: {
        fontSize: 14,
        lineHeight: 14
    },
    drawerContent: {
        flex: 1
    },
    drawerSection: {
        marginTop: 15
    },
    // paragraph: {
    //     fontWeight: 'bold',
    //     marginRight: 3
    // },
    // preference: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     paddingHorizontal: 16,
    //     paddingVertical: 12
    // },
    // row: {
    //     alignItems: 'center',
    //     flexDirection: 'row',
    //     marginTop: 20
    // },
    // section: {
    //     alignItems: 'center',
    //     flexDirection: 'row',
    //     marginRight: 15
    // },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 3
    },
    userInfoSection: {
        paddingLeft: 20
    },
    view1: {
        flex: 1
    },
    view2: {
        flexDirection: 'row',
        marginTop: 15
    },
    view3: {
        flexDirection: 'column',
        marginLeft: 15
    }
});
