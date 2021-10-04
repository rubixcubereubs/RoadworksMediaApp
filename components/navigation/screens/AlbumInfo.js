import React from 'react';
import {Touchable, TouchableOpacity} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import {Surface} from 'react-native-paper';

const AlbumInfo = ({route, useState, useEffect}) => {
  const [item] = [route.params.item];
  const [podcasts] = [route.params.podcasts];

  console.log('album: ', item);
  return (
    <View>
      <Surface style={styles.surface}>
        <Text>{item.name}</Text>
        <Text>{item.artist}</Text>
        <Text>{item.image}</Text>
      </Surface>
      <Text>
        Name:{' '}
        {item.tracks.map(i => {
          return (
            <TouchableOpacity>
              <Text>{i.name}</Text>
            </TouchableOpacity>
          );
        })}
      </Text>
    </View>
  );
};

export default AlbumInfo;
const styles = StyleSheet.create({
  surface: {
    padding: 8,
    height: 300,
    //width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});
