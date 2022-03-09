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
} from 'react-native';
import {ActivityIndicator, Surface} from 'react-native-paper';
import {ListItem, Image} from 'react-native-elements';

function VideoHome({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const pic = 'https://picsum.photos/100';
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      name: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      name: 'Third Item',
    },
  ];
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
        onPress={() =>
          navigation.navigate('Video Info', {
            item: item,
          })
        }
        //onPress={() => console.log('pressed => ', item.id)}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

  /*const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const renderItem = ({item}) => <Item title={item.title} />;*/
  return (
    <View style={styles.container}>
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
            <TouchableOpacity>
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
                        Title
                      </ListItem.Title>
                      <ListItem.Subtitle style={{color: 'white'}}>
                        Subtitle
                      </ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                  <Text>Featured Video</Text>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <SafeAreaView style={styles.container}>
              <Text style={{color: 'white'}}>Title</Text>
              <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}
                horizontal
              />
            </SafeAreaView>

            <Text style={{color: 'white'}}>Title</Text>
            <Text style={{color: 'white'}}>Title</Text>
            <Text style={{color: 'white'}}>Title</Text>
            <Text style={{color: 'white'}}>Title</Text>
            <Text style={{color: 'white'}}>Title</Text>
            <Text style={{color: 'white'}}>Title</Text>
            <Text style={{color: 'white'}}>Title</Text>
            <Text style={{color: 'white'}}>Title</Text>
            <Text style={{color: 'white'}}>Title</Text>
            <Text style={{color: 'white'}}>Title</Text>
            <Text style={{color: 'white'}}>Title</Text>
            <Text style={{color: 'white'}}>Title</Text>
            <Text style={{color: 'white'}}>Title</Text>
            <Text style={{color: 'white'}}>Title</Text>
            <Text style={{color: 'white'}}>Title</Text>
            <Text style={{color: 'white'}}>Title</Text>
            <Text style={{color: 'white'}}>Title</Text>
            <Text style={{color: 'white'}}>Title</Text>
            <Text style={{color: 'white'}}>Title</Text>
            <Text style={{color: 'white'}}>Title</Text>
            <Text style={{color: 'white'}}>Title</Text>
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
});

export default VideoHome;
