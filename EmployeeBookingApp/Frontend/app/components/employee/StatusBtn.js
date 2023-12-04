//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Client from '../../api/Client';

// create a component
const StatusBtn = (props) => {
    const [status, setStatus] = useState(props.employee.status);
    const [statusColor, setStatusColor] = useState(props.employee.status === 'Available' ? 'green' : 'red');

    async function handleStatus() {
        if (status === 'Available') {
            setStatus('Busy');
            setStatusColor('red');
        } else {
            setStatus('Available');
            setStatusColor('green');
        }

        try {
            // Update the status in the database
            const newStatus = status === 'Available' ? 'Busy' : 'Available';
            await Client.put(`/employees/status/${props.employee.email}`, { status: newStatus });
        } catch (error) {
            console.error('Error updating status:', error);
        }
    }

    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: statusColor, }]}>
            <Text
                onPress={handleStatus}
                style={{ fontSize: 18, color: '#fff', padding: 10 }}
            >
                {status}
            </Text>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-end',
        height: 45,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

//make this component available to the app
export default StatusBtn;
