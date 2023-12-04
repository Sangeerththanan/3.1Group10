//import liraries
import React from 'react';
import FormContainer from './FormContainer';
import FormInput from '../FormInput';
import FormSubmitButton from '../FormSubmitButton';
import SelectionList from './SelectionList';

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
    // workType: Yup.string().required('Work type is required!'),
    payment: Yup.number().typeError('Payment must be a number!').required('Payment is required!'),
})

// create a component
const EditProfile = ({ route, navigation }) => {
    const email = route.params.employeeData.email;
    const [employeeData, setEmployeeData] = React.useState(route.params.employeeData);
    console.log(employeeData);
    const fetchEmployeeData = async () => {
        try {
            const response = await Client.get(`/employees/${email}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching employee data:', error);
            throw error; // Rethrow the error to handle it in the calling function
        }
    };


    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchEmployeeData();
                setEmployeeData(data);
            } catch (error) {
                // Handle the error (e.g., show an error message)
            }
        };
        fetchData();
    }, [email]);

    const [selectedWorkType, setSelectedWorkType] = React.useState('');
    const userInfo = {
        name: employeeData?.name || '',
        email: employeeData?.email || '',
        password: '',
        confirmPassword: '',
        contactNo: employeeData?.contactNo || '',
        address: employeeData?.address || '',
        workType: '',
        payment: undefined,
    }
    
    const update = async (values, formikAction) => {
        const paymentValue = parseFloat(values.payment);
        const res = await Client.put(`/employees/${employeeData.email}`, {
            ...values,
            payment: paymentValue, // Send the parsed number, not the string
            workType: selectedWorkType // Include the selected work type in the data
        });

        const updatedData = await Client.get(`/employees/${values.email}`);
        console.log('Fetched Data:', updatedData.data);
        
        // Extract only the necessary and serializable information
        const serializableData = {
            name: updatedData.data.name,
            workType: updatedData.data.workType,
            email: updatedData.data.email,
            contactNo: updatedData.data.contactNo,
            address: updatedData.data.address,
            payment: updatedData.data.payment
        };

        if (res.data.success) {
            navigation.navigate('Profile', { updatedData: serializableData });
        }

        // if (res.data.success) {
        //     navigation.dispatch(
        //         StackActions.replace('EmployeeProfile')
        //     );
        // }

        //console.log({ ...values, payment: paymentValue });
        //console.log(res.data);
        formikAction.resetForm();
        formikAction.setSubmitting(false);
    };

    return (
        <ScrollView>
            <FormContainer>
                <Formik
                    initialValues={userInfo}
                    validationSchema={validationSchema}
                    onSubmit={update}
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
                        const { name, email, password, confirmPassword, contactNo, address, workType, payment } = values
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
                                <SelectionList
                                    value={workType}
                                    lable='Work type'
                                    error={touched.workType && errors.workType}
                                    onSelectionChange={(selectedValue) => setSelectedWorkType(selectedValue)}
                                />
                                <FormInput
                                    value={payment}
                                    error={touched.payment && errors.payment}
                                    autoCapitalize='none'
                                    lable='Payment'
                                    placeholder='Rs.250'
                                    onChangeText={handleChange('payment')}
                                    onBlur={handleBlur('payment')}

                                />
                                <FormSubmitButton
                                    submitting={isSubmitting}
                                    onPress={handleSubmit}
                                    lable='Update'
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
export default EditProfile;
