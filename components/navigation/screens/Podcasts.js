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
  const [DATA, DATA1, DATA2, podcasts] = [
    route.params.DATA[0],
    route.params.DATA[1],
    route.params.DATA[2],
    route.params.podcasts,
  ];
  console.log('podcasts', podcasts);
  const Item = ({item, onPress, backgroundColor, textColor}) => {
    return Object.entries(podcasts).map(([key, value]) => {
      return (
        <TouchableOpacity
          key={key}
          onPress={onPress}
          style={[styles.item, backgroundColor]}>
          <Text key={key} style={[styles.title, textColor]}>
            {value.name}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  const list = [podcasts];

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
  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        <Text style={styles.surfaceText}>Surface</Text>
      </Surface>
      <ScrollView>
        <View style={styles.subContainer}>
          <Text>Latest Podcasts</Text>
          <FlatList
            data={list}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
            horizontal
          />
          <TouchableOpacity onPress={() => navigation.navigate('View All')}>
            <Text>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.albumList}>
          <Text>Entertainment Podcasts</Text>
          <FlatList
            data={list}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
            horizontal
          />
          <TouchableOpacity onPress={() => navigation.navigate('View All')}>
            <Text>View All</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>Educational Podcasts</Text>
          <FlatList
            data={list}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
            horizontal
          />
          <TouchableOpacity onPress={() => navigation.navigate('View All')}>
            <Text>View All</Text>
          </TouchableOpacity>
        </View>
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
    padding: 20,
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
    color: 'white',
  },
  albumList: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Podcasts;
