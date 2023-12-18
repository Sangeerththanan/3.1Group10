//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormContainer from '../FormContainer';
import FormInput from '../FormInput';
import FormSubmitButton from '../FormSubmitButton';

import { Formik } from 'formik';
import * as Yup from 'yup';

import Client from '../../api/Client';
import { useLogin } from '../../context/LoginProvider';
import Multiline from '../Multiline';
// create a component
const EmployeeComplain = () => {
    return (
        <FormContainer align="center">
            <Formik
            // initialValues={userInfo}
            // validationSchema={validationSchema}
            // onSubmit={signIn}
            >
                {({
                    values,
                    errors,
                    isSubmitting,
                    touched,
                    handleChange,
                    handleSubmit,
                }) => {
                    {/* const { email, password } = values */ }
                    return (
                        <>
                            <FormInput
                                // value={email}
                                // error={touched.email && errors.email}
                                // onChangeText={handleChange('email')}
                                lable='Employee Email'
                                placeholder='example@gmail.com'
                                autoCapitalize='none'
                            />
                            <FormInput
                                // value={password}
                                // error={touched.password && errors.password}
                                // onChangeText={handleChange('password')}
                                lable='Complain Title'
                                placeholder='Enter a short title for your complain'
                                autoCapitalize='none'
                            />
                            <Multiline
                                label="Complain Details"
                                placeholder="Describe your complain in detail..."
                                multiline={true}
                                numberOfLines={4}
                            />

                            <FormSubmitButton
                                lable='Submit'
                            // submitting={isSubmitting}
                            // onPress={handleSubmit}
                            />
                        </>
                    );
                }}
            </Formik>
        </FormContainer>
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
export default EmployeeComplain;
