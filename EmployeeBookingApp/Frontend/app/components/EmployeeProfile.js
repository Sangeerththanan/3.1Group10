//import libraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Client from '../api/Client';
import { useLogin } from '../context/LoginProvider';

// create a component
const EmployeeProfile = () => {
    const { profile } = useLogin();
    const [employeeData, setEmployeeData] = useState(null);
    const { email } = profile;
    //console.log('email: ',email);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Client.get(`/employees/${email}`);
                setEmployeeData(response.data);
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchData();
    }, [email]); // Include email in the dependency array to fetch data when email changes

    return (
        <View style={styles.container}>
            {employeeData ? (
                <View>
                    {/* <Text>{`Employee Name: ${employeeData.name}`}</Text> */}
                    {Object.keys(employeeData).map(key => (
                        <Text style={styles.text} key={key}>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${employeeData[key]}`}</Text>
                    ))}
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
    loadingText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

// make this component available to the app
export default EmployeeProfile;
