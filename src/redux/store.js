import { createStore, applyMiddleware, combineReducers } from 'redux';
import {createLogger} from 'redux-logger';
import toDoApp from './toDoApp';
import User from './user';
import App from './app';
import Dog from './dog';

const loggerMiddleware = createLogger(); // initialize logger

const createStoreWithMiddleware = applyMiddleware(loggerMiddleware)(createStore); // apply logger to redux

const reducer = combineReducers({
  toDoApp,
  User,
  App,
  Dog
});

const store = (initialState) => createStoreWithMiddleware(reducer, initialState);
export default store;