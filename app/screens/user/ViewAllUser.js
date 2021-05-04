import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import firebase from '../../../database/firebase';
import colors from '../../config/colors';

const ViewAllUser = () => {
  const [state, setState] = useState({
    users: [],
    loading: false
  });

  const handlePropChange = (name, value) => {
    setState({ ...state, [name]: value });
  }

  useEffect(() => {
    fetchUsers()
  }, []);

  const fetchUsers = async () => {
    try {
      handlePropChange('loading', true);
      let users = [];
      await firebase.fireDb.collection('users').onSnapshot(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          const { userName, userMail, userAddress, userPhone } = doc.data();
          users.push({ id: doc.id, userName, userMail, userAddress, userPhone });
        })
        handlePropChange('users', users);
      });
      handlePropChange('loading', false);
    } catch(error) {
      console.log(error)
    }
  }

  let listViewItemSeparator = () => {
    return (
      <View
        style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }}
      />
    );
  };

  let listItemView = (item) => {
    return (
      <View
        key={item.id}
        style={{ backgroundColor: 'white', padding: 20 }}>
        <Text>Id: {item.id}</Text>
        <Text>Nombre: {item.userName}</Text>
        <Text>Correo: {item.userMail}</Text>
        <Text># Celular: {item.userPhone}</Text>
        <Text>Dirección: {item.userAddress}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          {state.loading && <View style={styles.loader}>
              <ActivityIndicator size="large" color={colors.mainColor} />
          </View>}
          <FlatList
            data={state.users}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loader: {
    marginTop: 20
  }
});

export default ViewAllUser;