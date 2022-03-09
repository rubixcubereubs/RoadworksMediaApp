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
import {useDispatch} from 'react-redux';
import {addTracks, isPlaying, isVisible} from '../../redux/actions/actions';
import store from '../../redux/store/store';
import TrackPlayer from 'react-native-track-player';

const AlbumInfo = ({route, useState, useEffect}) => {
  const [item] = [route.params.item];
  const [podcasts] = [route.params.podcasts];

  const dispatch = useDispatch();
  const trackItem = Object.entries(item.tracks).map(([key, value]) => ({
    name: value.title,
    artist: value.artist,
    image: value.artwork,
    id: value.id,
    trackUri: value.url,
    tag: value.tags,
    key: parseInt(key, 10),
  }));

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({item}) => {
    const playTrack = () => {
      //console.log(item.tracks[i]);
      //console.log('play track: ', trackItem);
      //console.log('play item: ', item);
      dispatch(isVisible(true));
      TrackPlayer.setupPlayer();
      TrackPlayer.reset();
      dispatch(addTracks(item));
      dispatch(isPlaying(false));
      //TrackPlayer.play();
    };
    return (
      <ListItem
        bottomDivider
        containerStyle={{
          marginTop: 5,
          marginBottom: 5,
          borderRadius: 200,
          backgroundColor: 'black',
          //color: 'white',
          //opacity: 0.8,
        }}>
        <Text style={{color: 'grey'}}>{item.key + 1}</Text>
        <ListItem.Content>
          <ListItem.Title style={{color: 'grey'}}>{item.name}</ListItem.Title>
          <ListItem.Subtitle style={{color: 'grey'}}>
            {item.artist}
          </ListItem.Subtitle>
        </ListItem.Content>
        <Icon
          name="ios-play-circle-outline"
          size={40}
          color="grey"
          onPress={
            //() => {
            //console.log(item);
            //dispatch(isVisible(true));
            //TrackPlayer.setupPlayer();
            //TrackPlayer.reset();
            //dispatch(addTracks(item.tracks.track));
            //dispatch(isPlaying(false));
            //TrackPlayer.play();
            //}
            () => {
              playTrackSingle(item.key);
            }
          }
        />
      </ListItem>
    );
  };
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
  //const playTracks = ;
  //const playTracks = TrackPlayer.add(item.tracks);
  //const playTracks = TrackPlayer.reset();
  //const playTracks = console.log('whyyyyyyyyyyyyyyyyyyyy');
  /*const update = async () => {
    await TrackPlayer.reset();
    await TrackPlayer.add(item.tracks);
    return true;
  };*/
  const playAlbum = () => {
    //console.log(item);
    dispatch(isVisible(true));
    TrackPlayer.setupPlayer();
    TrackPlayer.reset();
    dispatch(addTracks(item.tracks));
    dispatch(isPlaying(false));
    //TrackPlayer.play();
  };
  const playTrackSingle = i => {
    //console.log(item.tracks[i]);
    //console.log(item.tracks[i]);
    dispatch(isVisible(true));
    TrackPlayer.setupPlayer();
    TrackPlayer.reset();
    dispatch(addTracks(item.tracks[i]));
    dispatch(isPlaying(false));
    //TrackPlayer.play();
  };
  const addItem = async => {
    const promised = new Promise((resolve, reject) => {
      resolve(TrackPlayer.reset(), store.dispatch(addTracks(item.tracks)));
    });
    promised().then(() => {
      TrackPlayer.play();
    });
  };
  console.log(item);
  const albumInfo = (
    <ListItem containerStyle={{backgroundColor: 'black', opacity: 0.7}}>
      <ListItem.Content>
        <ListItem.Title style={{color: 'white'}}>{item.name}</ListItem.Title>
        <ListItem.Subtitle style={{color: 'white'}}>
          {item.artist}
          {item.artwork}
        </ListItem.Subtitle>
      </ListItem.Content>
      <TouchableOpacity style={{marginLeft: 'auto'}} onPress={playAlbum}>
        <Icon
          name="ios-play-circle-outline" //"ios-cloud-download-outline"
          size={40}
          color="white"
          style={styles.seekButtons}
        />
      </TouchableOpacity>
    </ListItem>
  );
  const artworkChoice =
    item.artwork == undefined ? 'https://picsum.photos/100' : item.artwork;
  return (
    <View>
      <Surface style={styles.surface}>
        <Image
          source={{uri: artworkChoice}}
          style={{width: 390, height: 200}}
          PlaceholderContent={<ActivityIndicator />}>
          <View style={{marginTop: 'auto'}}>{albumInfo}</View>
        </Image>
      </Surface>
      <ScrollView style={{height: 120, marginTop: 0}}>
        {albumDescription}
      </ScrollView>
      <FlatList
        keyExtractor={keyExtractor}
        data={trackItem}
        renderItem={renderItem}
        style={{marginBottom: 100}}
      />
    </View>
  );
};

export default AlbumInfo;
const styles = StyleSheet.create({
  surface: {
    padding: 8,
    height: 200,
    //width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});
