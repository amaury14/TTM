import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import colors from '../../config/colors';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8958974719234949/7113047539';

const NoteCard = (props) => {
    const item = props?.item;

    const getDate = () => {
        const start = item?.date ? new Date(item?.date)?.toLocaleDateString() : '...';
        return `${start}`;
    };

    const getValue = (value) => {
        return !value || value === '' ? '-' : value;
    };

    const getNoteValue = (value) => {
        return !value || value === '' ? '-' : `${value?.substring(0, 50)} ...`;
    };

    return (
        <View>
            {item && (
                <View key={item?.op_id} style={styles.card}>
                    <View style={styles.column1}>
                        <View style={styles.row}>
                            <Text style={styles.label}>{getValue(item?.title)}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.value}>{getNoteValue(item?.note)}</Text>
                        </View>
                    </View>
                    <View style={styles.column2}>
                        <TouchableOpacity style={styles.button} onPress={props?.updateClick}>
                            <FontAwesomeIcon icon="edit" color={colors.mainColor} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={props?.deleteClick}>
                            <FontAwesomeIcon icon="trash-2" color={colors.red} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dates}>
                        <Text style={styles.investment}>{getDate()}</Text>
                    </View>
                    <BannerAd
                        unitId={adUnitId}
                        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                        requestOptions={{
                            requestNonPersonalizedAdsOnly: true
                        }}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: colors.gray,
        borderRadius: 8,
        color: colors.white,
        marginRight: 2,
        padding: 3,
        width: 30
    },
    card: {
        flexDirection: 'row',
        flex: 1,
        width: 380,
        backgroundColor: colors.white,
        padding: 10,
        marginTop: 8,
        marginBottom: 8,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 8,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        minHeight: 88
    },
    column1: {
        flexDirection: 'column',
        marginRight: 3,
        width: '90%'
    },
    column2: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '10%'
    },
    dates: {
        left: 12,
        position: 'absolute',
        top: 68
    },
    investment: {
        color: colors.investment,
        fontSize: 15,
        fontWeight: 'bold'
    },
    label: {
        color: colors.black,
        fontSize: 17,
        fontWeight: 'bold'
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    value: {
        color: colors.value,
        fontSize: 15,
        fontWeight: 'bold',
        overflow: 'hidden'
    }
});

export default NoteCard;
