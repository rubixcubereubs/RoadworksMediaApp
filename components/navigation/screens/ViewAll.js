// Import React Component
import React, {useState, useEffect} from 'react';

// Import Components
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  SafeAreaView,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import RNFetchBlob from 'rn-fetch-blob';
import {Icon} from 'react-native-elements';
import BsCloudDownload from 'react-icons/bs';
import {ListItem, Avatar} from 'react-native-elements';
import {List} from 'react-native-paper';

const ViewAll = () => {
  const [podcastsError, setPodcastsError] = useState(null);
  const [podcastsLoaded, setPodcastsLoaded] = useState(false);
  const [podcasts, setPodcasts] = useState([]);

  const localhost = 'http://192.168.1.225:8080';
  const api = 'https://roadworksmediabackend.herokuapp.com';
  useEffect(() => {
    fetch(`${api}/podcasts`)
      .then(res => {
        return res.json();
      })
      .then(
        result => {
          setPodcastsLoaded(true);
          setPodcasts(result);
          console.log('api', result);
        },

        error => {
          setPodcastsLoaded(true);
          setPodcastsError(error);
          console.log('error: ', error);
        },
      );
  }, []);
  console.log('state1', podcasts[1]);
  const fileUrl =
    'https://www.techup.co.in/wp-content/uploads/2020/01/techup_logo_72-scaled.jpg';
  // ;
  //'https://roadworksmediabackend.herokuapp.com/download';`${localhost}/download`;

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()

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

  const getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };

  const list = [podcasts];

  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>
        <Icon
          raised
          name="download"
          type="feather"
          onPress={() => console.log('hello')}
        />
        {title}
      </Text>
    </View>
  );

  const keyExtractor = (item, index) => index.toString();

  /*const listItems = podcasts.map(podcast => {
    <ListItem.Title>{podcast.name}</ListItem.Title>;
  });*/

  const WholeNews = () => {
    return Object.entries(podcasts).map(([key, value]) => {
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
            <ListItem.Content>
              <ListItem.Title>{value.name}</ListItem.Title>
              <ListItem.Subtitle>{value.filePath}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </ScrollView>
      );
    });
  };
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
  const renderItemD = ({item}) => (
    <ListItem bottomDivider>
      <Icon raised name="download" type="feather" onPress={checkPermission} />
      <Avatar source={{uri: item.avatar_url}} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.name}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  const renderItem = ({item}) => <Item title={item.title} />;

  return (
    <SafeAreaView style={styles.container}>
      {podcastsLoaded ? (
        <FlatList
          keyExtractor={keyExtractor}
          data={list}
          renderItem={WholeNews}
          ListHeaderComponent={() =>
            !list.length ? (
              <Text style={styles.emptyMessageStyle}>The list is empty</Text>
            ) : null
          }
        />
      ) : (
        <View>
          <ActivityIndicator size="large" />
          <Text>Loading Podcasts</Text>
        </View>
      )}
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

export default ViewAll;

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    padding: 5,
  },
  button: {
    width: '80%',
    padding: 10,
    backgroundColor: 'blue',
    margin: 10,
  },
});*/
