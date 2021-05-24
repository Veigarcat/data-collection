import { combineReducers } from 'redux';
import auth, { initialState as authInitialState } from './auth/reducer';
import message from './message/reducer';
import campaign from './campaign/reducer';
import user from './user/reducer';

export const initialState = {
  auth: authInitialState,
};

export default combineReducers({
  auth,
  message,
  campaign,
  user,
});
