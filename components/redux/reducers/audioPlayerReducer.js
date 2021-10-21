import {
  IS_SEEKING,
  IS_PLAYING,
  SLIDER_VALUE,
  SONG_DETAILS,
  IS_VISIBLE,
} from '../actions/actionTypes';

const initialState = {
  songDetails: [],
  isPlaying: false,
  isSeeking: false,
  sliderValue: 0,
  isVisible: false,
};

const audioPlayerReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_SEEKING:
      return {
        ...state,
        isSeeking: action.payload,
      };
    case IS_VISIBLE:
      return {
        ...state,
        isVisible: action.payload,
      };
    case IS_PLAYING:
      return {
        ...state,
        isPlaying: action.payload,
      };
    case SLIDER_VALUE:
      //console.log('action: ', action.payload);
      return {
        ...state,
        sliderValue: action.payload,
      };
    case SONG_DETAILS:
      return {
        ...state,
        songDetails: action.payload,
      };
    default:
      return state;
  }
};

//export async function fetchPodcasts(dispatch, getState) {
//    const response = await
//}

export default audioPlayerReducer;
