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
import {ScrollView} from 'react-native-gesture-handler';

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
      containerStyle={{
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 200,
        backgroundColor: 'white',
        //opacity: 0.8,
      }}>
      <Text>{item.key + 1}</Text>
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.artist}</ListItem.Subtitle>
      </ListItem.Content>
      <Icon name="ios-play-circle-outline" size={40} color="black" />
    </ListItem>
  );
  const albumDescription = (
    <Text style={{color: 'grey'}}>
      Some text about the album...Lorem ipsum dolor sit amet, consectetur
      adipiscing elit. Ut aliquet tellus tempus tempus tincidunt. Suspendisse at
      lacinia magna. Donec ultricies libero eget varius dapibus. Orci varius
      natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      Praesent consequat, dolor non tristique sollicitudin, felis magna iaculis
      ante, at pharetra metus diam placerat dolor. Class aptent taciti sociosqu
      ad litora torquent per conubia nostra, per inceptos himenaeos. Integer
      tortor diam, scelerisque ac leo vel, dapibus consectetur urna. Phasellus
      ac enim tortor. Vestibulum in sem eu justo aliquet condimentum nec quis
      quam. Proin auctor nunc quis tellus convallis, finibus efficitur metus
      ornare. Cras eu velit at urna varius interdum eget quis nunc. Etiam ac
      augue consectetur, venenatis nisi quis, facilisis erat. Nam elementum
      tellus nec dapibus porttitor. Aliquam lorem orci, placerat id blandit at,
      maximus ut nibh. Phasellus convallis enim ac velit pellentesque, ut
      lacinia sem vulputate.
    </Text>
  );
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
      <ScrollView style={{height: 120, marginTop: 5}}>
        {albumDescription}
      </ScrollView>
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
