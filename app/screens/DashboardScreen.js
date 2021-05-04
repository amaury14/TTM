import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import firebase from '../../database/firebase';
import colors from '../config/colors';
import TDMButtom from './components/TDMButtom';
import TDMDashboard from './components/TDMDashboard';
import ViewAllOperation from './operations/ViewAllOperation';

const DashboardScreen = ({navigation}) => {

  const [state, setState] = useState({
    user: null
  });
  const [loading, setLoading] = useState(true);

  const handlePropChange = (name, value) => {
    setState({ ...state, [name]: value });
  }

  useEffect(() => {
    fetchUser();
  }, []);

  // Refreshing data on component focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUser();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchUser = async () => {
    try {
      let users = [];
      await firebase.fireDb.collection('users').onSnapshot(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          const { ...data } = doc.data();
          users.push({ id: doc.id, ...data });
        })
        handlePropChange('user', users[0]);
      });
      setLoading(false);
    } catch(error) {
      console.log(error)
    }
  }

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color={colors.mainColor} />
      </View>
    );
  }

  return (
      <View style={styles.body}>
          <LinearGradient
          colors={[colors.mainColor, colors.mainColor, colors.mainColor, colors.white, colors.white]}
          style={styles.background}
          >
            <TDMDashboard></TDMDashboard>
            {/* <TDMButtom
              title="Register User"
              customClick={() => navigation.navigate('Register')}
            />
            <TDMButtom
              title="Update User"
              customClick={() => navigation.navigate('UpdateUser', { id: state.user.id })}
            /> */}
            {/* <TDMButtom
              title="View All Users"
              customClick={() => navigation.navigate('ViewAll')}
            /> */}
            <TDMButtom
              title="Salir"
              customClick={() => firebase.firebase.auth().signOut()}
            />
            {/* <TDMButtom
              title="Register Operation"
              customClick={() => navigation.navigate('RegisterOperation')}
            /> */}
            <View style={styles.splitter}></View>
            <ViewAllOperation></ViewAllOperation>
          </LinearGradient>
      </View>
  );
};

const styles = StyleSheet.create({
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: '100%',
    },
    container: {
        flex: 1,
    },
    body: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: colors.white,
    },
    splitter: {
      margin: 10,
      backgroundColor: colors.gray,
      height: 1,
      width: 370,
    }
});

export default DashboardScreen;
