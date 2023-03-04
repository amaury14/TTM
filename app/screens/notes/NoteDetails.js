import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import TTMButtom from '../components/TTMButtom';
import TTMHeader from '../components/TTMHeader';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8958974719234949/7113047539';

const NoteDetails = (props) => {
    const { item, user } = props?.route?.params;

    const editNote = () => {
        props?.navigation?.navigate('UpdateNote', { id: item?.id, user });
    };

    const getValue = (value) => {
        return !value || value === '' ? '-' : value;
    };

    return (
        <View style={styles.container}>
            <TTMHeader text={getValue(item?.title)} />
            <View style={styles.postContent}>
                <TTMButtom style={styles.button} title="Modificar Apunte" customClick={() => editNote()} />
                <ScrollView>
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={styles.postDescription}>{getValue(item?.note)}</Text>
                        </View>
                    </View>
                </ScrollView>
                <BannerAd
                    unitId={adUnitId}
                    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        marginBottom: 10
    },
    column: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    container: {
        flex: 1
    },
    postContent: {
        flex: 1,
        padding: 20
    },
    postDescription: {
        fontSize: 18,
        marginBottom: 10
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 8
    }
});

export default NoteDetails;
