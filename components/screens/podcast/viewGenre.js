import React from 'react';

import {
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  FlatList,
  StatusBar,
} from 'react-native';

import {ListItem, Avatar} from 'react-native-elements';
import {useSelector} from 'react-redux';

const viewGenre = ({navigation, route}) => {
  const reduxPods = useSelector(state => state.podcasts);
  const thePodcasts = reduxPods.reduxPodcasts;

  const albumType = route.params.albumType;
  const list = [thePodcasts];

  const keyExtractor = (item, index) => index.toString();

  const ShowAllPodcasts = () => {
    return Object.entries(thePodcasts).map(([key, value]) => {
      if (value.tags == albumType) {
        return (
          <ScrollView key={key}>
            <ListItem
              bottomDivider
              containerStyle={{
                marginTop: 5,
                marginBottom: 5,
                borderRadius: 200,
                backgroundColor: 'black',
              }}
              onPress={() =>
                navigation.navigate('Album', {
                  item: value,
                  podcasts: thePodcasts,
                })
              }>
              <Avatar source={{uri: 'https://picsum.photos/100'}} />
              <ListItem.Content key={value.id}>
                <ListItem.Title style={{color: 'grey'}}>
                  {value.name}
                </ListItem.Title>
                <ListItem.Subtitle style={{color: 'grey'}}>
                  {value.artist}
                </ListItem.Subtitle>
                <ListItem.Subtitle style={{color: 'grey'}}>
                  {value.album}
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </ScrollView>
        );
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor={keyExtractor}
        data={list}
        renderItem={ShowAllPodcasts}
        ListHeaderComponent={() =>
          !list.length ? (
            <Text style={styles.emptyMessageStyle}>The list is empty</Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  emptyMessageStyle: {
    textAlign: 'center',
    //My current hack to center it vertically
    //Which does not work as expected
    marginTop: '50%',
  },
});

export default viewGenre;
