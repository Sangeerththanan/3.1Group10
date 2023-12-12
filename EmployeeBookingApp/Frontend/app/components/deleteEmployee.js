//import libraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Client from '../../api/Client';

// create a component
const EmployeeDelete = ({ employeeEmail, onDelete }) => {
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
    //newly added
    catch (error) {
        if (error.response) {
          console.error('Error deleting employee:', error.response.status, error.response.statusText);
        } else {
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
