import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  VirtualizedList,
  Image,
  Modal,
  Pressable,
} from 'react-native';

import {Modalize} from 'react-native-modalize';
import {ListItem, Avatar, BottomSheet} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import ProgressBar from 'react-native-progress/Bar';
import {white} from 'react-native-paper/lib/typescript/styles/colors';
import TrackPlayer, {
  State,
  useProgress,
  Capability,
  Event,
} from 'react-native-track-player';
//import the hook provided by react-native-track-player to manage the progress
//import {useTrackPlayerProgress} from 'react-native-track-player/lib/hooks';
//import {useTrackPlayerProgress} from 'react-native-track-player';
//import statement for slider
import Slider from '@react-native-community/slider';

const AudioPlayer = () => {
  //state to manage whether track player is initialized or not
  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);

  //the value of the slider should be between 0 and 1
  const [sliderValue, setSliderValue] = useState(0);

  //flag to check whether the use is sliding the seekbar or not
  const [isSeeking, setIsSeeking] = useState(false);

  const songDetails = {
    id: '1',
    url: 'https://audio-previews.elements.envatousercontent.com/files/103682271/preview.mp3',
    type: 'default',
    title: 'My Title',
    album: 'My Album',
    artist: 'Rohan Bhatia',
    artwork: 'https://picsum.photos/100',
  };

  const track = {
    id: '2',
    url: 'https://roadworksmediabackend.herokuapp.com/download', // Load media from the network
    title: 'Avaritia',
    artist: 'deadmau5',
    album: 'while(1<2)',
    genre: 'Progressive House, Electro House',
    artwork: 'https://picsum.photos/100', // Load artwork from the network
  };

  const trackPlayerInit = async () => {
    await TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      stopWithApp: true,
      notificationCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.JumpForward,
        Capability.JumpBackward,
      ],
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.JumpForward,
        Capability.JumpBackward,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause],
    });
    await TrackPlayer.add([songDetails, track]);
    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      console.log('The player is playing');
    }
    if (state === State.Paused) {
      console.log('The player is paused');
    }

    let trackIndex = await TrackPlayer.getCurrentTrack();
    let trackObject = await TrackPlayer.getTrack(trackIndex);

    console.log(`Title: ${trackObject.title}`);

    const position = await TrackPlayer.getPosition();
    const duration = await TrackPlayer.getDuration();
    console.log(`${duration - position} seconds left.`);
    const tracks = await TrackPlayer.getQueue();
    console.log(`First title: ${tracks[1].url}`);
    return true;
  };
  //initialize the TrackPlayer when the App component is mounted
  useEffect(() => {
    const startPlayer = async () => {
      let isInit = await trackPlayerInit();
      setIsTrackPlayerInit(isInit);
    };
    startPlayer();
  }, [position, duration]);

  //start playing the TrackPlayer when the button is pressed
  const onPlayButtonPressed = () => {
    isPlaying
      ? (setIsPlaying(false), TrackPlayer.pause())
      : (setIsPlaying(true), TrackPlayer.play());
  };

  const onNextButtonPressed = () => {
    TrackPlayer.skipToNext();
    setIsPlaying(true);
  };

  const onPrevButtonPressed = () => {
    TrackPlayer.skipToPrevious();
    setIsPlaying(true);
  };

  //useTrackPlayerProgress is a hook which provides the current position and duration of the track player.
  //These values will update every 250ms
  const position = useProgress().position;
  const duration = useProgress().duration;
  //const title = TrackPlayer.getCurrentTrack();

  //this hook updates the value of the slider whenever the current position of the song changes
  useEffect(() => {
    if (!isSeeking && position && duration) {
      setSliderValue(position / duration);
    }
  }, [position, duration]);

  //this function is called when the user starts to slide the seekbar
  const slidingStarted = () => {
    setIsSeeking(true);
  };
  //this function is called when the user stops sliding the seekbar
  const slidingCompleted = async value => {
    await TrackPlayer.seekTo(value * duration);
    setSliderValue(value);
    setIsSeeking(false);
  };

  const modalizeRef = useRef(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const mytest = () => {
    isPlaying ? setIsPlaying(false) : setIsPlaying(true);
  };

  const playButton = iconSize => (
    <TouchableOpacity onPress={onPlayButtonPressed}>
      {isPlaying ? (
        <Icon name="ios-pause-circle-outline" size={iconSize} color="white" />
      ) : (
        <Icon name="ios-play-circle-outline" size={iconSize} color="white" />
      )}
    </TouchableOpacity>
  );
  const rewindButton = (
    <TouchableOpacity onPress={onPrevButtonPressed}>
      <Icon
        name="ios-play-skip-back-circle-outline"
        size={30}
        color="white"
        style={styles.seekButtons}
      />
    </TouchableOpacity>
  );

  const fastForwardButton = (
    <TouchableOpacity onPress={onNextButtonPressed}>
      <Icon
        name="ios-play-skip-forward-circle-outline"
        size={30}
        color="white"
        style={styles.seekButtons}
      />
    </TouchableOpacity>
  );

  const SeekBar = (
    /* <ProgressBar
      progress={0.3}
      width={250}
      color="white"
      //unfilledColor="none"
      borderColor="white"
      animationType="timing"
      //style={styles.progressBar}
    />*/
    <Slider
      style={{width: 200, height: 40}}
      minimumValue={0}
      maximumValue={1}
      value={sliderValue}
      minimumTrackTintColor="#FFFFFF"
      maximumTrackTintColor="#424242"
      onSlidingStart={slidingStarted}
      onSlidingComplete={slidingCompleted}
    />
  );
  const seconds = number => new Date(number * 1000).toISOString().substr(11, 8);

  const SeekBarTimeProgress = (
    <Text style={styles.progressBar}>{seconds(position)}</Text>
  );
  const SeekBarTimeDuration = (
    <Text style={styles.progressBar}>{seconds(duration)}</Text>
  );

  const closeButton = (
    <TouchableOpacity onPress={() => setIsVisible(false)}>
      <Icon name="ios-chevron-down-sharp" size={30} color="white" />
    </TouchableOpacity>
  );

  StatusBar.setBarStyle('light-content');

  const handleNextTrack = async () => {
    //currentIndex + 1;

    //console.log(currentIndex);

    // setNextEpisode(currentIndex);

    // get the id of the current track
    let trackId = await TrackPlayer.getCurrentTrack();

    console.log('hmm ', trackId);
  };
  handleNextTrack();
  return (
    <View>
      <TouchableOpacity onPress={() => setIsVisible(true)}>
        <ListItem bottomDivider containerStyle={styles.miniPlayer}>
          <Avatar source={{uri: songDetails.artwork}} />
          <ListItem.Content>
            <ListItem.Title style={styles.miniPlayerText}>
              {songDetails.title}
            </ListItem.Title>
            <ListItem.Subtitle style={styles.miniPlayerText}>
              {songDetails.artist}
            </ListItem.Subtitle>
          </ListItem.Content>
          <TouchableOpacity onPress={() => console.log('play/pause')}>
            <Text>{playButton(45)}</Text>
          </TouchableOpacity>
        </ListItem>
      </TouchableOpacity>
      <View>
        <Modal entry="bottom" visible={isVisible} animationType="slide">
          <View style={styles.container}>
            <View style={styles.audioWhole}>
              <Text>{closeButton}</Text>

              <View style={styles.insideContainer}>
                <Image
                  source={{uri: songDetails.artwork}}
                  style={styles.image}
                />

                <View style={styles.audioInfo}>
                  <Text style={styles.audioInfoTitle}>{songDetails.title}</Text>
                  <Text style={styles.audioInfoArtist}>
                    {songDetails.artist}
                  </Text>
                </View>
                <View>
                  <Text>
                    {SeekBarTimeProgress}
                    {SeekBar}
                    {SeekBarTimeDuration}
                  </Text>
                </View>
                <View style={styles.audioButtons}>
                  {rewindButton}
                  {playButton(60)}
                  {fastForwardButton}
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: 'black',
    //justifyContent: 'center',
    //alignItems: 'center',
    //zIndex: 10,
  },
  insideContainer: {
    //flex: 1,
    //marginTop: StatusBar.currentHeight || 80,
    //justifyContent: 'center',
    alignItems: 'center',
    //zIndex: 10,
  },
  audioButtons: {
    flexDirection: 'row',
    //alignItems: 'center',
    //flex: 1,
  },
  progressBar: {
    marginRight: 2,
    //marginLeft: 2,
    color: 'white',
  },
  seekBar: {
    marginBottom: 10,
  },
  seekButtons: {
    top: 20,
  },

  audioWhole: {
    marginTop: StatusBar.currentHeight || 60,
  },
  audioInfo: {
    alignItems: 'flex-start',
    //flex: 1,
  },

  audioInfoTitle: {
    marginTop: 15,
    //marginBottom: 5,
    fontSize: 25,
    color: 'white',
  },
  audioInfoArtist: {
    marginBottom: 5,
    fontSize: 15,
    color: 'white',
  },

  image: {
    marginTop: 10,
    width: 300,
    height: 300,
    //left: '50%',
  },
  closeButton: {
    marginTop: StatusBar.currentHeight || 0,
  },
  miniPlayer: {
    backgroundColor: 'grey',
  },
  miniPlayerText: {
    color: 'white',
  },
  miniPlayerIcon: {
    color: 'white',
  },
});

export default AudioPlayer;
