
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

const addItemSchema = Yup.object({
    type: Yup.string().trim().required('type is required!'),
    item: Yup.string().trim().required('name is required!'),
    cost: Yup.number().typeError('Payment must be a number!'),  
})

// create a component
const AddItems= ({ navigation }) => {
    const [workType, setWorkType] = React.useState('');
    const [item, setItem] = React.useState('');
    const [cost, setost] = React.useState(0);
    const userInfo = {
        type: '',
        item: '',
        cost: 0,
    }

    const itemAdd = async (values, formikAction) => {
        const cost = parseFloat(values.payment);
        console.log('Request Payload:', {
            ...values,
            payment: cost,
            workType: values.type,
          });
        // const res = await Client.post('/addItems', {
        //     ...values,
        //     payment: cost, // Send the parsed number, not the string
        //     workType: values.type, // Include the selected work type in the data
        // });
        console.log('Response:', res.data);
        try {
            const res = await Client.post('/addItems', {
              ...values,
              payment: cost,
              workType: values.type,
            });
          
            console.log('Response:', res.data);
            // Handle success (if needed)
          } catch (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.error('Error response from server:', error.response.data);
            } else if (error.request) {
              // The request was made but no response was received
              console.error('No response received from server');
            } else {
              // Something happened in setting up the request that triggered an Error
              console.error('Error during request setup:', error.message);
            }
          
            // Handle the error appropriately
          }
          
        // if (res.data.success) {
        //     navigation.dispatch(
        //         StackActions.replace('EmployeeProfile')
        //     );
        // }

        //console.log({ ...values, payment: paymentValue });
        console.log(res.data);



        formikAction.resetForm();
        formikAction.setSubmitting(false);
    };

    return (
        <ScrollView>
            <FormContainer>
                <Formik
                    initialValues={userInfo}
                    validationSchema={addItemSchema}
                    onSubmit={itemAdd}
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
                        const { type,item,cost} = values
                        return (
                            <>
                                <FormInput
                                    value={type}
                                    error={touched.type && errors.type}
                                    lable='work type'
                                    placeholder='Type of Work'
                                    onChangeText={handleChange('type')}
                                    onBlur={handleBlur('type')}
                                />
                                  <FormInput
                                    value={item}
                                    error={touched.item && errors.item}
                                    lable='Item Name'
                                    placeholder='Tool'
                                    onChangeText={handleChange('item')}
                                    onBlur={handleBlur('item')}
                                />
                                  <FormInput
                                    value={cost}
                                    error={touched.cost && errors.cost}
                                    lable='amount'
                                    placeholder='Amount'
                                    onChangeText={handleChange('count')}
                                    onBlur={handleBlur('cost')}
                                />
                             <FormSubmitButton
                                    submitting={isSubmitting}
                                    onPress={handleSubmit}
                                    lable='Add'
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
export default AddItems;

