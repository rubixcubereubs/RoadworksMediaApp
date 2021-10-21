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
} from 'react-native';
import {Surface} from 'react-native-paper';
import {Button, Image} from 'react-native-elements';
import AudioPlayer from './AudioPlayer';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../redux/actions/actions';
import store from '../redux/store/store';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];
const DATA1 = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d7',
    title: 'Third Item',
  },
];
const DATA2 = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d',
    title: 'Third Item',
  },
];

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
  const api = 'https://roadworksmediabackend.herokuapp.com';

  /*useEffect(() => {
    dispatch(getPodcasts());
  }, []);*/

  const dispatch = useDispatch();

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
    fetch(`${api}/albums`)
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
  const numbers = [1, 2, 3, 4, 5];
  const doubled = numbers.map(number => number * 2);
  //console.log(doubled);

  //const checked = podcasts.map(number => number.tracks);

  /*const latestPodcast = Object.entries(podcasts).map(([key, value]) => {
    return value.tracks;
  });

  const check = Object.keys(podcasts).map(key => podcasts[key]);
  const con = Object.keys(check).map(key => check[key]);*/
  //console.log('pod', latestPodcasts.slice(0, latestPodcasts.length / 4));

  //const check = checked.map(numb => numb);
  //console.log('check', check);
  /*const latestPodcast = podcasts.map(([key, value]) => {
    console.log('inside 1st one:', value.tracks);
  });
  /*Object.entries(value).map(([i, track]) => ({
      title: track.name,
      id: track.id,
    }));
  });*/

  //console.log('lot:', latest);
  const pic = 'https://picsum.photos/100';
  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Surface style={{padding: 2}}>
        <Image
          source={{uri: pic}}
          style={{width: 150, height: 200}}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text style={[styles.title, textColor]}>{item.name}</Text>
      </Surface>
    </TouchableOpacity>
  );
  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'red' : 'black';

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
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'red' : 'black';
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
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'red' : 'black';
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

  return (
    <View style={styles.container}>
      {StatusBar.setBarStyle('light-content')}

      {podcastsLoaded ? (
        <View>
          <Surface style={styles.surface}>
            <Text>Ad banner</Text>
          </Surface>

          <ScrollView style={{marginBottom: 50}}>
            <View style={styles.subContainer}>
              <Text style={styles.albumListTitle}>Latest Podcasts</Text>
              <SafeAreaView style={styles.container}>
                <FlatList
                  data={latestPodcasts.slice(0, latestPodcasts.length / 3)}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  extraData={selectedId}
                  initialNumToRender={2}
                  maxToRenderPerBatch={4}
                  horizontal
                />
              </SafeAreaView>

              <Button
                title="View All"
                type="clear"
                raised
                onPress={() => navigation.navigate('View All')}
              />
            </View>
            <View style={styles.albumList}>
              <Text style={styles.albumListTitle}>Entertainment Podcasts</Text>
              <SafeAreaView style={styles.container}>
                <FlatList
                  data={entPodcasts.slice(0, latestPodcasts.length / 2)}
                  renderItem={renderEntItem}
                  keyExtractor={item => item.id}
                  extraData={selectedId}
                  horizontal
                />
              </SafeAreaView>
              <Button
                title="View All"
                type="clear"
                raised
                onPress={() =>
                  navigation.navigate('Entertainment', {
                    albums: thePodcasts,
                    albumType: 'ent',
                    genre: 'Entertainment',
                  })
                }
              />
            </View>
            <View>
              <Text style={styles.albumListTitle}>Educational Podcasts</Text>
              <SafeAreaView style={styles.container}>
                <FlatList
                  data={eduPodcasts.slice(0, latestPodcasts.length / 2)}
                  renderItem={renderEduItem}
                  keyExtractor={item => item.id}
                  extraData={selectedId}
                  horizontal
                />
              </SafeAreaView>
              <Button
                title="View All"
                type="clear"
                raised
                onPress={() =>
                  navigation.navigate('Entertainment', {
                    albums: thePodcasts,
                    albumType: 'edu',
                    genre: 'Education',
                  })
                }
              />
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
