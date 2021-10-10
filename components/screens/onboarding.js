import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import circle from '../..';

const OnboardingScreen = ({navigation}) => {
  return (
    <Onboarding
      onDone={() => navigation.navigate('Podcast')}
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../../media/images/circle.jpg')}
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
              source={require('../../media/images/square.jpg')}
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
              source={require('../../media/images/triangle.jpg')}
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
