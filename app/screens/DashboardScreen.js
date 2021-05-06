import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, StyleSheet, View } from 'react-native';

import colors from '../config/colors';
import TDMDashboard from './components/TDMDashboard';
import ViewAllOperation from './operations/ViewAllOperation';

const DashboardScreen = (props) => {
  const user = props.route.params.user;

  const handleBackButton = () => {
    Alert.alert('Advertencia', 'Está seguro de salir de la aplicación?',
      [
        { text: 'Cancelar' },
        { text: 'Aceptar', onPress: () => BackHandler.exitApp() }
      ],
      { cancelable: false }
    );
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => backHandler.remove();
  }, []);
  
  return (
    <View style={styles.body}>
      <LinearGradient
        colors={[
          colors.mainColor,
          colors.mainColor,
          colors.mainColor,
          colors.white,
          colors.white,
        ]}
        style={styles.background}
      >
        <TDMDashboard user={user} />
        <View style={styles.splitter} />
        <ViewAllOperation user={user} />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  splitter: {
    margin: 10,
    backgroundColor: colors.white,
    height: 1,
    width: 370,
  },
});

export default DashboardScreen;
