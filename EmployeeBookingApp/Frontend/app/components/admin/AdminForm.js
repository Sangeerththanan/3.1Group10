//import liraries
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AdminLogin from './AdminLogin';
import HomeBtn from '../HomeBtn';
import axios from 'axios';
import { StackActions } from '@react-navigation/native';

// create a component
const AdminForm = ({ navigation }) => {
    const fetchApi = async () => {
        try {
            const res = await axios.get('http://192.168.8.102:8080/')
            console.log(res.data)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchApi()
    }, [])

    const welcomePage = async () => {
        navigation.dispatch(
            StackActions.replace('WelcomePage')
        );
    };

    return (
        <View style={styles.container}>
            <HomeBtn onPress={welcomePage} />
            <Text style={styles.heading}>Administrator</Text>
            <AdminLogin />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1b1b33'
    },
});

//make this component available to the app
export default AdminForm;
