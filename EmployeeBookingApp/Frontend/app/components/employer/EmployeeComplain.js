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

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required!'),
    title: Yup.string().required('Title is required!'),
    details: Yup.string().required('Details is required!'),
})

// create a component
const EmployeeComplain = () => {
    const complainInfo = {
        email: '',
        title: '',
        details: '',
    }

    const submit = async (values, formikAction) => {
        const res = await Client.post('/complains', {
            ...values,
        });

        if (res.data.success) {
            alert('Complaint successfully submitted! Thank you for bringing this to our attention.');
        } else {
            alert('Failed to submit complaint. Please ensure all information is correct and try again.');
        }

        //console.log({ ...values, payment: paymentValue });
        console.log(res.data);
        formikAction.resetForm();
        formikAction.setSubmitting(false);
    };

    return (
        <FormContainer align="center">
            <Formik
                initialValues={complainInfo}
                validationSchema={validationSchema}
                onSubmit={submit}
            >
                {({
                    values,
                    errors,
                    isSubmitting,
                    touched,
                    handleChange,
                    handleSubmit,
                }) => {
                    const { email, title, details } = values
                    return (
                        <>
                            <FormInput
                                value={email}
                                error={touched.email && errors.email}
                                onChangeText={handleChange('email')}
                                lable='Employee Email'
                                placeholder='example@gmail.com'
                                autoCapitalize='none'
                            />
                            <FormInput
                                value={title}
                                error={touched.title && errors.title}
                                onChangeText={handleChange('title')}
                                lable='Complain Title'
                                placeholder='Enter a short title for your complain'
                                autoCapitalize='none'
                            />
                            <Multiline
                                value={details}
                                error={touched.details && errors.details}
                                onChangeText={handleChange('details')}
                                label="Complain Details"
                                placeholder="Describe your complain in detail..."
                                multiline={true}
                                numberOfLines={4}
                            />

                            <FormSubmitButton
                                lable='Submit'
                                submitting={isSubmitting}
                                onPress={handleSubmit}
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
