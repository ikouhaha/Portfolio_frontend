import { createStore, applyMiddleware, combineReducers } from 'redux';
import {createLogger} from 'redux-logger';
import Socket from './socket';
import User from './user';
import App from './app';
import Select from './select';


const loggerMiddleware = createLogger(); // initialize logger

const createStoreWithMiddleware = applyMiddleware(loggerMiddleware)(createStore); // apply logger to redux

const reducer = combineReducers({
  Socket,
  User,
  App,
  Select
});

const store = (initialState) => createStoreWithMiddleware(reducer, initialState);
export default store;