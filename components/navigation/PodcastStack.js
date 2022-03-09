import React from 'react';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ViewAll from '../screens/podcast/ViewAll';
import EntPods from '../screens/podcast/EntertainmentPodcasts';
import Podcasts from '../screens/podcast/Podcasts';
import AlbumInfo from '../screens/podcast/AlbumInfo';
import AudioPlayer from '../screens/podcast/AudioPlayer';
import viewGenre from '../screens/podcast/viewGenre';

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
        <Stack.Screen name="View All" component={ViewAll} />
        <Stack.Screen
          name="Entertainment"
          component={EntPods}
          options={({route}) => ({title: route.params.genre})}
        />
        <Stack.Screen
          name="viewGenre"
          component={viewGenre}
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
