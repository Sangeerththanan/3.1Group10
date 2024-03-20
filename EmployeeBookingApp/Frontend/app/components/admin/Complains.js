//import liraries
import React, { Component, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Client from '../../api/Client';

// create a component
const Complains = () => {
    const [complains, setComplains] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await Client.get(`/complains/`);
            setComplains(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching Complains data:', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const renderComplainItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.column}>{item.email}</Text>
            <Text style={styles.column}>{item.title}</Text>
            <Text style={styles.column}>{item.details}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.headerColumn}>Employee</Text>
                <Text style={styles.headerColumn}>Title</Text>
                <Text style={styles.headerColumn}>Details</Text>
            </View>
            <FlatList
                data={complains}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderComplainItem}
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

// make this component available to the app
export default Complains;
