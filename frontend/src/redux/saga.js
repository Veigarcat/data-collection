import { all } from 'redux-saga/effects';
import authSagas from './auth/sagas';
import campaignSagas from './campaign/sagas';
import messageSagas from './message/sagas';
import userSagas from './user/sagas';

function* rootSaga() {
  yield all([authSagas(), campaignSagas(), messageSagas(), userSagas()]);
}

export default rootSaga;
