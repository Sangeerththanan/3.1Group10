//import liraries
import React from 'react';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import FormSubmitButton from './FormSubmitButton';

import { Formik } from 'formik';
import * as Yup from 'yup';

import Client from '../api/Client';
import { StackActions } from '@react-navigation/native';
import { useLogin } from '../context/LoginProvider';
import LoginAdmin from './LoginForm';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required!'),
    password: Yup.string().trim().min(8, 'Password is too short!').required('Password is required!'),
})

// create a component
const LoginAdmin= ({ navigation }) => {
    const {setIsLoggedIn, setProfile} = useLogin();
    const userInfo = {
        email: '',
        password: '',
    }

    const signIn = async (values, formikAction) => {
        //console.log(values);
        const res = await Client.post('/signIn', {
            ...values,
        });
        if (res.data.success) {
            setProfile(res.data.employee);
            setIsLoggedIn(true);
            // navigation.dispatch(
            //     StackActions.replace('EmployeeProfile', { email: values.email })
            // );
        }
        console.log(res.data);
        formikAction.resetForm();
        formikAction.setSubmitting(false);
    };

    return (
        <FormContainer align="center">
            <Formik
                initialValues={userInfo}
                validationSchema={validationSchema}
                onSubmit={signIn}
            >
                {({
                    values,
                    errors,
                    isSubmitting,
                    touched,
                    handleChange,
                    handleSubmit,
                }) => {
                    const { email, password } = values
                    return (
                        <>
                            <FormInput
                                value={email}
                                error={touched.email && errors.email}
                                onChangeText={handleChange('email')}
                                lable='Email'
                                placeholder='example@gmail.com'
                                autoCapitalize='none'
                            />
                            <FormInput
                                value={password}
                                error={touched.password && errors.password}
                                onChangeText={handleChange('password')}
                                lable='Password'
                                placeholder='********'
                                autoCapitalize='none'
                                secureTextEntry
                            />
                            <FormSubmitButton
                                lable='Login'
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

//make this component available to the app
export default LoginAdmin;
