import React from 'react';
import {View, Text} from 'react-native';

const AlbumInfo = ({route, useState, useEffect}) => {
  const [item] = [route.params.item];
  const [podcasts] = [route.params.podcasts];

  console.log('album: ', item);
  return (
    <View>
      <Text>
        {item.title}
        {item.id}
        {podcasts.map(i => {
          if (i.id == item.id) return i.name;
        })}
      </Text>
    </View>
  );
};

export default AlbumInfo;
