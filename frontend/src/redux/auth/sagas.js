import { STATUS_RESPONSE } from '../../constants/index';

import { toastMsgError, toastSuccess } from '../../commons/Toastify';

const { put, all, takeLatest } = require('redux-saga/effects');
const apis = require('../../apis/auth');

const actions = require('./actions');
const { setCookie } = require('../../utils/cookie');

function* loginSaga({ email, password }) {
  try {
    const A_WEEK = 7 * 24 * 60 * 60 * 1000;
    const response = yield apis.login({ email, password });
    if (response.status === STATUS_RESPONSE.STATUS_OKE) {
      setCookie('accessToken', response.result.accessToken, A_WEEK);
      setCookie('userId', response.result.userId, A_WEEK);
      yield put(actions.loginSuccess(response.result));
      toastSuccess('Đăng nhập thành công');
    } else {
      const { code, message } = response;
      yield put(actions.loginFailure());
      toastMsgError(`Lỗi:  ${code} - ${message}`);
    }
  } catch (error) {
    yield put(actions.loginFailure());
    toastMsgError('Lỗi:  ');
  }
}
function* signUpSaga({ payload }) {
  try {
    const response = yield apis.signUp(payload);
    if (response.status === STATUS_RESPONSE.STATUS_OKE) {
      yield put(actions.signUpFinish());
      toastSuccess('Tạo tài khoản thành công ');
    } else {
      const { code, message } = response;
      yield put(actions.signUpFinish());
      toastMsgError(`Lỗi:  ${code} - ${message}`);
    }
  } catch (error) {
    yield put(actions.signUpFinish());
    toastMsgError('Lỗi');
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.actionTypes.LOGIN, loginSaga),
    takeLatest(actions.actionTypes.SIGNUP, signUpSaga),
  ]);
}
