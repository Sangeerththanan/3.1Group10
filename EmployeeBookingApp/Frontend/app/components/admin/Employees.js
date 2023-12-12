// import libraries
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Client from '../../api/Client';
import DeleteBtn from './DeleteBtn';

// create a component
const Employees = () => {
    const [employees, setEmployees] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await Client.get(`/employees/`);
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDeleteEmployee = useCallback(async () => {
        await fetchData();
    }, [fetchData]);

    const renderEmployeeItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.column}>{item.name}</Text>
            <Text style={styles.column}>{item.email}</Text>
            <Text style={styles.column}>{item.workType}</Text>
            <TouchableOpacity style={styles.actionsColumn}>
                <DeleteBtn employeeEmail={item.email} onDelete={handleDeleteEmployee}/>
            </TouchableOpacity>
        </View>
    );

    return (
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
    );
};

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

// make this component available to the app
export default Employees;
