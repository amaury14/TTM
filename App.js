import React from 'react';
import { Dimensions, StyleSheet, SafeAreaView, StatusBar, Platform, View } from 'react-native';
import { useDimensions, useDeviceOrientation } from "@react-native-community/hooks";

export default function App() {
  const {landscape} = useDeviceOrientation();
  return (
    <SafeAreaView style={styles.container}>
      <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row'
      }}
      >
        <View
        style={{
          backgroundColor: 'dodgerblue',
          width: 100,
          height: 100
        }}
        ></View>
        <View
        style={{
          backgroundColor: 'gold',
          width: 100,
          height: 100
        }}
        ></View>
        <View
        style={{
          backgroundColor: 'tomato',
          width: 100,
          height: 100
        }}
        ></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
});
