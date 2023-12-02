//import liraries
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, View, Image } from 'react-native';

import FormHeader from './FormHeader';
import FormSelectorBtn from './FormSelectorBtn';
import ELoginForm from './ELoginForm';
import ESignupForm from './ESignupForm';


import axios from 'axios';
import HomeBtn from './HomeBtn';
import { StackActions } from '@react-navigation/native';

const { width } = Dimensions.get('window');


// create a component
const AppForm = ({ navigation }) => {
    const animation = useRef(new Animated.Value(0)).current;
    const scrollview = useRef();

    const rightHeaderOpacity = animation.interpolate({
        inputRange: [0, width],
        outputRange: [1, 0],
    })

    const leftHeaderTranslateX = animation.interpolate({
        inputRange: [0, width],
        outputRange: [0, 40],
    });

    const rightHeaderTranslateY = animation.interpolate({
        inputRange: [0, width],
        outputRange: [0, -20],
    });

    const loginColorInterpolate = animation.interpolate({
        inputRange: [0, width],
        outputRange: ['rgba(27,27,51,1)', 'rgba(27,27,51,0.4)'],
    });
 
    const signupColorInterpolate = animation.interpolate({
        inputRange: [0, width],
        outputRange: ['rgba(27,27,51,0.4)', 'rgba(27,27,51,1)'],
    });

    const fetchApi = async () => {
        try {
            const res = await axios.get('http://192.168.1.10:8080/')
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
        <View style={{ flex: 1,}}>
        <HomeBtn onPress={welcomePage}/>
            <View style={{ height: 80 }}>
                <FormHeader
                    leftHeading='Welcome '
                    rightHeading='Back'
                    subHeading='Employeer'
                    rightHeaderOpacity={rightHeaderOpacity}
                    leftHeaderTranslateX={leftHeaderTranslateX}
                    rightHeaderTranslateY={rightHeaderTranslateY}
                />
            </View>
            <View style={{
                flexDirection: 'row',
                paddingHorizontal: 20,
                marginBottom: 20
            }}>
                <FormSelectorBtn
                    style={styles.borderLeft}
                    backgroundColor={loginColorInterpolate}
                    lable='Login'
                    onPress={() => scrollview.current.scrollTo({ x: 0 })}
                />
             
                <FormSelectorBtn
                    style={styles.borderRight}
                    backgroundColor={signupColorInterpolate}
                    lable='Sign Up'
                    onPress={() => scrollview.current.scrollTo({ x: width })}
                />
            </View>
            <ScrollView
                ref={scrollview}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: animation } } }],
                    { useNativeDriver: false }
                )}
            >
                <ELoginForm navigation={navigation} />
               
                <ScrollView>
                    <ESignupForm navigation={navigation} />
                </ScrollView>
            </ScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    borderLeft: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    borderRight: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },
});

//make this component available to the app
export default AppForm;
