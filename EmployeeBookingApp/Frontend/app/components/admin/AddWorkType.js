//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FormContainer from '../FormContainer';
import FormInput from '../FormInput';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormSubmitButton from '../FormSubmitButton';
import Client from '../../api/Client';

const workTypeSchema = Yup.object({
    workType: Yup.string().trim().required('work type is required!'),
})

// create a component
const AddWorkType = () => {
    const workTypeInfo = {
        workType: '',
    }

    const submit = async (values, formikAction) => {
        console.log(values);
        const res = await Client.post('/addWorkType', {
            ...values,
        });

        if (res.data.success) {
            alert('Work type successfully added!');
        } else {
            alert('Failed to add work type. Please try again.');
        }

        console.log(res.data);
        formikAction.resetForm();
        formikAction.setSubmitting(false);
    };

    return (
        <ScrollView>
            <FormContainer>
                <Formik
                    initialValues={workTypeInfo}
                    validationSchema={workTypeSchema}
                    onSubmit={submit}
                >
                    {({
                        values,
                        errors,
                        touched,
                        isSubmitting,
                        handleSubmit,
                        handleChange,
                    }) => {
                        const { workType } = values;
                        return (
                            <>
                                <FormInput
                                    value={workType}
                                    error={touched.workType && errors.workType}
                                    lable='work type'
                                    placeholder='Ex - Mason'
                                    onChangeText={handleChange('workType')}
                                />
                                <FormSubmitButton
                                    lable='Add'
                                    submitting={isSubmitting}
                                    onPress={handleSubmit}
                                />
                            </>
                        );
                    }}
                </Formik>
            </FormContainer>
        </ScrollView>
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
export default AddWorkType;
