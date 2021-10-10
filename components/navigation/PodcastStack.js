import React from 'react';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home';
import ViewAll from '../screens/ViewAll';
import EntPods from '../screens/EntertainmentPodcasts';
import Podcasts from '../screens/Podcasts';
import AlbumInfo from '../screens/AlbumInfo';
import {NavigationContainer} from '@react-navigation/native';
import AudioPlayer from '../screens/AudioPlayer';

const Stack = createNativeStackNavigator();
StatusBar.setBarStyle('light-content');
const PodcastStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Podcasts"
        screenOptions={{
          headerStyle: {backgroundColor: 'black'},
          headerTintColor: 'white',
          contentStyle: {backgroundColor: 'black'},
        }}>
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
        <Stack.Screen
          name="Podcasts"
          options={{headerShown: true}}
          component={Podcasts}
        />
        <Stack.Screen
          name="Album"
          component={AlbumInfo}
          options={({route}) => ({title: route.params.item.name})}
        />
      </Stack.Navigator>
      <AudioPlayer />
    </>
  );
};

export default PodcastStack;
