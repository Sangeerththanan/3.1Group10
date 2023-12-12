

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomePage from './components/WelcomePage';
import AppForm from './components/EmployeerAppForm';
import { useLogin } from './context/ELoginProvider';
import DrawerNavigator from './EDNavigator';
import LoginForm from './components/ELoginForm';
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={WelcomePage} name='WelcomePage' />
      <Stack.Screen component={AppForm} name='EmployeerAppForm' />
     <Stack.Screen component={LoginForm} name='ELoginForm' />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? <EDNavigator /> : <StackNavigator />;
};
export default MainNavigator;
