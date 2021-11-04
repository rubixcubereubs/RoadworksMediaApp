import axios from 'axios';
import {
  FETCH_PODCAST_FAILURE,
  FETCH_PODCAST_REQUEST,
  FETCH_PODCAST_SUCCESS,
  ADD_TRACKS,
  SLIDER_VALUE,
  IS_SEEKING,
  NOT_SEEKING,
  IS_PLAYING,
  SONG_DETAILS,
  IS_VISIBLE,
} from './actionTypes';

export const increment = () => {
  return {
    type: 'INCREMENT',
  };
};

export const decrement = () => {
  return {
    type: 'DECREMENT',
  };
};

export const sliderValue = value => {
  return {
    type: SLIDER_VALUE,
    payload: value,
  };
};

export const isSeeking = value => {
  return {
    type: IS_SEEKING,
    payload: value,
  };
};

export const isVisible = visible => {
  return {
    type: IS_VISIBLE,
    payload: visible,
  };
};

export const isPlaying = play => {
  return {
    type: IS_PLAYING,
    payload: play,
  };
};

export const songDetails = song => {
  return {
    type: SONG_DETAILS,
    payload: song,
  };
};

export const addTracks = tracks => {
  return {
    type: ADD_TRACKS,
    payload: tracks,
  };
};

export const fetchPodcastsRequest = loading => {
  return {
    type: FETCH_PODCAST_REQUEST,
    payload: loading,
  };
};

export const fetchPodcastsSuccess = reduxPodcasts => {
  console.log('success: ', reduxPodcasts);
  return {
    type: FETCH_PODCAST_SUCCESS,
    payload: reduxPodcasts,
  };
};

export const fetchPodcastsFailure = error => {
  return {
    type: FETCH_PODCAST_FAILURE,
    payload: error,
  };
};

const localhost = 'http://192.168.1.225:8080';
const api = 'https://roadworksmediabackend.herokuapp.com/albums';
const fakeApi = 'https://jsonplaceholder.typicode.com/users';
export const getPodcasts = () => {
  return (dispatch, getState) => {
    dispatch(fetchPodcastsRequest());
    console.log('current state:', getState());
    axios
      .get(api)
      .then(response => {
        //const users = response.data.map(user => user);
        const podcasts = response.data;
        console.log('redux response: ', podcasts);
        dispatch(fetchPodcastsSuccess(podcasts));
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchPodcastsFailure(errorMsg));
      });
    console.log('current state after:', getState());
  };
};
