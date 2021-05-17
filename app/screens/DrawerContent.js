import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Avatar, Caption, Drawer, Text, Title } from 'react-native-paper';

import firebase from '../../database/firebase';
import colors from '../config/colors';

export function DrawerContent(props) {
    const user = props?.user;
    const pjson = require('../../package.json');

    const singOut = () => {
        firebase.firebase.auth().signOut();
    };

    return (
        <LinearGradient
            colors={[colors.mainColor, colors.mainColor, colors.mainColor, colors.white, colors.white]}
            style={styles.background}
        >
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
                                icon={() => <Icon name="grid" size={30} type="feather" color={colors.white} />}
                                label={() => <Text style={styles.drawerItem}>Dashboard</Text>}
                                onPress={() => props?.navigation?.navigate('DashboardScreen')}
                            />
                            <DrawerItem
                                icon={() => <Icon name="activity" size={30} type="feather" color={colors.white} />}
                                label={() => <Text style={styles.drawerItem}>Agregar Operación</Text>}
                                onPress={() => props?.navigation?.navigate('RegisterOperation')}
                            />
                            <DrawerItem
                                icon={() => <Icon name="filter" size={30} type="feather" color={colors.white} />}
                                label={() => <Text style={styles.drawerItem}>Filtrar Operaciones</Text>}
                                onPress={() => props?.navigation?.navigate('FilterOperation')}
                            />
                            {/* <DrawerItem
                                icon={() => (
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
                        icon={() => <Icon name="log-out" size={30} type="feather" color={colors.gray2} />}
                        label={() => <Text style={styles.drawerItemBottom}>Cerrar sesión</Text>}
                        onPress={() => singOut()}
                    />
                </Drawer.Section>
                <View style={styles.row}>
                    <View style={styles.section}>
                        <Text style={styles.version}>Versión: {pjson?.version}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.section}>
                        <Text style={styles.version}>® Todos los derechos reservados.</Text>
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    background: {
        height: '100%',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0
    },
    bottomDrawerSection: {
        borderTopColor: colors.grayLigth,
        borderTopWidth: 2,
        marginBottom: 5
    },
    caption: {
        color: colors.white,
        fontSize: 14,
        lineHeight: 14
    },
    drawerContent: {
        flex: 1
    },
    drawerItem: {
        color: colors.white,
        fontSize: 18,
        marginLeft: -15
    },
    drawerItemBottom: {
        color: colors.gray2,
        fontSize: 18,
        marginLeft: -15
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
    row: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    section: {
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 20
    },
    title: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 3
    },
    userInfoSection: {
        paddingLeft: 20
    },
    version: {
        color: colors.gray2,
        fontSize: 13,
        marginBottom: 2
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
        marginLeft: 8
    }
});
