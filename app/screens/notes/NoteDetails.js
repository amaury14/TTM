import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import colors from '../../config/colors';
import TTMButtom from '../components/TTMButtom';

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
            <Text style={styles.header}>{getValue(item?.title)}</Text>
            <View style={styles.postContent}>
                <TTMButtom style={styles.button} title="Modificar Nota" customClick={() => editNote()} />
                <ScrollView>
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={styles.postDescription}>{getValue(item?.note)}</Text>
                        </View>
                    </View>
                </ScrollView>
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
    header: {
        alignItems: 'center',
        backgroundColor: colors.mainColor,
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold',
        padding: 15
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
