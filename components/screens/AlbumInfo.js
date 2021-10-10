import React from 'react';
import {Touchable, TouchableOpacity} from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Surface} from 'react-native-paper';
import {ListItem, Avatar, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

const AlbumInfo = ({route, useState, useEffect}) => {
  const [item] = [route.params.item];
  const [podcasts] = [route.params.podcasts];

  const trackItem = Object.entries(item.tracks).map(([key, value]) => ({
    name: value.name,
    artist: value.artist,
    image: value.image,
    id: value.id,
    trackUri: value.trackUri,
    tag: value.tags,
    key: parseInt(key, 10),
  }));

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({item}) => (
    <ListItem bottomDivider>
      <Text>{item.key + 1}</Text>
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.artist}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
  console.log('album: ', item);
  return (
    <View>
      <Surface style={styles.surface}>
        <Image
          source={require(`../../media/images/circle.jpg`)}
          style={{width: 390, height: 300}}
          PlaceholderContent={<ActivityIndicator />}>
          <Text>{item.name}</Text>
          <Text>{item.artist}</Text>
          <Text>{item.image}</Text>
          <TouchableOpacity>
            <Icon
              name="ios-cloud-download-outline"
              size={30}
              color="white"
              style={styles.seekButtons}
            />
          </TouchableOpacity>
        </Image>
      </Surface>
      <FlatList
        keyExtractor={keyExtractor}
        data={trackItem}
        renderItem={renderItem}
      />
    </View>
  );
};

export default AlbumInfo;
const styles = StyleSheet.create({
  surface: {
    padding: 8,
    height: 300,
    //width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});
