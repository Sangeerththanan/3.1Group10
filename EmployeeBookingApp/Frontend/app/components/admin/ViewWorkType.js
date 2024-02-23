//import liraries
import React, { Component, useCallback, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Client from '../../api/Client';

// create a component
const ViewWorkType = () => {
    const [workTypes, setWorkTypes] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await Client.get('/workTypes/');
            setWorkTypes(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching work types data:', error);
        }
    }, []);
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const renderWorkType = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.column}>{item.workType}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.headerColumn}>Work Types</Text>
            </View>
            <FlatList
                data={workTypes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderWorkType}
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerRow: {
        flexDirection: 'row',
        paddingVertical: 16,
        borderBottomWidth: 2,
        borderBottomColor: '#2196f3',
        backgroundColor: '#ffffff',
    },
    column: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 12,
        color: '#333333',
    },
    headerColumn: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 12,
        color: '#2196f3',
        fontWeight: 'bold',
    },
    actionsColumn: {
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
});

//make this component available to the app
export default ViewWorkType;
