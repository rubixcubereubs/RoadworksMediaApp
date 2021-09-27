import React, {useState, useEffect} from 'react';
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
import {ListItem, Icon, Button} from 'react-native-elements';
import {Avatar, Card, Title, Paragraph} from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="download" />;

const Item = ({title}) => (
  <View>
    <Card style={styles.item}>
      <Card.Title
        title={title}
        subtitle="Card Subtitle"
        left={LeftContent}
        right={LeftContent}
      />
    </Card>
  </View>
);

const Home = ({navigation}) => {
  const [podcastsError, setPodcastsError] = useState(null);
  const [podcastsLoaded, setPodcastsLoaded] = useState(false);
  const [tracks, setTracks] = useState();
  const [podcasts, setPodcasts] = useState([]);

  const localhost = 'http://192.168.1.225:8080';
  const api = 'https://roadworksmediabackend.herokuapp.com';
  useEffect(() => {
    fetch(`${api}/albums`)
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
  const WholeNews = () => {
    return Object.entries(podcasts).map(([key, value]) => {
      return [
        {
          key: key,
          id: value.id,
          title: value.name,
        },
      ];
    });
  };
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First One',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second One',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third One',
    },
  ];
  const DATA1 = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b',
      title: 'First One',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6',
      title: 'Second One',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d7',
      title: 'Third One',
    },
  ];
  const DATA2 = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28',
      title: 'First One',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f',
      title: 'Second One',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d',
      title: 'Third One',
    },
  ];
  const renderItem = ({item}) => <Item title={item.title} />;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>Roadworks Media</Text>
      </View>
      <View style={styles.middle}>
        <Text style={styles.subtext}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          est sapien, pulvinar sed luctus sit amet, scelerisque sed urna.
          Integer quis gravida nibh.
        </Text>
      </View>
      <View style={styles.bottom}>
        <Button
          icon={{
            name: 'arrow-right',
            size: 15,
            color: 'white',
          }}
          title="Podcasts"
          onPress={() =>
            navigation.navigate('Podcasts', {
              podcasts: podcasts,
              DATA: DATA,
              DATA1: DATA1,
              DATA2: DATA2,
            })
          }
          //raised
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          titleStyle={styles.buttonTitle}
        />
        <Button
          icon={{
            name: 'arrow-right',
            size: 15,
            color: 'white',
          }}
          title="Artists"
          onPress={() => navigation.navigate('Artists')}
          //raised
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          titleStyle={styles.buttonTitle}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    flex: 2,
    backgroundColor: 'black',
    //marginTop: StatusBar.currentHeight || 0,
  },
  middle: {
    flex: 3,
    backgroundColor: 'white',
    borderRadius: 1000 / 2,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: StatusBar.currentHeight || 0,
  },
  bottom: {
    flex: 2,
    backgroundColor: 'black',

    //marginTop: StatusBar.currentHeight || 0,
  },
  buttonTitle: {
    color: 'black',
  },
  logoText: {
    color: 'white',
    fontSize: 70,
  },
  subtext: {
    //color: 'white',
    fontSize: 30,
    borderRadius: 200,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'white',
    padding: 20,
    //margin: 5,
    color: 'black',
    marginTop: 20,
    width: 500,
  },
  buttonContainer: {
    color: 'black',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Home;
