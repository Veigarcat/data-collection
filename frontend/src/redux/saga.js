import { all } from 'redux-saga/effects';
import authSagas from './auth/sagas';
import campaignSagas from './campaign/sagas';
import messageSagas from './message/sagas';
import usecaseSagas from './usecase/sagas';

function* rootSaga() {
  yield all([authSagas(), campaignSagas(), messageSagas(), usecaseSagas()]);
}

export default rootSaga;
