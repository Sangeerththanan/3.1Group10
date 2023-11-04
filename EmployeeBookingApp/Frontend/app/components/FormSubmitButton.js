//import liraries
import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

// create a component
const FormSubmitButton = ({ lable, submitting, onPress }) => {
    const backgroundColor = submitting ? 'rgba(27,27,51,0.4)' : 'rgba(27,27,51,1)'
    return (
        <TouchableOpacity onPress={!submitting ? onPress : null} style={[styles.container, { backgroundColor }]}>
            <Text style={{ fontSize: 18, color: '#fff' }}>{lable}</Text>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        height: 45,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

//make this component available to the app
export default FormSubmitButton;
