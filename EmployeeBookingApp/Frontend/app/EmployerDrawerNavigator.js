import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import { useLogin } from './context/LoginProvider';
import EmployerProfile from './components/employer/EmployerProfile';
import EmployeeComplain from './components/employer/EmployeeComplain';
import Employment from './components/employee/Employment';
import Discount from './components/employer/Discount';
import Booking from './components/employer/Booking';
import MyBookings from './components/employer/MyBookings';

const Drawer = createDrawerNavigator();   

const CustomDrawer = (props) => {
  const { setEmployerLoggedIn, profile } = useLogin();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            // flexDirection: 'row',
            // justifyContent: 'space-between',
            // alignItems: 'center',
            padding: 20,
            backgroundColor: '#f6f6f6',
            marginBottom: 20,
          }}>
          <View>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1624243225303-261cc3cd2fbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' }}
              style={{ width: 60, height: 60, borderRadius: 30 }}
            />
            <Text>{profile.name}</Text>
            <Text>{profile.email}</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 0,
          left: 0,
          bottom: 50,
          backgroundColor: '#f6f6f6',
          padding: 20,
        }}
        onPress={() => setEmployerLoggedIn(false)}
      >
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
const EmployerDrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />} >
      <Drawer.Screen component={EmployerProfile} name='Profile' />
      <Drawer.Screen component={Booking} name='Booking' />
      <Drawer.Screen component={MyBookings} name='MyBookings' />
      <Drawer.Screen component={Discount} name='Discount' />
      <Drawer.Screen component={EmployeeComplain} name='Complain' />
    </Drawer.Navigator>
  );
};

export default EmployerDrawerNavigator;