//import liraries
import React from 'react';
import { StyleSheet, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';

// create a component
const FormContainer = ({ children }) => {
    return (
        <KeyboardAvoidingView enabled
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={styles.container}>
            {children}
        </KeyboardAvoidingView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        padding: 20,
    },
});

//make this component available to the app
export default FormContainer;
