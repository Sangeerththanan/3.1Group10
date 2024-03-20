//import liraries
import React from 'react';
import FormContainer from '../FormContainer';
import FormInput from '../FormInput';
import FormSubmitButton from '../FormSubmitButton';

import { Formik } from 'formik';
import * as Yup from 'yup';

import Client from '../../api/Client';
import { ScrollView } from 'react-native-gesture-handler';
import SelectionList from '../employee/SelectionList';

const addItemSchema = Yup.object({
  item: Yup.string().trim().required('name is required!'),
  cost: Yup.number().typeError('Payment must be a number!'),
})

// create a component
const AddItems = ({ navigation }) => {
  const [selectedWorkType, setSelectedWorkType] = React.useState('');
  const itemInfo = {
    type: '',
    item: '',
    cost: undefined,
  }

  const itemAdd = async (values, formikAction) => {
    const costValue = parseFloat(values.cost);
    const res = await Client.post('/items', {
      type: selectedWorkType,
      item: values.item,
      cost: costValue,
    });

    if (res.data.success) {
      alert('Item added successfully!');
    } else {
      alert('Failed to add item. Please try again later.');
    }

    console.log(res.data);
    formikAction.resetForm();
    formikAction.setSubmitting(false);
  };

  return (
    <ScrollView>
      <FormContainer>
        <Formik
          initialValues={itemInfo}
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
            const { type, item, cost } = values
            return (
              <>
                <SelectionList
                  value={type}
                  lable='Work type'
                  error={touched.type && errors.type}
                  onSelectionChange={(selectedValue) => setSelectedWorkType(selectedValue)}
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
                  lable='Amount'
                  placeholder='Amount'
                  onChangeText={handleChange('cost')}
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

