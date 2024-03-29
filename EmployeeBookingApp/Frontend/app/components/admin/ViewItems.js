import { View, StyleSheet, Text, FlatList } from 'react-native';
import React, { Component, useState, useEffect, useCallback } from 'react';
import Client from '../../api/Client';
const ViewItems = () => {
    const [items, setItems] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await Client.get(`/items/`);
            setItems(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching item data:', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.column}>{item.type}</Text>
            <Text style={styles.column}>{item.item}</Text>
            <Text style={styles.column}>{item.cost}</Text>
        </View>
    );
    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.headerColumn}>Type</Text>
                <Text style={styles.headerColumn}>Item</Text>
                <Text style={styles.headerColumn}>Cost</Text>

            </View>
            <FlatList
                data={items}
                keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
                renderItem={renderItem}
            />

        </View>
    );

};

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

export default ViewItems;


