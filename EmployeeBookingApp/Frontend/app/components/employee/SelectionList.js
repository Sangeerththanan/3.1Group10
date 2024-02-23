import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import Client from '../../api/Client';

const SelectionList = (props) => {
    const [selected, setSelected] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Client.get('/workTypes/');
                // Store Values in Temporary Array
                let newArray = response.data.map((item) => ({
                    key: item.id,
                    value: item.workType
                }));
                // Set Data Variable
                setData(newArray);
            } catch (e) {
                console.log(e);
            }
        };

        // Call the fetchData function
        fetchData();
    }, []); // Empty dependency array to run the effect only once when the component mounts

    const { label, error, onSelectionChange } = props;

    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                <Text style={{ fontWeight: 'bold' }}>{label}</Text>
                {error ? <Text style={{ color: 'red', fontSize: 16 }}>{error}</Text> : null}
            </View>
            <SelectList
                boxStyles={{
                    borderWidth: 1,
                    borderColor: '#1b1b33',
                    height: 35,
                    borderRadius: 8,
                    fontSize: 16,
                    paddingLeft: 10,
                    paddingTop: 0,
                    paddingBottom: 0,
                    textAlign: 'center',
                    marginBottom: 20,
                }}
                setSelected={(val) => {
                    setSelected(val);
                    onSelectionChange(val); // Pass the selected value to the parent component
                }}
                data={data} // Use an empty array if data is null
                save="value"
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

export default SelectionList;
