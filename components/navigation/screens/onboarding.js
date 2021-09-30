import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import circle from '../../../';

const OnboardingScreen = ({navigation}) => {
  const [podcastsError, setPodcastsError] = useState(null);
  const [podcastsLoaded, setPodcastsLoaded] = useState(false);
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

  const [tracks, setTracks] = useState();
  const [tracksError, setTracksError] = useState(null);
  const [tracksLoaded, setTracksLoaded] = useState(false);

  useEffect(() => {
    fetch(`${api}/podcasts`)
      .then(res => {
        return res.json();
      })
      .then(
        result => {
          setTracksLoaded(true);
          setTracks(result);
          console.log('api', result);
        },

        error => {
          setTracksLoaded(true);
          setTracksError(error);
          console.log('error: ', error);
        },
      );
  }, []);
  return (
    <Onboarding
      onDone={() =>
        navigation.navigate('Podcasts', {
          podcasts: podcasts,
        })
      }
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../../../media/images/circle.jpg')}
              style={{width: '100%', height: '60%'}}
            />
          ),
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#fe6e58',
          image: (
            <Image
              source={require('../../../media/images/square.jpg')}
              style={{width: '100%', height: '60%'}}
            />
          ),
          title: 'The Title',
          subtitle: 'This is the subtitle that sumplements the title.',
        },
        {
          backgroundColor: '#999',
          image: (
            <Image
              source={require('../../../media/images/triangle.jpg')}
              style={{width: '100%', height: '60%'}}
            />
          ),
          title: 'Triangle',
          subtitle: "Beautiful, isn't it?",
        },
      ]}
    />
  );
};

export default OnboardingScreen;
