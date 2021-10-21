import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import circle from '../..';

const OnboardingScreen = ({navigation}) => {
  return (
    <Onboarding
      onDone={() => navigation.navigate('Podcast')}
      onSkip={() => navigation.navigate('Podcast')}
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={{uri: 'https://picsum.photos/300'}}
              style={{width: 350, height: 350, borderRadius: 500}}
            />
          ),
          title: 'Onboarding',
          subtitle: 'This is the intro screens for the app',
        },
        {
          backgroundColor: '#fe6e58',
          image: (
            <Image
              source={{uri: 'https://picsum.photos/300'}}
              style={{width: 350, height: 350, borderRadius: 500}}
            />
          ),
          title: 'The Title',
          subtitle: 'This is the subtitle that sumplements the title.',
        },
        {
          backgroundColor: '#999',
          image: (
            <Image
              source={{uri: 'https://picsum.photos/300'}}
              style={{width: 350, height: 350, borderRadius: 500}}
            />
          ),
          title: 'Circle',
          subtitle: "Beautiful, isn't it?",
        },
      ]}
    />
  );
};

export default OnboardingScreen;
