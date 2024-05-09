//import libraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Client from '../../api/Client';
import { useLogin } from '../../context/LoginProvider';
import StatusBtn from './StatusBtn';
import UserTypeButton from '../UserTypeButton';
import UploadImage from './UploadImage';
// create a component
const EmployeeProfile = ({ route, navigation }) => {
    const { toggleEditProfile } = route.params ?? {};
    const { updatedData } = route.params ?? {};
    //console.log('updatedData:'updatedData);

    const { profile } = useLogin();
    const [employeeData, setEmployeeData] = useState(null);
    const { email } = profile;
    //console.log('email: ',email);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (updatedData) {
                    setEmployeeData(updatedData);
                    //console.log('Updated!')
                } else {
                    const response = await Client.get(`/employees/${email}`);
                    setEmployeeData(response.data);
                }
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchData();
    }, [email, updatedData]); // Include email in the dependency array to fetch data when email changes , // Include email and updatedData in the dependency array

    const editProfile = async () => {
        toggleEditProfile();
        await new Promise(resolve => setTimeout(resolve, 2)); // Wait for toggleEditProfile() to complete
        navigation.navigate('Edit Profile', { employeeData });
    };


    return (
        <View style={styles.container}>
            {employeeData ? (
                <View>
                    {/* <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1624243225303-261cc3cd2fbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' }}
                        style={{ width: 150, height: 150, borderRadius: 75, alignSelf: 'center' }}
                    />  */}
                    <UploadImage
                        style={{ width: 150, height: 150, borderRadius: 75, alignSelf: 'center' }}
                    />
                    {/* <Text style={{marginVertical:30,fontSize:30}}>{profile.name}</Text> */}
                    <Text style={{ fontSize: 35 }}>{`${employeeData.name}`}</Text>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', marginVertical: 10 }} />
                    <StatusBtn employee={employeeData} />
                    <Text style={styles.text}>{`Work Type: ${employeeData.workType}`}</Text>
                    <Text style={styles.text}>{`Email: ${employeeData.email}`}</Text>
                    <Text style={styles.text}>{`Contact No: ${employeeData.contactNo}`}</Text>
                    <Text style={styles.text}>{`Address: ${employeeData.address}`}</Text>
                    <Text style={[styles.text, { marginBottom: 20 }]}>{`Payment: ${employeeData.payment}`}</Text>
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

};

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
export default EmployeeProfile;
