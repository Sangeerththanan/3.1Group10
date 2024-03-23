//import liraries
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Client from '../../api/Client';
import { useLogin } from '../../context/LoginProvider';
import StatusBtn from './StatusBtn';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import EditBtn from './StatusBtn';

// create a component
const Employment = () => {
    const { profile } = useLogin();
    const [employeeData, setEmployeeData] = useState(null);
    const { email } = profile;
    const [bookings, setBookings] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const response = await Client.get(`/employees/${email}`);
            setEmployeeData(response.data);
            const response2 = await Client.get(`/employees/bookings/${email}`);
            setBookings(response2.data);
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);
    // Use useFocusEffect to refetch data when the component is focused
    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [fetchData])
    );

    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.column}>{item.employer}</Text>
            <Text style={styles.column}>{item.ERemail}</Text>
            {/* <Text style={styles.column}>Message</Text> */}
        </View>
    );

    return (
        <View style={styles.container}>
            <View>
                {employeeData ? (
                    <View>
                        <StatusBtn
                            employee={employeeData}
                            disablePress={true}
                        />
                        <Text style={styles.text}>Payment Info : {employeeData.payment} per hour</Text>
                    </View>
                ) : (
                    <Text style={styles.loadingText}>Loading...</Text>
                )}
            </View>

            <View>
                <View style={styles.headerRow}>
                    <Text style={styles.headerColumn}>Name</Text>
                    <Text style={styles.headerColumn}>Email</Text>
                    {/* <Text style={styles.headerColumn}>Message</Text> */}
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
        </View>
    );
};
// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    text: {
        fontSize: 20,
        marginBottom: 8,
    },
    loadingText: {
        fontSize: 18,
        fontWeight: 'bold',
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
export default Employment;