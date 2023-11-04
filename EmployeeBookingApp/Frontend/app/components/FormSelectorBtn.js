//import liraries
import React from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';

// create a component
const FormSelectorBtn = ({ lable, backgroundColor, style, onPress }) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Animated.View style={[styles.container, { backgroundColor }, style]}>
                <Text style={styles.lable}>{lable}</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        height: 45, width: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    lable: {
        color: 'white', fontSize: 16,
    }
});

//make this component available to the app
export default FormSelectorBtn;
