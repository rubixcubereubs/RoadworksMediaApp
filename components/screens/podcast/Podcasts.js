import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import {Surface} from 'react-native-paper';
import {Button, Image, ListItem} from 'react-native-elements';
import AudioPlayer from './AudioPlayer';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../redux/actions/actions';
import store from '../../redux/store/store';
import {firebase} from '@react-native-firebase/database';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Podcasts = ({navigation, route}) => {
  const [selectedId, setSelectedId] = useState(null);
  /*const [tracks, setTracks] = useState([]);
  const [educationAlbums, setEducationAlbums] = useState([]);
  const [entertainmentAlbums, setEntertainmentAlbums] = useState([]);
  //const [podcasts] = [route.params.podcasts];
  //const [podcastsError, setPodcastsError] = useState(null);
  const [podcastsLoaded, setPodcastsLoaded] = useState(false);
  //const [podcasts, setPodcasts] = useState([]);*/

  const localhost = 'http://192.168.1.225:8080';
  const api = 'https://roadworksmediabackend.herokuapp.com/albums';
  const awsApi =
    'https://roadworksmediatest.s3.eu-west-2.amazonaws.com/podcasts/audioMetadata/albums.json';

  /*useEffect(() => {
    dispatch(getPodcasts());
  }, []);*/
  /*const database = firebase
    .app()
    .database(
      'https://roadworksmediaapp-default-rtdb.europe-west1.firebasedatabase.app/',
    )
    .ref('/albums');*/

  const firebasePodcasts = useEffect(() => {
    firebase
      .app()
      .database(
        'https://roadworksmediaapp-default-rtdb.europe-west1.firebasedatabase.app/',
      )
      .ref('/albums')
      .once('value')
      .then(snapshot => {
        dispatch(actions.fetchPodcastsRequest(true));
        dispatch(actions.fetchPodcastsSuccess(snapshot.val()));
        dispatch(actions.fetchPodcastsRequest(false));
        console.log('User data: ', snapshot.val());
      });
  }, []);

  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000)
      .then(() =>
        firebase
          .app()
          .database(
            'https://roadworksmediaapp-default-rtdb.europe-west1.firebasedatabase.app/',
          )
          .ref('/albums')
          .once('value')
          .then(snapshot => {
            dispatch(actions.fetchPodcastsRequest(true));
            dispatch(actions.fetchPodcastsSuccess(snapshot.val()));
            dispatch(actions.fetchPodcastsRequest(false));
            console.log('User data: ', snapshot.val());
          }),
      )
      .then(() => setRefreshing(false));
    /*fetch(`${awsApi}`)
      .then(res => {
        return res.json();
      })
      .then(
        result => {
          dispatch(actions.fetchPodcastsRequest(true));
          dispatch(actions.fetchPodcastsSuccess(result));
          dispatch(actions.fetchPodcastsRequest(false));
          //console.log('api', result);
        },

        error => {
          dispatch(actions.fetchPodcastsRequest(true));
          dispatch(actions.fetchPodcastsFailure(error));
          console.log('error: ', error);
        },
      );
    firebasePodcasts;
    setRefreshing(false);*/
  }, []);
  /* useEffect(() => {
    fetch(`${api}/albums`)
      .then(res => {
        return res.json();
      })
      .then(
        result => {
          setPodcastsLoaded(true);
          setPodcasts(result);
          //console.log('api', result);
        },

        error => {
          setPodcastsLoaded(true);
          setPodcastsError(error);
          console.log('error: ', error);
        },
      );
  }, []);*/

  useEffect(() => {
    /*fetch(`${awsApi}`)
      .then(res => {
        return res.json();
      })
      .then(
        result => {
          dispatch(actions.fetchPodcastsRequest(true));
          dispatch(actions.fetchPodcastsSuccess(result));
          dispatch(actions.fetchPodcastsRequest(false));
          //console.log('api', result);
        },

        error => {
          dispatch(actions.fetchPodcastsRequest(true));
          dispatch(actions.fetchPodcastsFailure(error));
          console.log('error: ', error);
        },
      );*/
    firebasePodcasts;
  }, []);

  /*useEffect(() => {
    getPodcasts();
  }, []);*/

  // console.log('props: ', this.props.podcastData);
  //console.log('audio', audioPlayer);
  const reduxPods = useSelector(state => state.podcasts);
  const thePodcasts = reduxPods.reduxPodcasts;
  const podcastsLoaded = reduxPods.loading;
  console.log('abc', thePodcasts);
  console.log('state: ', store.getState());

  const latestPodcasts = Object.entries(thePodcasts).map(([key, value]) => ({
    name: value.name,
    artist: value.artist,
    image: value.image,
    id: value.id,
    tracks: value.tracks,
    tag: value.tags,
  }));
  const entPodcasts = Object.entries(thePodcasts).map(([key, value]) => ({
    name: value.name,
    artist: value.artist,
    image: value.image,
    id: value.id + value.tags,
    tracks: value.tracks,
    tag: value.tags,
  }));
  const eduPodcasts = Object.entries(thePodcasts).map(([key, value]) => ({
    name: value.name,
    artist: value.artist,
    image: value.image,
    id: value.id + value.tags,
    tracks: value.tracks,
    tag: value.tags,
  }));

  const pic = 'https://picsum.photos/100';
  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Surface style={{padding: 2}}>
        <Image
          source={{uri: pic}}
          style={{width: 100, height: 150}}
          PlaceholderContent={<ActivityIndicator />}
        />
      </Surface>
      <Text style={[styles.title, textColor]}>{item.name}</Text>
    </TouchableOpacity>
  );
  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? 'black' : 'black';
    const color = item.id === selectedId ? 'white' : 'white';

    return (
      <Item
        item={item}
        onPress={() =>
          navigation.navigate('Album', {
            item: item,
            podcasts: thePodcasts,
          })
        }
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

  const renderEntItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? 'black' : 'black';
    const color = item.id === selectedId ? 'white' : 'white';
    if (item.tag == 'ent') {
      //setEntertainmentAlbums([...entertainmentAlbums, item]);

      return (
        <Item
          item={item}
          onPress={() =>
            navigation.navigate('Album', {
              item: item,
              podcasts: thePodcasts,
            })
          }
          backgroundColor={{backgroundColor}}
          textColor={{color}}
        />
      );
    }
  };
  //console.log('ent: ', entertainmentAlbums);
  const renderEduItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? 'black' : 'black';
    const color = item.id === selectedId ? 'white' : 'white';
    if (item.tag == 'edu') {
      return (
        <Item
          item={item}
          onPress={() =>
            navigation.navigate('Album', {
              item: item,
              podcasts: thePodcasts,
            })
          }
          backgroundColor={{backgroundColor}}
          textColor={{color}}
        />
      );
    }
  };
  const Album = ({albumName, artist, image, track, id, tags}) => (
    <>
      <TouchableOpacity>
        <Text>{albumName}</Text>
      </TouchableOpacity>
      <Text>{id}</Text>
      <Text>{artist}</Text>
      <Text>{image}</Text>
      <Text>{tags}</Text>
      <Text>{track}</Text>
    </>
  );
  const FeaturedPodcast = () => {
    Object.entries(latestPodcasts).map(([key, value]) => {
      if (key == 0) {
        return <Text>{value.name}</Text>;
      }
    });
  };

  return (
    <View style={styles.container}>
      {StatusBar.setBarStyle('light-content')}

      {podcastsLoaded ? (
        <View>
          <Surface style={styles.surface}>
            <Text>Ad banner</Text>
          </Surface>

          <ScrollView
            style={{marginBottom: 50}}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="white"
              />
            }>
            <View style={styles.featuredPodcast}>
              {Object.entries(latestPodcasts).map(([key, value]) => {
                if (key == 0) {
                  return (
                    <View>
                      <ImageBackground
                        source={{uri: pic}}
                        style={{width: '100%', height: '100%'}}
                        PlaceholderContent={<ActivityIndicator />}>
                        <ListItem
                          containerStyle={{
                            backgroundColor: 'black',
                            opacity: 0.7,
                          }}>
                          <ListItem.Content>
                            <ListItem.Title style={{color: 'white'}}>
                              {value.name}
                            </ListItem.Title>
                            <ListItem.Subtitle style={{color: 'white'}}>
                              {value.artist}
                            </ListItem.Subtitle>
                          </ListItem.Content>
                          <TouchableOpacity
                            style={{marginLeft: 'auto'}}
                            onPress={() =>
                              navigation.navigate('Album', {
                                item: value,
                                podcasts: thePodcasts,
                              })
                            }>
                            <Icon
                              name="navigate-next" //"ios-cloud-download-outline"
                              size={40}
                              color="white"
                              style={styles.seekButtons}
                            />
                          </TouchableOpacity>
                        </ListItem>
                        <Text>{value.name}</Text>
                      </ImageBackground>
                    </View>
                  );
                }
              })}
            </View>
            <View style={styles.subContainer}>
              <SafeAreaView style={styles.container}>
                <Text style={styles.albumListTitle}>Latest Podcasts</Text>
                <FlatList
                  data={latestPodcasts.slice(0, latestPodcasts.length / 3)}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  extraData={selectedId}
                  initialNumToRender={2}
                  maxToRenderPerBatch={4}
                  horizontal
                />
                <Button
                  title="View All"
                  type="clear"
                  raised
                  onPress={() => navigation.navigate('View All')}
                />
              </SafeAreaView>
            </View>
            <View style={styles.albumList}>
              <SafeAreaView style={styles.container}>
                <Text style={styles.albumListTitle}>
                  Entertainment Podcasts
                </Text>
                <FlatList
                  data={entPodcasts.slice(0, latestPodcasts.length / 2)}
                  renderItem={renderEntItem}
                  keyExtractor={item => item.id}
                  extraData={selectedId}
                  horizontal
                />
                <Button
                  title="View All"
                  type="clear"
                  raised
                  onPress={() =>
                    navigation.navigate('viewGenre', {
                      //albums: thePodcasts,
                      albumType: 'ent',
                      genre: 'Entertainment',
                    })
                  }
                />
              </SafeAreaView>
            </View>
            <View>
              <SafeAreaView style={styles.container}>
                <Text style={styles.albumListTitle}>Educational Podcasts</Text>
                <FlatList
                  data={eduPodcasts.slice(0, latestPodcasts.length / 2)}
                  renderItem={renderEduItem}
                  keyExtractor={item => item.id}
                  extraData={selectedId}
                  horizontal
                />
                <Button
                  title="View All"
                  type="clear"
                  raised
                  onPress={() =>
                    navigation.navigate('viewGenre', {
                      //podcasts: thePodcasts,
                      albumType: 'edu',
                      genre: 'Education',
                    })
                  }
                />
              </SafeAreaView>
            </View>
          </ScrollView>
        </View>
      ) : (
        <View>
          <ActivityIndicator size="large" />
          <Text style={{color: 'white'}}>Loading Podcasts</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: StatusBar.currentHeight || 0,
  },
  subContainer: {
    flex: 1,
    marginTop: 30,
  },
  featuredPodcast: {
    flex: 3,
    //marginTop: 30,
    height: 250,
  },
  item: {
    //padding: 20,
    marginVertical: 20,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
  surface: {
    padding: 8,
    height: 50,
    //width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 12,
    backgroundColor: 'white',
    overflow: 'hidden',
    borderBottomWidth: 1,
    //borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: 'white',
  },
  surfaceBottom: {
    padding: 8,
    height: 100,
    //width: 80,
    //alignItems: 'center',
    justifyContent: 'center',
    elevation: 12,
    //backgroundColor: 'black',
    overflow: 'hidden',
    flex: 1,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // alignItems: 'flex-start',
  },
  surfaceText: {
    color: 'red',
    width: '33%',
  },
  albumList: {
    marginTop: 10,
    marginBottom: 10,
  },
  albumListTitle: {
    color: 'white',
  },
  lists: {
    margin: 10,
    color: 'red',
  },
});

export default Podcasts;
