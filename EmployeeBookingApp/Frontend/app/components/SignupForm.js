//import liraries
import React from 'react';
import UserTypeButton from './UserTypeButton';
import FormContainer from './FormContainer';
import { StackActions } from '@react-navigation/native';

// create a component
const SignupForm = ({ navigation }) => {

    const employee = async () => {

        navigation.dispatch(
            StackActions.replace('EmployeeSignup')
        );
    }

    return (
        <FormContainer>

            <UserTypeButton
                lable='Employee'
                onPress={employee}
            />
            <UserTypeButton
                lable='Employer'
                //onPress={employer}
            />
        </FormContainer>
    );
};

//make this component available to the app
export default SignupForm;
