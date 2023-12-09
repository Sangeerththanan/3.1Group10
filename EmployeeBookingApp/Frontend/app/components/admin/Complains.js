//import liraries
import React, { Component, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet,FlatList } from 'react-native';
import Client from '../../api/Client';

// create a component
const Complains = () => {
    const [complains, setComplains] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await Client.get(`/complains/`);
            setComplains(response.data);
        } catch (error) {
            console.error('Error fetching Complains data:', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const renderComplainItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.complainText}>{item.complain}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.headerColumn}>Complains</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff', // Set a background color (white in this case)
        paddingHorizontal: 16, // Add padding on the left and right
    },
    headerRow: {
        backgroundColor: '#3498db', // Set a header background color
        paddingVertical: 10, // Add vertical padding
        marginBottom: 10, // Add margin at the bottom
    },
    headerColumn: {
        fontSize: 24,
        color: '#ffffff', // Set header text color
    },
    row: {
        padding: 16, // Add padding for each complain row
        borderBottomWidth: 1,
        borderBottomColor: '#ecf0f1', // Add a light border color
    },
    complainText: {
        fontSize: 16,
        color: '#2c3e50', // Set text color for complains
    },
});

// make this component available to the app
export default Complains;
