//import liraries
import React from 'react';
import FormContainer from '../FormContainer';
import FormInput from '../FormInput';
import FormSubmitButton from '../FormSubmitButton';

import { Formik } from 'formik';
import * as Yup from 'yup';

import Client from '../../api/Client';
import { StackActions } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const validationSchema = Yup.object({
    name: Yup.string().trim().min(3, 'Invalid name!').required('Name is required!'),
    email: Yup.string().email('Invalid email').required('Email is required!'),
    password: Yup.string().trim().min(8, 'Password is too short!').required('Password is required!'),
    confirmPassword: Yup.string().equals([Yup.ref('password'), null], 'Password does not match!'),
    contactNo: Yup.string().min(9, 'Invalid Contact No').required('Contact No is required!'),
    address: Yup.string().required('Address is required!'),
    //workType: Yup.string().required('Work type is required!'),
    //payment: Yup.number().typeError('Payment must be a number!'),
})

// create a component
const EmployerSignupForm = ({ navigation }) => {
    const [selectedWorkType, setSelectedWorkType] = React.useState('');
    const userInfo = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        contactNo: '',
        address: '',


    }

    const signUp = async (values, formikAction) => {
        try {
            const paymentValue = parseFloat(values.payment);
            const res = await Client.post('/employers', {
                ...values,
                payment: paymentValue, // Send the parsed number, not the string
                workType: selectedWorkType // Include the selected work type in the data
            });

            if (res.data.success) {
                // Successful signup
                alert('Signup successful! You can now log in.');
                navigation.navigate('Login'); // Redirect to the login screen
            } else {
                // Failed signup
                alert('Signup failed. Please check your information and try again.');
            }

            formikAction.resetForm();
            formikAction.setSubmitting(false);
        } catch (error) {
            // Handle error from the server or network issue
            console.error('Error during signup:', error);
            alert('An error occurred during signup. Please try again later.');
            formikAction.setSubmitting(false);
        }
    };

    return (
        <ScrollView>
            <FormContainer>
                <Formik
                    initialValues={userInfo}
                    validationSchema={validationSchema}
                    onSubmit={signUp}
                >
                    {({
                        values,
                        errors,
                        touched,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    }) => {
                        const { name, email, password, confirmPassword, contactNo, address } = values
                        return (
                            <>
                                <FormInput
                                    value={name}
                                    error={touched.name && errors.name}
                                    lable='Full Name'
                                    placeholder='John Smith'
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                />
                                <FormInput
                                    value={email}
                                    error={touched.email && errors.email}
                                    autoCapitalize='none'
                                    lable='Email'
                                    placeholder='example@gmail.com'
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                />
                                <FormInput
                                    value={password}
                                    error={touched.password && errors.password}
                                    autoCapitalize='none'
                                    secureTextEntry
                                    lable='Password'
                                    placeholder='********'
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                />
                                <FormInput
                                    value={confirmPassword}
                                    error={touched.confirmPassword && errors.confirmPassword}
                                    autoCapitalize='none'
                                    secureTextEntry
                                    lable='Confirm Password'
                                    placeholder='********'
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                />
                                <FormInput
                                    value={contactNo}
                                    error={touched.contactNo && errors.contactNo}
                                    autoCapitalize='none'
                                    lable='Contact No'
                                    placeholder='+94 123456789'
                                    onChangeText={handleChange('contactNo')}
                                    onBlur={handleBlur('contactNo')}

                                />
                                <FormInput
                                    value={address}
                                    error={touched.address && errors.address}
                                    lable='Address'
                                    placeholder='214 2nd Cross Street, Colombo, SriLanka'
                                    onChangeText={handleChange('address')}
                                    onBlur={handleBlur('address')}

                                />
                                <FormSubmitButton
                                    submitting={isSubmitting}
                                    onPress={handleSubmit}
                                    lable='Sign up'
                                />
                            </>
                        );
                    }}
                </Formik>
            </FormContainer>
        </ScrollView>

    );
};

//make this component available to the app
export default EmployerSignupForm;
