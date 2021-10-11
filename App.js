import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StartStack from './components/navigation/StartStack';
import PodcastStack from './components/navigation/PodcastStack';

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

export default App;
