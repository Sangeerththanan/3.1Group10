// import libraries
import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

// create a component
const Multiline = (props) => {
    const { placeholder, label, error, multiline, numberOfLines } = props;
    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                <Text style={{ fontWeight: 'bold' }}>{label}</Text>
                {error ? <Text style={{ color: 'red', fontSize: 16 }}>{error}</Text> : null}
            </View>
            <TextInput
                {...props}
                placeholder={placeholder}
                style={[styles.input, multiline && styles.multilineInput]}
                multiline={multiline}
                numberOfLines={numberOfLines}
            />
        </>
    );
};

// define your styles
const styles = StyleSheet.create({
        container: {
        marginBottom: 20,
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    label: {
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#1b1b33',
        height: 35,
        borderRadius: 8,
        fontSize: 16,
        paddingLeft: 10,
        marginBottom: 20,
    },
    multilineInput: {
        height: 100, // Set the desired height for multiline input
        textAlignVertical: 'top', // Align text to the top for multiline input
    },
});

// make this component available to the app
export default Multiline;
