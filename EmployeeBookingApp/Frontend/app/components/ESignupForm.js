import react from 'react';
import FormContainer from './employee/FormContainer';
import FormInput from './FormInput';
import FormSubmitButton from './FormSubmitButton';
import SelectionList from './employee/SelectionList';

import { Formik } from 'formik';
import * as Yup from 'yup';

import Client  from '../api/Client';
import { StackActions } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const validationSchema= Yup.object({
    name: Yup.string().trim().min(3, 'Invalid name!').required('Name is required!'),
    email: Yup.string().email('Invalid email').required('Email is required!'),
    password: Yup.string().trim().min(8, 'Password is too short!').required('Password is required!'),
    confirmPassword: Yup.string().equals([Yup.ref('password'), null], 'Password does not match!'),
    contactNo: Yup.string().min(9, 'Invalid Contact No').required('Contact No is required!'),
    address: Yup.string().required('Address is required!'),

})
//create a component
const ESignupForm=({navigation}) =>{
    const [selectedWorkType,setSelectedWorkType]=React.useState('');
    const userInfo={
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        contactNo:'',
        address:'',

    }
    
    return(
        <ScrollView>
            <FormContainer>
                <Formik
                initialValues={userInfo}
                validationSchema={validationSchema}
                onSubmit={signUp}>
                    {({
                        values,
                        errors,
                        touched,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    })=>{
                        const { name,email,password,confirmPassword,contactNo,address }=values
                        return(
                            <>
                            <FormInput
                            value={name}
                            error={touched.name && errors.name}
                            lable='Full Name'
                            placeholder='David Warner'
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
                            />

                            <FormInput
                            value={password}
                            error={touched.password && error.password}
                            autoCapitalize='none'
                            secureTextEntry
                            lable='Password'
                            placeholder='**********'
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
                    }
                    
                    }
                </Formik>
            </FormContainer>
        </ScrollView>
    );


};
export default ESignupForm;