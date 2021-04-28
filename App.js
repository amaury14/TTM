import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Button } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Button 
      title="Click Me"
      onPress={() => Alert.alert(
        'TDM',
        'Buttons tapped',
        [{text: "Yes", onPress: () => console.log("yes")},{text: "No", onPress: () => console.log("no")}])}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
