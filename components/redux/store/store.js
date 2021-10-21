import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {getPodcasts} from '../actions/actions';
import rootReducer from '../reducers/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
