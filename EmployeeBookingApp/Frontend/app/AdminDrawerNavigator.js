import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import Home from './components/Home';
import Tasks from './components/Tasks';
import { useLogin } from './context/LoginProvider';
import Employees from './components/admin/Employees';
import Complains from './components/admin/Complains';
import AddItems from './components/admin/AddItems';
import ViewItems from './components/admin/ViewItems';
import AddWorkType from './components/admin/AddWorkType';
import ViewWorkType from './components/admin/ViewWorkType';
import Booking from './components/admin/Bookings';
const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
  const { setAdminLoggedIn, profile } = useLogin();
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
        onPress={() => setAdminLoggedIn(false)}
      >
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />} >

      <Drawer.Screen component={Employees} name='Employees' />
      <Drawer.Screen component={ViewWorkType} name='ViewWorkType' />
      <Drawer.Screen component={AddWorkType} name='AddWorkType' />
      <Drawer.Screen component={Complains} name='Complains' />
      <Drawer.Screen component={AddItems} name='AddItems' />
      <Drawer.Screen component={ViewItems} name='ViewItems' />
      <Drawer.Screen component={Booking} name='Bookings' />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
