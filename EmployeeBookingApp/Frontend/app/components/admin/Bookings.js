//import liraries
import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Client from '../../api/Client';

// create a component
const Booking = () => {

    const [bookings, setBookings] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await Client.get(`/booking/`);
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bokking data:', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const renderBooking = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.column}>{item.employer}</Text>
            <Text style={styles.column}>{item.type}</Text>
            <Text style={styles.column}>{item.employee}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.headerColumn}>Employer</Text>
                <Text style={styles.headerColumn}>Work Type</Text>
                <Text style={styles.headerColumn}>Employee</Text>
            </View>
            <FlatList
                data={bookings}
                kkeyExtractor={(item) => (item ? item.id.toString() : '')}
                renderItem={renderBooking}
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
export default Booking;
