//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import UserTypeButton from './UserTypeButton';
import { StackActions } from '@react-navigation/native';

const { width } = Dimensions.get('window')

// create a component
const WelcomePage = ({navigation}) => {
    const employee = async () => {
        navigation.dispatch(
            StackActions.replace('AppForm')
        );
    };
    const admin = async () => {
        navigation.dispatch(
            StackActions.replace('LoginForm')
        );
    };
    const WelcomePage = ({navigation}) => {
        const employeer = async () => {
            navigation.dispatch(
                StackActions.replace('AppForm')
            );
        };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
            />
            <UserTypeButton
                lable='Admin'
            onPress={admin}
            />
            <UserTypeButton
                lable='Employee'
                onPress={employee}
            />
            <UserTypeButton
                lable='Employer'
            onPress={employeer}
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#2c3e50',
    },
    logo: {
        width: width * 0.5,
        height: width * 0.5,
        resizeMode: 'contain', // or 'cover' for different resizing options
    },
});

//make this component available to the app
export default WelcomePage;
