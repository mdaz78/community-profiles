import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initalState = window.__INITIAL_STATE__;
const defaultState = {
  currentUser: initalState.currentUser,
  admin: {
    stats: {
      loading: true,
    },
    ventures: {
      list: [],
      new: { suggestedMembers: [], team: [] },
    },
    skills: {
      list: [],
    },
  },
  skills: {
    details: {
      loading: true,
    },
    list: {
      loading: true,
    },
  },
  profiles: {
    details: {
      loading: true,
    },
    list: {
      loading: true,
    },
  },
  ventures: {
    details: {
      loading: true,
    },
    list: {
      loading: true,
    },
  },
};

const store = createStore(rootReducer, defaultState, applyMiddleware(thunk));

export const history = syncHistoryWithStore(browserHistory, store);

export default store;