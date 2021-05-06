import React, { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import images from '../../assets';
import colors from '../../config/colors';
import TDMButtom from '../components/TDMButtom';

const DetailsOperation = (props) => {
  const { item, user } = props.route.params;

  const editOperation = () => {
        props.navigation.navigate('UpdateOperation', { id: item.id, user });
  };

  const getIcon = (pair) => {
    const pieces = pair.toString().toLowerCase().split("/");
    if (pieces.length === 1) {
      const image1 = images.logos[pieces[0]];
      return (
        <View style={styles.row}>
          {!!image1 && (
            <Image style={styles.tinyLogo} source={images.logos[pieces[0]]} />
          )}
          {!image1 && (
            <Text style={styles.pair}>{pieces[0].toUpperCase()}</Text>
          )}
        </View>
      );
    } else if (pieces.length === 2) {
      const image1 = images.logos[pieces[0]];
      const image2 = images.logos[pieces[1]];
      return (
        <View style={styles.row}>
          {!!image1 && (
            <Image style={styles.tinyLogo} source={images.logos[pieces[0]]} />
          )}
          {!image1 && (
            <Text style={styles.pair}>{pieces[0].toUpperCase()}</Text>
          )}

          <Text style={styles.coinSplitter}>/</Text>

          {!!image2 && (
            <Image style={styles.tinyLogo} source={images.logos[pieces[1]]} />
          )}
          {!image2 && (
            <Text style={styles.pair}>{pieces[1].toUpperCase()}</Text>
          )}
        </View>
      );
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
            {getIcon(item.pairCoin)}
        </View>
        <View style={styles.postContent}>
            <View style={styles.row}>
                <View style={styles.column2}>
                    <Text style={styles.postTitle}>{item.pairCoin.toUpperCase() ?? '-'}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.label}>Inversión</Text>
                    <Text style={styles.postTitle}>$ {item.investment ?? '-'}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.label}>% Rendimiento</Text>
                    <Text style={styles.postTitle}>{item.profitPercent ?? '-'}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.label}>Grillas</Text>
                    <Text style={styles.postTitle}>{item.grids ?? '-'}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.column2}>
                    <Text style={styles.label}>Notas</Text>
                    <Text style={styles.postDescription}>{item.notes}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.label}>Lower Limit</Text>
                    <Text style={styles.postTitle}>{item.lowerLimit ?? '-'}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.label}>Trigger Price</Text>
                    <Text style={styles.postTitle}>{item.triggerPrice ?? '-'}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.label}>Upper Limit</Text>
                    <Text style={styles.postTitle}>{item.upperLimit ?? '-'}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.label}>Stop Loss</Text>
                    <Text style={styles.postTitle}>{item.stopLoss ?? '-'}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.label}>Take Profit</Text>
                    <Text style={styles.postTitle}>{item.takeProfit ?? '-'}</Text>
                </View>
            </View>
            <TDMButtom title="Modificar Operación" customClick={() => editOperation()} />

          {/* <Text style={styles.tags}></Text>

          <Text style={styles.date}></Text>

          <View style={styles.profile}>
            <Image
              style={styles.avatar}
              source={{
                uri: "https://bootdey.com/img/Content/avatar/avatar1.png",
              }}
            />
            <Text style={styles.name}>Johan Doe</Text>
          </View>
          
          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.shareButtonText}>Like</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  column: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: 120,
  },
  column2: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  header: {
    padding: 15,
    alignItems: "center",
    backgroundColor: colors.mainColor,
  },
  headerTitle: {
    color: "#FFFFFF",
  },
  label: {
    color: colors.mainColor,
    fontWeight: "900",
    fontSize: 14,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  postContent: {
    flex: 1,
    padding: 30,
  },
  postTitle: {
    fontSize: 26,
    fontWeight: "600",
  },
  postDescription: {
    fontSize: 18,
    marginBottom: 10,
  },
  tags: {
    color: "#00BFFF",
    marginTop: 10,
  },
  date: {
    color: "#696969",
    marginTop: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: "#00BFFF",
  },
  profile: {
    flexDirection: "row",
    marginTop: 20,
  },
  name: {
    fontSize: 22,
    color: "#00BFFF",
    fontWeight: "600",
    alignSelf: "center",
    marginLeft: 10,
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },

  coinSplitter: {
    fontWeight: "bold",
    fontSize: 45,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 8
  },
  pair: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 15.5,
  },
});

export default DetailsOperation;
