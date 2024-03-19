import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import Client from '../../api/Client';
import { useLogin } from '../../context/LoginProvider';

// create a component
const MyBookings = () => {
    const { profile } = useLogin();
    const { email } = profile;
    const [bookings, setBookings] = useState([]);

    const fetchType = useCallback(async () => {
        try {
            const response = await Client.get(`/employers/discount/${email}`);
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching type data:', error);
        }
    }, [email]);

    useEffect(() => {
        fetchType();
    }, [fetchType]);

    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.column}>{item.type}</Text>
            <Text style={styles.column}>{item.employee}</Text>
            <Text style={styles.column}>{item.EEemail}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.headerColumn}>Type</Text>
                <Text style={styles.headerColumn}>Name</Text>
                <Text style={styles.headerColumn}>Email</Text>
            </View>
            {bookings.length > 0 ? (
                <FlatList
                    data={bookings}
                    keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                    renderItem={renderItem}
                />
            ) : (
                <Text style={styles.errorText}>No bookings found</Text>
            )}
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
    errorText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: 'red',
    },
});

//make this component available to the app
export default MyBookings;