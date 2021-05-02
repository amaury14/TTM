import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

import colors from '../../config/colors';

function TDMTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const getIcon = (name) => {
            switch (name) {
                case 'DashboardScreen': {
                    return 'grid';
                }
                case 'RegisterOperation': {
                    return 'activity';
                }
            };
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.bottomBar}
          > 
            <Icon
            name={getIcon(route.name)}
            size={40}
            type='feather'
            color={isFocused ? colors.mainColor : colors.gray } />
            <Text style={{
                color: isFocused ? colors.mainColor : colors.gray
            }}>
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
        flex: 1,
        alignItems: 'center',
        borderTopColor: colors.gray,
        backgroundColor: colors.white,
        padding: 5,
    }
});

export default TDMTabBar;