import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import currentUser from './currentUser';
import admin from './admin';
import skills from './skills';
import profiles from './profiles';
import ventures from './ventures';
import home from './home';
import modals from './modals';

const rootReducer = combineReducers({ currentUser, admin, skills, profiles, home, modals, ventures, routing: routerReducer });
export default rootReducer;