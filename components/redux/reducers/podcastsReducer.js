import {
  FETCH_PODCAST_FAILURE,
  FETCH_PODCAST_REQUEST,
  FETCH_PODCAST_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  reduxPodcasts: [],
  error: '',
};

const podcastReducer = (state = initialState, action) => {
  const failure = FETCH_PODCAST_FAILURE;
  const request = FETCH_PODCAST_REQUEST;
  const success = FETCH_PODCAST_SUCCESS;
  switch (action.type) {
    case request:
      return {
        ...state,
        loading: true,
      };
    case success:
      console.log('action: ', action.payload);
      return {
        ...state,
        loading: false,
        reduxPodcasts: action.payload,
        error: '',
      };
    case failure:
      return {
        ...state,
        loading: false,
        reduxPodcasts: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default podcastReducer;
