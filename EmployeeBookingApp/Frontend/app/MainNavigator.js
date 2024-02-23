

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomePage from './components/WelcomePage';
import AppForm from './components/employee/AppForm';
import { useLogin } from './context/LoginProvider';
import DrawerNavigator from './DrawerNavigator';
import LoginForm from './components/employee/LoginForm';
import AdminForm from './components/admin/AdminForm';
import AdminDrawerNavigator from './AdminDrawerNavigator';
import EmployeerAppForm from './components/employer/EmployeerAppForm';
import EmployerDrawerNavigator from './EmployerDrawerNavigator';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={WelcomePage} name='WelcomePage' />
      <Stack.Screen component={AppForm} name='AppForm' />
      <Stack.Screen component={LoginForm} name='LoginForm' />

      <Stack.Screen component={AdminForm} name='AdminForm' />
      <Stack.Screen component={EmployeerAppForm} name='EmployeerAppForm' />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const { isLoggedIn, adminLoggedIn, employerLoggedIn } = useLogin();
  return (
    adminLoggedIn ? <AdminDrawerNavigator /> 
    : isLoggedIn ? <DrawerNavigator />
    : employerLoggedIn ? <EmployerDrawerNavigator /> 
    : <StackNavigator />
  );
  //is logged in? <AdminDrawerNavigator /> : <StackNavigator />;
};
export default MainNavigator;
