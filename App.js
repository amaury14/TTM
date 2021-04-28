import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';

export default function App() {
  const handlePress = () => console.log('Pressed');
  return (
    <SafeAreaView style={styles.container}>
      <Text numberOfLines={1} onPress={handlePress}>Hello new React Native App!</Text>
      <TouchableOpacity>
        <Image
        fadeDuration={2000}
        source={{
          width: 200,
          height: 300,
          uri: "https://picsum.photos/200/300"}}/>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
