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
    <ListItem
      bottomDivider
      containerStyle={{marginTop: 5, marginBottom: 5, borderRadius: 200}}>
      <Text>{item.key + 1}</Text>
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.artist}</ListItem.Subtitle>
      </ListItem.Content>
      <Icon name="ios-play-circle-outline" size={40} color="black" />
    </ListItem>
  );
  console.log('album: ', item);
  const albumInfo = (
    <ListItem containerStyle={{backgroundColor: 'black', opacity: 0.7}}>
      <ListItem.Content>
        <ListItem.Title style={{color: 'white'}}>{item.name}</ListItem.Title>
        <ListItem.Subtitle style={{color: 'white'}}>
          {item.artist}
        </ListItem.Subtitle>
      </ListItem.Content>
      <TouchableOpacity style={{marginLeft: 'auto'}}>
        <Icon
          name="ios-play-circle-outline" //"ios-cloud-download-outline"
          size={40}
          color="white"
          style={styles.seekButtons}
        />
      </TouchableOpacity>
    </ListItem>
  );
  return (
    <View>
      <Surface style={styles.surface}>
        <Image
          source={{uri: 'https://picsum.photos/100'}}
          style={{width: 390, height: 300}}
          PlaceholderContent={<ActivityIndicator />}>
          <View style={{marginTop: 'auto'}}>{albumInfo}</View>
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
