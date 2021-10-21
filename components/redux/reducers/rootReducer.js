import {combineReducers} from 'redux';
import podcastReducer from './podcastsReducer';
import audioPlayerReducer from './audioPlayerReducer';
import tracksReducer from './tracksReducer';

const rootReducer = combineReducers({
  podcasts: podcastReducer,
  audioPlayer: audioPlayerReducer,
  tracks: tracksReducer,
});

export default rootReducer;
