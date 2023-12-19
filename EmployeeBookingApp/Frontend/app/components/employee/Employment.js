//import liraries
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Client from '../../api/Client';
import { useLogin } from '../../context/LoginProvider';
import StatusBtn from './StatusBtn';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import EditBtn from './EditBtn';

// create a component
const Employment = () => {
    const { profile } = useLogin();
    const [employeeData, setEmployeeData] = useState(null);
    const { email } = profile;

    const fetchData = useCallback(async () => {
        try {
            const response = await Client.get('/employees/${email}');
            setEmployeeData(response.data);
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

return (
    <View style={styles.container}>
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
});

//make this component available to the app
export default Employment;