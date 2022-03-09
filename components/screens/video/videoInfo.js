import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Button,
} from 'react-native';
import {ActivityIndicator, Surface} from 'react-native-paper';
import {ListItem, Image} from 'react-native-elements';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';

function VideoInfo({route}) {
  const [refreshing, setRefreshing] = useState(false);
  const [item] = [route.params.item];
  const pic = 'https://picsum.photos/100';
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [selectedId, setSelectedId] = useState(null);
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
        onPress={() => console.log('pressed => ', item.name)}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlaying = () => {};

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

  const [favourite, setFavourite] = useState(false);
  const videoData = (
    <View>
      <ListItem
        containerStyle={{
          backgroundColor: 'black',
          opacity: 0.7,
        }}>
        <ListItem.Content>
          <ListItem.Title style={{color: 'white'}}>{item.name}</ListItem.Title>
          <ListItem.Subtitle style={{color: 'white'}}>
            {item.id}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </View>
  );
  const favouriteIcon = (
    <Icon
      name="favorite" //"ios-cloud-download-outline"
      size={30}
      color="red"
      style={styles.seekButtons}
    />
  );
  const unfavouriteIcon = (
    <Icon
      name="favorite-border" //"ios-cloud-download-outline"
      size={30}
      color="white"
      style={styles.seekButtons}
    />
  );
  /*const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const renderItem = ({item}) => <Item title={item.title} />;
  
  
  
  <View>
            <Text style={{color: 'white'}}>{item.name}</Text>
            <Text style={{color: 'white'}}>{item.id}</Text>
            <Text style={{color: 'white'}}>
              TO DO: video player (where image is), video player controls, video
              description, favourite button (add for podcasts too), comments?
            </Text>
          </View>*/
  return (
    <View style={styles.container}>
      <View>
        <Surface style={styles.surface}>
          <Text>Ad banner</Text>
        </Surface>

        <View style={styles.videoContainer}>
          <Video
            source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
            //source={video}
            paused={!isPlaying}
            controls={true}
            style={styles.backgroundVideo}
            muted={isMuted}
            resizeMode="contain"
          />
        </View>
        <ScrollView style={{marginBottom: 10}}>
          <View>
            <TouchableOpacity>
              <Text
                style={{color: 'white'}}
                onPress={() => {
                  favourite ? setFavourite(false) : setFavourite(true);
                  console.log(favourite ? 'Favourite' : 'Unfavourite');
                }}>
                {favourite ? unfavouriteIcon : favouriteIcon}
              </Text>
            </TouchableOpacity>
          </View>
          {videoData}
          <ScrollView style={{height: 120, marginTop: 0}}>
            {albumDescription}
          </ScrollView>
          <View>
            <Text style={{color: 'white'}}>Cast List</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

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
  videoContainer: {
    marginTop: 10,
    marginBottom: 10,
    height: 149,
    //width: '100%',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    //padding: 8,
    //height: 150,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 12,
    //backgroundColor: 'white',
    //overflow: 'hidden',
    /*borderBottomWidth: 1,
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: 'white',*/
  },
  seekButtons: {
    marginLeft: 'auto',
  },
});

export default VideoInfo;
