import React from 'react';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import VideoHome from '../screens/video/home';
import VideoInfo from '../screens/video/videoInfo';

const Stack = createNativeStackNavigator();
StatusBar.setBarStyle('light-content');
const VideoStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Videos"
        screenOptions={{
          headerStyle: {backgroundColor: 'black'},
          headerTintColor: 'white',
          contentStyle: {backgroundColor: 'black'},
        }}>
        <Stack.Screen name="Videos" component={VideoHome} />
        <Stack.Screen
          name="Video Info"
          component={VideoInfo}
          options={({route}) => ({title: route.params.item.name})}
        />
      </Stack.Navigator>
    </>
  );
};

export default VideoStack;
