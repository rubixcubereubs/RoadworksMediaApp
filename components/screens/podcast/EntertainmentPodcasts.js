// Import React Component
import React, {useState, useEffect} from 'react';

// Import Components
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import {ListItem, Avatar} from 'react-native-elements';
import {Icon} from 'react-native-elements';

const EntPods = ({route, navigation}) => {
  const [albums] = [route.params.albums];
  const albumType = route.params.albumType;
  console.log('album type: ', albumType, ' ', 'album: ', albums);

  return (
    <View>
      {Object.entries(albums).map((value, key) => {
        if (value.tags == albumType) {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Album', {
                  item: value,
                  podcasts: albums,
                })
              }>
              <ScrollView key={key}>
                <ListItem
                  bottomDivider
                  containerStyle={{
                    marginTop: 5,
                    marginBottom: 5,
                    borderRadius: 200,
                    backgroundColor: 'black',
                  }}>
                  <Avatar source={{uri: 'https://picsum.photos/100'}} />
                  <ListItem.Content key={value.id}>
                    <ListItem.Title style={{color: 'grey'}}>
                      {value.name}
                    </ListItem.Title>
                    <ListItem.Subtitle style={{color: 'grey'}}>
                      {value.artist}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={{color: 'grey'}}>
                      {value.album}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              </ScrollView>
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
};

export default EntPods;
