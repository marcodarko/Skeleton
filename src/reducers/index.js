import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as fromAuth from './auth';
import * as fromLang from './lang';
import * as fromAgent from './agent';
import * as fromMessage from './message';

import { createSelector } from 'reselect'
/**
 * root reduces
 */
export default combineReducers({
  auth: fromAuth.reducer,
  routing: routerReducer,
  lang: fromLang.reducer,
  agents: fromAgent.reducer,
  msg: fromMessage.reducer
});


/**
 * selectors
 */
const getAgentState = state => state.agents;
export const getAgentList = createSelector(getAgentState, fromAgent.getAgentList);
export const getSelectedAgent = createSelector(getAgentState, fromAgent.getSelectedAgent);