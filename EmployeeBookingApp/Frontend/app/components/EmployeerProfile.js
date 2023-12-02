//import libraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Client from '../api/Client';
import { useLogin } from '../context/LoginProvider';
import StatusBtn from './StatusBtn';
import UserTypeButton from './UserTypeButton';

// create a component
const EmployeerProfile = ({ route, navigation }) => {
    const { updatedData } = route.params ?? {};
    //console.log('updatedData:'updatedData);

    const { profile } = useLogin();
    const [employeerData, setEmployeerData] = useState(null);
    const { email } = profile;}
    //console.log('email: ',email);

    /*useEffect(() => {
        const fetchData = async () => {
            try {
                if (updatedData) {
                    setEmployeerData(updatedData);
                    //console.log('Updated!')
                } else {
                    const response = await Client.get(`/employeer/${email}`);
                    setEmployeerData(response.data);
                }
            } catch (error) {
                console.error('Error fetching employeer data:', error);
            }
        };

        fetchData();
    }, [email, updatedData]); // Include email in the dependency array to fetch data when email changes , // Include email and updatedData in the dependency array

    const editProfile = () => {
        navigation.navigate('Edit Profile', { employeerData });
    };

    return (
        <View style={styles.container}>
            {employeerData ? (
                <View>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1624243225303-261cc3cd2fbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' }}
                        style={{ width: 150, height: 150, borderRadius: 75, alignSelf: 'center' }}
                    />
                    <Text style={{ fontSize: 35 }}>{`${employeerData.name}`}</Text>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', marginVertical: 10 }} />
                    <StatusBtn employeer={employeerData} />
                    <Text style={styles.text}>{`Work Type: ${employeerData.workType}`}</Text>
                    <Text style={styles.text}>{`Email: ${employeerData.email}`}</Text>
                    <Text style={styles.text}>{`Contact No: ${employeerData.contactNo}`}</Text>
                    <Text style={styles.text}>{`Address: ${employeerData.address}`}</Text>
                    <Text style={[styles.text, { marginBottom: 20 }]}>{`Payment: ${employeerData.payment}`}</Text>
                    <UserTypeButton
                        lable='Edit'
                        onPress={editProfile}
                    />
                </View>
            ) : (
                <Text style={styles.loadingText}>Loading...</Text>
            )}
        </View>
    );

};*/

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    text: {
        fontSize: 20,
        marginBottom: 8,
    },
    loadingText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

// make this component available to the app
export default EmployeerProfile;
