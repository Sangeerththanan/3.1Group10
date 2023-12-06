//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// create a component
const DeleteBtn = () => {
    return (
        <TouchableOpacity style={styles.container}>
            <Text
                style={{ fontSize: 18, color: '#fff', padding: 10 }}
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
