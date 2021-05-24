import { actionTypes } from './actions';

const { getCookie } = require('../../utils/cookie');

export const initialState = {
  accessToken: getCookie('accessToken'),
  userId: '60544d3960e6a65e7cfe82f9',
  isLoggingIn: false,
  isSigningUp: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return { ...state, isLoggingIn: true };

    case actionTypes.LOGIN_SUCCESS: {
      const { accessToken, userId } = action.data;
      return { ...state, isLoggingIn: false, accessToken, userId };
    }

    case actionTypes.LOGIN_FAILURE: {
      return { ...state, isLoggingIn: false };
    }
    case actionTypes.SIGNUP:
      return { ...state, isSigningUp: true };

    case actionTypes.SIGNUP_FINISH: {
      return { ...state, isLoadingSignIn: false };
    }

    default:
      return state;
  }
}
