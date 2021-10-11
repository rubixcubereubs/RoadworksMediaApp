import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/onboarding';

const Stack = createNativeStackNavigator();

const StartStack = () => {
  return (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen
        options={{headerShown: false}}
        name="Onboarding"
        component={OnboardingScreen}
      />
    </Stack.Navigator>
  );
};

export default StartStack;
