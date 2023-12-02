//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window')

// create a component
const HomeBtn = ({ onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.touchable}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
            <Image
                source={require('../../assets/homeBtn.png')}
                style={styles.logo}
            />
        </TouchableOpacity>

    );
};

// define your styles
const styles = StyleSheet.create({
    touchable: {
        alignSelf: 'flex-end',
        marginRight: 20,
        marginTop: 60,
        marginBottom: 60,
        padding: 10, // Add padding to increase the touchable area
    },
    logo: {
        width: width * 0.15,
        height: width * 0.15,
        resizeMode: 'contain', // or 'cover' for different resizing options
    },
});

//make this component available to the app
export default HomeBtn;
