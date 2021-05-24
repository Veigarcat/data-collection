import apiManagement from '../../apis/api';

const { put, all, takeLatest, takeEvery } = require('redux-saga/effects');
const apis = require('../../apis/auth');

const actions = require('./actions');
const { setCookie } = require('../../utils/cookie');

function* verifyTokenSaga({ accessToken }) {
  try {
    const { data } = yield apis.verify(accessToken);
    const { result, status } = data;
    if (!status) throw new Error();
    apiManagement.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    yield put(actions.verifyTokenSuccess({ accessToken, result }));
  } catch (error) {
    yield put(actions.verifyTokenFailure());
  }
}

function* logoutSaga() {
  try {
    const { status } = yield apis.apiLogout();
    if (!status) throw new Error();
    setCookie('accessToken', null, 1);
  } catch (error) {
    console.log(error);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.actionTypes.VERIFY_TOKEN, verifyTokenSaga),
    takeLatest(actions.actionTypes.LOGOUT, logoutSaga),
  ]);
}
