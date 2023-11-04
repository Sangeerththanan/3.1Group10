//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'

// create a component
const SelectionList = (props) => {
    const [selected, setSelected] = React.useState("");
    const data = [
        { key: '1', value: 'Mason' },
        { key: '2', value: 'Carpenter' },
        { key: '3', value: 'Electrician' },
        { key: '4', value: 'Plumber' },
        { key: '5', value: 'Painter' },
        { key: '6', value: 'Tile Setter' },
        { key: '7', value: 'Roofer' },
    ]
    const { lable, error, onSelectionChange } = props;
    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                <Text style={{ fontWeight: 'bold' }}>{lable}</Text>
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
                data={data}
                save="value"
            />
        </>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default SelectionList;
