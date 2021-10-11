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

import {ListItem, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
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

  const songDetails = [
    {
      id: '1',
      url: 'https://audio-previews.elements.envatousercontent.com/files/103682271/preview.mp3',
      type: 'default',
      title: 'My Title',
      album: 'My Album',
      artist: 'Rohan Bhatia',
      artwork: 'https://picsum.photos/100',
    },
    {
      id: '2',
      url: 'https://roadworksmediabackend.herokuapp.com/download', // Load media from the network
      title: 'Avaritia',
      artist: 'deadmau5',
      album: 'while(1<2)',
      genre: 'Progressive House, Electro House',
      artwork: 'https://picsum.photos/100', // Load artwork from the network
    },
  ];

  const track = {
    id: '2',
    url: 'https://roadworksmediabackend.herokuapp.com/download', // Load media from the network
    title: 'Avaritia',
    artist: 'deadmau5',
    album: 'while(1<2)',
    genre: 'Progressive House, Electro House',
    artwork: 'https://picsum.photos/100', // Load artwork from the network
  };

  const TrackPlayerInit = async () => {
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
    await TrackPlayer.add(songDetails);
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
      let isInit = await TrackPlayerInit();
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

  const [abc, setAbc] = useState({
    id: '',
    url: '',
    type: 'default',
    title: '',
    album: '',
    artist: '',
    artwork: 'https://picsum.photos/100',
  });
  const [def, setDef] = useState();
  useEffect(() => {
    const handleNextTrack = async () => {
      // get the id of the current track
      let trackId = await TrackPlayer.getCurrentTrack();
      setDef(trackId);

      const tracks = await TrackPlayer.getQueue();
      setAbc({
        /* id: tracks[def].id,
      type: 'default',*/
        url: tracks[def].url,
        title: tracks[def].title,
        album: tracks[def].album,
        artist: tracks[def].artist,
        artwork: tracks[def].artwork,
      });
    };
    handleNextTrack();
  });

  const aboutText = (
    <Text style={{color: 'grey', height: 200}}>
      This is some text about the Podcast...Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Ut aliquet tellus tempus tempus tincidunt.
      Suspendisse at lacinia magna. Donec ultricies libero eget varius dapibus.
      Orci varius natoque penatibus et magnis dis parturient montes, nascetur
      ridiculus mus. Praesent consequat, dolor non tristique sollicitudin, felis
      magna iaculis ante, at pharetra metus diam placerat dolor. Class aptent
      taciti sociosqu ad litora torquent per conubia nostra, per inceptos
      himenaeos. Integer tortor diam, scelerisque ac leo vel, dapibus
      consectetur urna. Phasellus ac enim tortor. Vestibulum in sem eu justo
      aliquet condimentum nec quis quam. Proin auctor nunc quis tellus
      convallis, finibus efficitur metus ornare. Cras eu velit at urna varius
      interdum eget quis nunc. Etiam ac augue consectetur, venenatis nisi quis,
      facilisis erat. Nam elementum tellus nec dapibus porttitor. Aliquam lorem
      orci, placerat id blandit at, maximus ut nibh. Phasellus convallis enim ac
      velit pellentesque, ut lacinia sem vulputate.
    </Text>
  );

  return (
    <View>
      <TouchableOpacity onPress={() => setIsVisible(true)}>
        <ListItem bottomDivider containerStyle={styles.miniPlayer}>
          <Avatar source={{uri: abc.artwork}} />
          <ListItem.Content>
            <ListItem.Title style={styles.miniPlayerText}>
              {abc.title}
            </ListItem.Title>
            <ListItem.Subtitle style={styles.miniPlayerText}>
              {abc.artist}
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
                <View style={{flex: 1}}>
                  <Image source={{uri: abc.artwork}} style={styles.image} />
                </View>
                <View style={styles.audioAllText}>
                  <View style={styles.audioInfo}>
                    <Text style={styles.audioInfoTitle}>{abc.title}</Text>
                    <Text style={styles.audioInfoArtist}>{abc.artist}</Text>
                  </View>
                  <ScrollView style={styles.aboutText}>
                    <Text style={{color: 'white', fontSize: 20}}>About</Text>
                    {aboutText}
                  </ScrollView>
                </View>
                <View>
                  <Text>
                    {SeekBarTimeProgress}
                    {SeekBar}
                    {SeekBarTimeDuration}
                  </Text>
                </View>
                <SafeAreaView style={styles.audioButtons}>
                  {rewindButton}
                  {playButton(60)}
                  {fastForwardButton}
                </SafeAreaView>
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
    flex: 1,
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
    flex: 1,
  },

  audioAllText: {
    flex: 1,
    marginTop: 30,
  },
  audioInfo: {
    //alignItems: 'flex-start',
    //flex: 1,
    //alignContent: 'flex-start',
    //backgroundColor: 'red',
    marginBottom: 5,
  },
  aboutText: {
    //alignItems: 'flex-start',
    //flex: 1,
    //alignContent: 'flex-start',
    //backgroundColor: 'grey',
    //opacity: 0.7,
  },
  audioInfoTitle: {
    //marginTop: 15,
    //marginBottom: 5,
    fontSize: 25,
    color: 'white',
  },
  audioInfoArtist: {
    marginBottom: 5,
    fontSize: 15,
    color: 'grey',
  },

  image: {
    marginTop: 10,
    //marginBottom: 500,
    width: 300,
    height: 300,
    //left: '50%',
    borderRadius: 200,
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
