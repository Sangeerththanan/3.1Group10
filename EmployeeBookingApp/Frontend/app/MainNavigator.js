//import liraries
import React, { Component, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppForm from './components/AppForm';
import EmployeeProfile from './components/EmployeeProfile';

import { createStackNavigator } from '@react-navigation/stack';
import { useLogin } from './context/LoginProvider';
import WelcomePage from './components/WelcomePage';
//import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={WelcomePage} name='WelcomePage' />
      <Stack.Screen component={AppForm} name='AppForm' />
      <Stack.Screen component={EmployeeProfile} name='EmployeeProfile' />
    </Stack.Navigator>
  );
};

// create a component
const MainNavigator = () => {
  const { isLoggedIn } = useLogin();
  return (
    //isLoggedIn? <DrawerNavigator/> : <StackNavigator />
    <StackNavigator />
  );
};

//make this component available to the app
export default MainNavigator;
