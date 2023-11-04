//import liraries
import React from 'react';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import FormSubmitButton from './FormSubmitButton';

// create a component
const LoginForm = () => {
    return (
        <FormContainer>
            <FormInput lable='Email' placeholder='example@gmail.com' />
            <FormInput lable='Password' placeholder='********' />
            <FormSubmitButton lable='Login' />
        </FormContainer>
    );
};

// define your styles

//make this component available to the app
export default LoginForm;
