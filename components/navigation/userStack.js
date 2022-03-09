import React from 'react';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserHome from '../screens/user/home';

const Stack = createNativeStackNavigator();
StatusBar.setBarStyle('light-content');
const UserStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Users"
        screenOptions={{
          headerStyle: {backgroundColor: 'black'},
          headerTintColor: 'white',
          contentStyle: {backgroundColor: 'black'},
        }}>
        <Stack.Screen name="Users" component={UserHome} />
      </Stack.Navigator>
    </>
  );
};

export default UserStack;
