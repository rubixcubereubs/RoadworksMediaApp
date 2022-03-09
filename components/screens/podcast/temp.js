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
import {useSelector, useDispatch, connect} from 'react-redux';
import {getPodcasts, increment, decrement} from '../redux/actions/actions';
import store from '../redux/store/store';

const temp = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);

  const reduxPods = useSelector(state => state.podcasts);
  //const reduxPods = store.getState().podcasts;
  const audioPlayer = useSelector(state => state.audioPlayer);
  const dispatch = useDispatch();

  useEffect(() => {
    getPodcasts();
  }, [getPodcasts]);

  // console.log('props: ', this.props.podcastData);
  //console.log('audio', audioPlayer);
  const thePodcasts = reduxPods.reduxPodcasts;
  console.log('abc', thePodcasts);
  //console.log('state: ', store.getState());
  const latestPodcasts = Object.entries(thePodcasts).map(([key, value]) => ({
    name: value.name,
    artist: value.artist,
    image: pic,
    id: value.id,
    tracks: value.tracks,
    tag: value.tags,
  }));
  const entPodcasts = Object.entries(thePodcasts).map(([key, value]) => ({
    name: value.name,
    artist: value.artist,
    image: pic,
    id: value.id + value.tags,
    tracks: value.tracks,
    tag: value.tags,
  }));
  const eduPodcasts = Object.entries(thePodcasts).map(([key, value]) => ({
    name: value.name,
    artist: value.artist,
    image: pic,
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

  return (
    <View style={styles.container}>
      {StatusBar.setBarStyle('light-content')}
      {reduxPods.loading ? (
        <View>
          <ActivityIndicator size="large" />
          <Text style={{color: 'white'}}>Loading Podcasts</Text>
        </View>
      ) : reduxPods.error ? (
        <Text>{reduxPods.error}</Text>
      ) : (
        <>
          <View>
            <Surface style={styles.surface}>
              <Text>Ad banner </Text>
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
                <Text style={styles.albumListTitle}>
                  Entertainment Podcasts
                </Text>
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
        </>
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

/*cconst mapStateToProps = state => {
  const podcastsItems = state;
  return {
    mapPodcasts: podcastsItems.podcasts.reduxPodcasts,
  };
};

onst mapDispatchToProps = dispatch => {
  return {
    getPodcasts: () => dispatch(getPodcasts()),
  };
};*/
