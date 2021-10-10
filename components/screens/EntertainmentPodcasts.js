// Import React Component
import React, {useState, useEffect} from 'react';

// Import Components
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import {ListItem, Avatar} from 'react-native-elements';
import {Icon} from 'react-native-elements';

const EntPods = ({route, navigation}) => {
  const [albums] = [route.params.albums];
  const albumType = route.params.albumType;
  console.log('album type: ', albumType, ' ', 'album: ', albums);

  const downloadFile = () => {
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = fileUrl;
    // Function to get extention of the file url
    let file_ext = getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const {config, fs} = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          '/file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch('GET', FILE_URL, {'Content-Type': 'application/mp3'})
      // listen to upload progress event
      .uploadProgress((written, total) => {
        console.log('uploaded', written / total);
      })
      // listen to download progress event
      .progress((received, total) => {
        console.log('progress', received / total);
      })
      .then(res => {
        // Alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        Alert.alert('File Downloaded Successfully.');
      });
  };

  const checkPermission = async () => {
    // Function to check the platform
    // If Platform is Android then check for permissions.

    if (Platform.OS === 'ios') {
      downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFile();
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log('++++' + err);
      }
    }
  };

  /*return Object.entries(albums).map(([key, value]) => {
    if (value.tags == albumType) {
      return (
        <ScrollView key={key}>
          <ListItem bottomDivider>
            <Icon
              raised
              name="download"
              type="feather"
              onPress={checkPermission}
            />
            <Avatar source={{uri: value.image}} />
            <ListItem.Content key={value.id}>
              <ListItem.Title>{value.name}</ListItem.Title>
              <ListItem.Subtitle>{value.artist}</ListItem.Subtitle>
              <ListItem.Subtitle>{value.album}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </ScrollView>
      );
    }
  });*/

  return (
    <View>
      {albums.map((value, key) => {
        if (value.tags == albumType) {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Album', {
                  item: value,
                  podcasts: albums,
                })
              }>
              <ScrollView key={key}>
                <ListItem bottomDivider>
                  <Icon
                    raised
                    name="download"
                    type="feather"
                    onPress={checkPermission}
                  />
                  <Avatar source={{uri: value.image}} />
                  <ListItem.Content key={value.id}>
                    <ListItem.Title>{value.name}</ListItem.Title>
                    <ListItem.Subtitle>{value.artist}</ListItem.Subtitle>
                    <ListItem.Subtitle>{value.album}</ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              </ScrollView>
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
};

export default EntPods;
