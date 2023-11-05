//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppForm from './components/AppForm';
import EmployeeProfile from './components/EmployeeProfile';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={AppForm} name='AppForm' />
      <Stack.Screen component={EmployeeProfile} name='EmployeeProfile' />
    </Stack.Navigator>
  );
};

// create a component
const MainNavigator = () => {
  return (
    <StackNavigator />
  );
};

//make this component available to the app
export default MainNavigator;
