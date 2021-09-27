import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  VirtualizedList,
  Image,
} from 'react-native';
import {Surface} from 'react-native-paper';
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
  const [tracks, setTracks] = useState([]);
  const [podcasts] = [route.params.podcasts];

  const latestPodcasts = Object.entries(podcasts).map(([key, value]) => ({
    title: value.name,
    id: value.id,
    tracks: value.tracks,
    tag: value.tags,
  }));
  const entPodcasts = Object.entries(podcasts).map(([key, value]) => ({
    title: value.name,
    id: value.id + value.tags,
    tracks: value.tracks,
    tag: value.tags,
  }));
  const eduPodcasts = Object.entries(podcasts).map(([key, value]) => ({
    title: value.name,
    id: value.id + value.tags,
    tracks: value.tracks,
    tag: value.tags,
  }));
  const numbers = [1, 2, 3, 4, 5];
  const doubled = numbers.map(number => number * 2);
  console.log(doubled);

  const checked = podcasts.map(number => number.tracks);

  const latestPodcast = Object.entries(podcasts).map(([key, value]) => {
    return value.tracks;
  });

  const check = Object.keys(podcasts).map(key => podcasts[key]);
  const con = Object.keys(check).map(key => check[key]);
  console.log('pod', latestPodcasts.slice(0, latestPodcasts.length / 4));

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

  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Surface style={{padding: 20}}>
        <Text style={[styles.title, textColor]}>{item.title}</Text>
      </Surface>
    </TouchableOpacity>
  );
  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

  const renderEntItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';
    if (item.tag == 'ent') {
      return (
        <Item
          item={item}
          onPress={() => setSelectedId(item.id)}
          backgroundColor={{backgroundColor}}
          textColor={{color}}
        />
      );
    }
  };

  const renderEduItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';
    if (item.tag == 'edu') {
      return (
        <Item
          item={item}
          onPress={() => setSelectedId(item.id)}
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
  console.log('sel', selectedId);
  const skull = podcasts.map(i => i.tracks);

  const hand = podcasts.map(i => i.tracks.map(t => t));

  const arm = Object.values(hand);
  const leg = arm.map(ar => ar);

  var values = Object.keys(hand).map(function (e) {
    return hand[e];
  });

  //const tired = () =>()

  const dr = () => {
    podcasts.map(item =>
      Object.keys(item.tracks).map(index => {
        return item.tracks[index].name;
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        {latestPodcasts.map(latest => (
          <Text style={styles.surfaceText}>
            {latest.tracks.map((track, i) => (
              <Text style={styles.surfaceText}>{track.name}</Text>
            ))}
          </Text>
        ))}
      </Surface>
      <ScrollView>
        <View style={styles.subContainer}>
          <Text>Latest Podcasts</Text>
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
          <TouchableOpacity onPress={() => navigation.navigate('View All')}>
            <Text>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.albumList}>
          <Text>Entertainment Podcasts</Text>
          <SafeAreaView style={styles.container}>
            <FlatList
              data={entPodcasts.slice(0, latestPodcasts.length / 2)}
              renderItem={renderEntItem}
              keyExtractor={item => item.id}
              extraData={selectedId}
              horizontal
            />
          </SafeAreaView>
          <TouchableOpacity onPress={() => navigation.navigate('View All')}>
            <Text>View All</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>Educational Podcasts</Text>
          <SafeAreaView style={styles.container}>
            <FlatList
              data={eduPodcasts.slice(0, latestPodcasts.length / 2)}
              renderItem={renderEduItem}
              keyExtractor={item => item.id}
              extraData={selectedId}
              horizontal
            />
          </SafeAreaView>
          <TouchableOpacity onPress={() => navigation.navigate('View All')}>
            <Text>View All</Text>
          </TouchableOpacity>
        </View>
        {podcasts.map(latest => {
          return (
            <Album
              key={latest.id}
              id={`Album ID: ${latest.id}`}
              albumName={`Album Name: ${latest.name}`}
              artist={`Artist: ${latest.artist}`}
              tags={`Tags: ${latest.tags}`}
              image={`Image: ${latest.image}`}
              track={latest.tracks.map((track, i) => (
                <>
                  <Text>
                    Track {i + 1}: {track.name}
                    {'\n'}
                  </Text>
                  <Text>
                    artist: {track.artist}
                    {'\n'}
                  </Text>
                  <Text>
                    albumID: {track.albumId}
                    {'\n'}
                  </Text>
                </>
              ))}
            />
          );
        })}
        <SafeAreaView style={styles.item}>
          <FlatList
            horizontal
            data={podcasts}
            renderItem={({item, index}) => (
              <View>
                <TouchableOpacity style={styles.item}>
                  {item.tracks.map((track, i) => (
                    <>
                      <Text>{track.name}</Text>

                      <Text>{track.artist}</Text>
                    </>
                  ))}
                </TouchableOpacity>
              </View>
            )}
          />
        </SafeAreaView>
      </ScrollView>
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
    fontSize: 32,
  },
  surface: {
    padding: 8,
    height: 200,
    //width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 12,
    backgroundColor: 'black',
  },
  surfaceText: {
    color: 'red',
  },
  albumList: {
    marginTop: 10,
    marginBottom: 10,
  },
  lists: {
    margin: 10,
    color: 'red',
  },
});

export default Podcasts;
