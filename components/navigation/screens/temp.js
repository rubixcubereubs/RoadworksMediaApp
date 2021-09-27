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
  const [selectedEntId, setSelectedEntId] = useState(null);
  const [selectedEduId, setSelectedEduId] = useState(null);
  const [DATA, DATA1, DATA2, podcasts] = [
    route.params.DATA[0],
    route.params.DATA[1],
    route.params.DATA[2],
    route.params.podcasts,
  ];

  const mapresults = Object.entries(podcasts).map(([key, value]) => ({
    title: value.name,
    id: value.id,
  }));
  console.log('mapresults', mapresults);
  const Item = ({item, onPress, backgroundColor, textColor}) => {
    return Object.entries(item).map(([key, value]) => {
      console.log('keeey', value.id);
      return (
        <TouchableOpacity
          key={value.id}
          onPress={onPress}
          style={[styles.item, backgroundColor]}>
          <Surface key={value.id}>
            <Text key={value.id} style={[styles.title, textColor]}>
              {value.id}
            </Text>
          </Surface>
        </TouchableOpacity>
      );
    });
  };

  const EduItem = ({item, onPress, backgroundColor, textColor}) => {
    return Object.entries(item).map(([key, value]) => {
      console.log('keeeyedu2', value.id);
      return Object.entries(value.tracks).map(([key, value]) => {
        if (value.tag == 'edu') {
          console.log('keeeyedu2', value.id, value.tag, value.name);
          return (
            <TouchableOpacity
              key={value.id}
              onPress={onPress}
              style={[styles.item, backgroundColor]}>
              <Text key={value.id} style={[styles.title, textColor]}>
                {value.id}
              </Text>
            </TouchableOpacity>
          );
        }
      });
    });
  };

  const EntItem = ({item, onPress, backgroundColor, textColor}) => {
    console.log('ent item: ', item);
    return Object.entries(item).map(([key, value]) => {
      console.log('ent value', value.id);
      return Object.entries(value.tracks).map(([key, value]) => {
        console.log('ent.track: ', value.id, value.tag, value.name);
        if (value.tag == 'ent') {
          console.log('match:', value.tag);
          return (
            <TouchableOpacity
              key={value.id}
              onPress={onPress}
              style={[styles.item, backgroundColor]}>
              <Surface key={value.id} style={styles.surfaceItem}>
                <Text key={value.id} style={[styles.title, textColor]}>
                  {value.id}
                </Text>
              </Surface>
            </TouchableOpacity>
          );
        }

        //console.log('value', value);
        //console.log('key', value.id, 'name', value.name);
        return;
      });
    });
  };

  const list = [podcasts];
  const list1 = [podcasts.tracks];

  const renderItem = ({item}) => {
    console.log('render', item);
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
  const renderEduItem = ({item}) => {
    const backgroundColor = item.id === selectedEduId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedEduId ? 'white' : 'black';

    return (
      <EduItem
        item={item}
        onPress={() => setSelectedEduId(item.id)}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };
  const renderEntItem = ({item}) => {
    const backgroundColor = item.id === selectedEntId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedEntId ? 'white' : 'black';

    return (
      <EntItem
        item={item}
        onPress={() => setSelectedEntId(item.id)}
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
            renderItem={renderEntItem}
            keyExtractor={item => item.id}
            extraData={selectedEntId}
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
            renderItem={renderEduItem}
            keyExtractor={item => item.id}
            extraData={selectedEduId}
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
    color: 'white',
  },
  surfaceItem: {
    padding: 8,
    height: 100,
    //width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 12,
    //backgroundColor: 'black',
  },
  albumList: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Podcasts;
