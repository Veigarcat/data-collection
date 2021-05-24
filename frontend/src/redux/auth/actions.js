export const actionTypes = {
  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  SIGNUP: 'SIGNUP',
  SIGNUP_FINISH: 'SIGNUP_FINISH',
};

// Đăng nhập
export function login(email, password) {
  return {
    type: actionTypes.LOGIN,
    email,
    password,
  };
}

export function loginSuccess(data) {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    data,
  };
}

export function loginFailure() {
  return {
    type: actionTypes.LOGIN_FAILURE,
  };
}

// Đăng ký
export function signUp(payload) {
  return {
    type: actionTypes.SIGNUP,
    payload,
  };
}

export function signUpFinish() {
  return {
    type: actionTypes.SIGNUP_FINISH,
  };
}
