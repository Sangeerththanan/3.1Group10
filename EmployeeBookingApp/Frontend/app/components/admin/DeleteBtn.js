//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Client from '../../api/Client';

// create a component
const DeleteBtn = ({ employeeEmail, onDelete }) => {
    async function handleDelete() {
        console.log({ employeeEmail })
        try {
            await Client.delete(`/employees/${ employeeEmail }`);
            // Call the onDelete callback after successful deletion
            onDelete();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    }

    return (
        <TouchableOpacity style={styles.container}>
            <Text
                style={{ fontSize: 18, color: '#fff', padding: 10 }}
                onPress={handleDelete}
            >
                Delete
            </Text>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        height: 45,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
});

//make this component available to the app
export default DeleteBtn;
