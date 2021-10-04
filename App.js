/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './components/navigation/screens/Home';
import ViewAll from './components/navigation/screens/ViewAll';
import Podcasts from './components/navigation/screens/Podcasts';
import AlbumInfo from './components/navigation/screens/AlbumInfo';
import OnboardingScreen from './components/navigation/screens/onboarding';
import EntPods from './components/navigation/screens/EntertainmentPodcasts';
//import Test from './components/navigation/screens/test';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Onboarding"
          component={OnboardingScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={Home}
        />
        <Stack.Screen name="View All" component={ViewAll} />
        <Stack.Screen
          name="Entertainment"
          component={EntPods}
          options={({route}) => ({title: route.params.genre})}
        />
        <Stack.Screen name="Podcasts" component={Podcasts} />
        <Stack.Screen
          name="Album"
          component={AlbumInfo}
          options={({route}) => ({title: route.params.item.title})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
