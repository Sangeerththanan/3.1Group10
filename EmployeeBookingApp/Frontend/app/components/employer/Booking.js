//import liraries
import React, { Component, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FormContainer from '../FormContainer';
import SelectionList from '../employee/SelectionList';
import { Formik } from 'formik';
import Client from '../../api/Client';
import FormSubmitButton from '../FormSubmitButton';

// create a component
const Booking = () => {
    const [selectedWorkType, setSelectedWorkType] = useState('');
    const [employees, setEmployees] = useState([]);
    const bookingInfo = {
        type: '',
    }

    const fetchData = useCallback(async () => {
        try {
            const response = await Client.get(`/employees/workType/${selectedWorkType}`);
            setEmployees(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching item data:', error);
        }
    }, [selectedWorkType]);

    const renderEmployeeItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.column}>{item.name}</Text>
            <Text style={styles.column}>{item.email}</Text>
            <Text style={styles.column}>{item.workType}</Text>
            <Text style={styles.column}>Book</Text>
        </View>
    );

    return (
        <>
            <FormContainer>
                <Formik
                    initialValues={bookingInfo}
                    onSubmit={fetchData}
                >
                    {({
                        values,
                        isSubmitting,
                        handleSubmit,
                    }) => {
                        const { type } = values
                        return (
                            <>
                                <SelectionList
                                    onSelectionChange={(selectedValue) => setSelectedWorkType(selectedValue)}
                                />
                                <FormSubmitButton
                                    submitting={isSubmitting}
                                    onPress={handleSubmit}
                                    lable='Search'
                                />
                            </>
                        )
                    }}
                </Formik>
            </FormContainer>
            <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.headerColumn}>Name</Text>
                <Text style={styles.headerColumn}>Email</Text>
                <Text style={styles.headerColumn}>Work Type</Text>
                <Text style={styles.headerColumn}>Actions</Text>
            </View>
            <FlatList
                data={employees}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderEmployeeItem}
            />
        </View>
        </>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerRow: {
        flexDirection: 'row',
        paddingVertical: 16,
        borderBottomWidth: 2,
        borderBottomColor: '#2196f3',
        backgroundColor: '#ffffff',
    },
    column: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 12,
        color: '#333333',
    },
    headerColumn: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 12,
        color: '#2196f3',
        fontWeight: 'bold',
    },
    actionsColumn: {
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
});

//make this component available to the app
export default Booking;
