import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, FlatList, Button, Alert } from 'react-native';
import Client from '../../api/Client';
import { useLogin } from '../../context/LoginProvider';
import { Button } from 'react-native';}
const Discount = () => {
    const { profile } = useLogin();
    const { email } = profile;
    const [types, setTypes] = useState([]);
    const [items, setItems] = useState([]);

    const fetchType = useCallback(async () => {
        try {
            const response = await Client.get(`/employers/discount/${email}`);
            setTypes(response.data.map(item => item.type));
        } catch (error) {
            console.error('Error fetching type data:', error);
        }
    }, [email]);

    useEffect(() => {
        fetchType();
    }, [fetchType]);

    const fetchItemsForType = useCallback(async (type) => {
        try {
            const response = await Client.get(`/items/discount/${type}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching items for type ${type}:`, error);
            return [];
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const allItems = await Promise.all(types.map(type => fetchItemsForType(type)));
            setItems(allItems.flat());
        };

        fetchData();
    }, [types, fetchItemsForType]);

    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.column}>{item.type}</Text>
            <Text style={styles.column}>{item.item}</Text>
            <Text style={styles.column}>{item.cost}</Text>
            <Text style={styles.column}>{item.cost * 0.9}</Text>
            <Button
            title="Buy"
            onPress={()=>handleBuy(item)}
            />
        </View>

    );
    const handleBuy=(item)=>{
        alert('Buying',item);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.headerColumn}>Type</Text>
                <Text style={styles.headerColumn}>Item</Text>
                <Text style={styles.headerColumn}>Normal cost</Text>
                <Text style={styles.headerColumn}>Discount cost</Text>
            </View>
            {items.length > 0 ? (
                <FlatList
                    data={items}
                    keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                    renderItem={renderItem}
                />
            ) : (
                <Text style={styles.errorText}>No items found</Text>
            )}
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
    errorText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: 'red',
    },
});

export default Discount;
