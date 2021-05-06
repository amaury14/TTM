import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";

import firebase from "../../../database/firebase";
import colors from "../../config/colors";

const TDMDashboard = (props) => {
    const navigation = useNavigation();
    const user = props.user;

    const [state, setState] = useState({
        operations: [],
        negatives: 0,
        positives: 0,
        total: 0,
        performancePercentReal: 0,
        performancePercent: 0,
        loading: true,
    });

    // Refreshing data on component focus
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            fetchOperations();
        });
        return unsubscribe;
    }, [navigation]);

    // Update data on enter to component
    useEffect(() => {
        fetchOperations();
    }, []);

    const handlePropChange = (name, value) => {
        setState({ ...state, [name]: value });
    };

    const getProfitPercent = (number) => {
        return isNaN(number.toFixed(2)) ? "-" : `${number.toFixed(2)}%`;
    };

    const fetchOperations = async () => {
        try {
            handlePropChange("loading", true);
            await firebase.fireDb
                .collection("operations")
                .where("opState", "==", "2")
                .where("userId", "==", user.id)
                .onSnapshot((querySnapshot) => {
                    let operations = [];
                    let positives = 0;
                    let negatives = 0;
                    let totalPerformance = 0;
                    let total = querySnapshot?.docs?.length;
                    querySnapshot.docs.forEach((doc) => {
                        const { ...data } = doc.data();
                        operations.push({ id: doc.id, ...data });
                        if (data.profitPercent !== "") {
                            totalPerformance += parseInt(data.profitPercent);
                            if (parseInt(data.profitPercent) > 0) {
                                positives++;
                            } else {
                                negatives++;
                            }
                        }
                    });
                    setState({
                        ...state,
                        operations,
                        positives,
                        negatives,
                        total,
                        performancePercentReal: totalPerformance / operations?.length,
                        performancePercent: totalPerformance / operations?.length / 100,
                    });
                });
            handlePropChange("loading", false);
        } catch (error) {
            // Catch error
        }
    };

    const signOut = () => {
        firebase.firebase.auth().signOut();
    };

    return (
        <View>
            {!state.loading && (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.white} />
                </View>
            )}
            {state.operations && (
                <View style={styles.card}>
                    <View style={styles.corner}>
                        <Icon
                            name="power"
                            type="feather"
                            size={30}
                            color={colors.red}
                            onPress={() => signOut()}
                        />
                    </View>
                    <View style={styles.row2}>
                        <Text style={styles.label}>Operaciones</Text>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={styles.label}>Total</Text>
                            <Text style={styles.valueBigWhite}>{state.total}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.label}>Positivas</Text>
                            <Text style={styles.valueBigGreen}>{state.positives}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.label}>Negativas</Text>
                            <Text style={styles.valueBigRed}>{state.negatives}</Text>
                        </View>
                        <View style={styles.columnLong}>
                            <Text style={styles.label}>Rango</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.columnLong}>
                            <Text style={styles.label}>% Rendimiento</Text>
                            <View style={styles.row2}>
                                <Text style={styles.value}>
                                    {getProfitPercent(state.performancePercentReal)}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.columnLong}>
                            <Text style={styles.label}>Negativas</Text>
                            <Text style={styles.value}>{state.negatives}</Text>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: 8,
        elevation: 11,
        height: 160,
        marginBottom: 8,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 8,
        padding: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        width: 380,
    },
    column: {
        alignItems: "flex-start",
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    columnLong: {
        flexDirection: "column",
        width: 150,
    },
    corner: {
        position: "absolute",
        right: 4,
        top: 4,
    },
    label: {
        color: colors.mainColor,
        fontSize: 14,
        fontWeight: "900",
    },
    loader: {
        marginTop: 20,
    },
    row: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    row2: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    value: {
        color: colors.mainColor,
        fontSize: 15,
        fontWeight: "bold",
        marginLeft: 5,
    },
    valueBigGreen: {
        color: colors.secondary,
        fontSize: 30,
        fontWeight: "bold",
    },
    valueBigRed: {
        color: colors.red,
        fontSize: 30,
        fontWeight: "bold",
    },
    valueBigWhite: {
        color: colors.white,
        fontSize: 30,
        fontWeight: "bold",
    },
});

export default TDMDashboard;
