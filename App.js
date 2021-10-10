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
import Home from './components/screens/Home';
import ViewAll from './components/screens/ViewAll';
import Podcasts from './components/screens/Podcasts';
import AlbumInfo from './components/screens/AlbumInfo';
import OnboardingScreen from './components/screens/onboarding';
import EntPods from './components/screens/EntertainmentPodcasts';
import AudioPlayer from './components/screens/AudioPlayer';
import StartStack from './components/navigation/StartStack';
import PodcastStack from './components/navigation/PodcastStack';
//import Test from './components/navigation/screens/test';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Start"
          component={StartStack}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Podcast"
          component={PodcastStack}
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
