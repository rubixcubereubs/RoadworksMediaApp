import {ADD_TRACKS} from '../actions/actionTypes';

const initialState = [];

const tracksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRACKS:
      return action.payload;

    default:
      return state;
  }
};

//export async function fetchPodcasts(dispatch, getState) {
//    const response = await
//}

export default tracksReducer;
