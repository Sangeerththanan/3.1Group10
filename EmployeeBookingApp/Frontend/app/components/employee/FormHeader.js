//import liraries
import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

// create a component
const FormHeader = ({
    leftHeading,
    rightHeading,
    subHeading,
    leftHeaderTranslateX = 40,
    rightHeaderTranslateY = -20,
    rightHeaderOpacity = 0,
}) => {
    return (
        <>
            <View style={styles.container}>
                <Animated.Text
                    style={[styles.heading,
                    { transform: [{ translateX: leftHeaderTranslateX }] }]}
                >
                    {leftHeading}
                </Animated.Text>
                <Animated.Text
                    style={[styles.heading,
                    { opacity: rightHeaderOpacity, transform: [{ translateY: rightHeaderTranslateY }] }
                    ]}
                >
                    {rightHeading}
                </Animated.Text>
            </View>
            <Text style={styles.subHeading}>{subHeading}</Text>
        </>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1b1b33'
    },
    subHeading: {
        fontSize: 18,
        color: '#1b1b33',
        textAlign: 'center'
    }
});

//make this component available to the app
export default FormHeader;
