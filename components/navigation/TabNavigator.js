import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import PodcastStack from './PodcastStack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import VideoStack from './videoStack';
import UserStack from './userStack';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator shifting={true}>
      <Tab.Screen
        name="Podcasts"
        component={PodcastStack}
        options={{
          tabBarColor: 'black',
          tabBarLabel: 'Podcasts',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="podcast" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Videos"
        component={VideoStack}
        options={{
          tabBarColor: 'grey',
          tabBarLabel: 'Videos',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="video-vintage"
              color={color}
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Users"
        component={UserStack}
        options={{
          tabBarColor: 'black',
          tabBarLabel: 'Users',
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="users" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
