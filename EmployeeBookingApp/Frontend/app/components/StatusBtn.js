//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// create a component
const StatusBtn = () => {
    const [status, setStatus] = useState('Available');
    const [statusColor, setStatusColor] = useState('green');
    function handleStatus() {
        if (status === 'Available') {
            setStatus('Busy');
            setStatusColor('red');
        } else {
            setStatus('Available');
            setStatusColor('green');
        }
    }

    return (
        <TouchableOpacity style={[styles.container, {backgroundColor:statusColor,}]}>
            <Text 
            onPress={handleStatus} 
            style={{ fontSize: 18, color: '#fff', padding:10 }}
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
