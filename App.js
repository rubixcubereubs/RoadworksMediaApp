import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StartStack from './components/navigation/StartStack';
import PodcastStack from './components/navigation/PodcastStack';
/*import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();*/
import {Provider} from 'react-redux';
import store from './components/redux/store/store';

//store
//action
//reducer
//dispatch

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
