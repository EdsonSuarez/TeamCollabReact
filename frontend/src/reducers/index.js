import { combineReducers } from 'redux';

import homes from './home';
import projects from './project';

export const reducers = combineReducers({ homes, projects });