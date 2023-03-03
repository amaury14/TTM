import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import colors from '../../config/colors';

function TTMTabBar({ state, descriptors, navigation }) {
    const focusedOptions = descriptors?.[state?.routes?.[state.index]?.key]?.options;

    if (focusedOptions?.tabBarVisible === false) {
        return null;
    }

    return (
        <View style={styles.container}>
            {state?.routes?.map((route, index) => {
                const { options } = descriptors?.[route?.key];
                const label =
                    options?.headerTitle !== undefined
                        ? options?.headerTitle
                        : options?.title !== undefined
                        ? options?.title
                        : route?.name;

                const isFocused = state?.index === index;

                const onPress = () => {
                    const event = navigation?.emit({
                        type: 'tabPress',
                        target: route?.key,
                        canPreventDefault: true
                    });

                    if (!isFocused && !event?.defaultPrevented) {
                        navigation?.navigate(route?.name);
                    }
                };

                const onLongPress = () => {
                    navigation?.emit({
                        type: 'tabLongPress',
                        target: route?.key
                    });
                };

                const getIcon = (name) => {
                    switch (name) {
                        case 'DashboardScreen': {
                            return 'fa-table-cells-large';
                        }
                        case 'RegisterOperation': {
                            return 'fa-chart-line';
                        }
                        case 'SettingsScreen': {
                            return 'settings';
                        }
                        case 'FilterOperation': {
                            return 'filter';
                        }
                        case 'Notes': {
                            return 'file-text';
                        }
                    }
                };

                return (
                    <TouchableOpacity
                        key={route?.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options?.tabBarAccessibilityLabel}
                        testID={options?.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.bottomBar}
                    >
                        <FontAwesomeIcon
                            icon={getIcon(route?.name)}
                            size={25}
                            color={isFocused ? colors.mainColor : colors.gray}
                        />
                        <Text
                            style={{
                                color: isFocused ? colors.mainColor : colors.gray
                            }}
                        >
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    bottomBar: {
        alignItems: 'center',
        backgroundColor: colors.white,
        borderTopColor: colors.gray,
        flex: 1,
        padding: 5
    },
    container: {
        flexDirection: 'row',
        height: 60
    }
});

export default TTMTabBar;
