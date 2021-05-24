import { STATUS_RESPONSE } from '../../constants/index';

const { put, call, all, takeLatest, takeEvery } = require('redux-saga/effects');
const apis = require('../../apis/message');

const actions = require('./actions');

export function* getListMessage({ payload }) {
  try {
    const { appId, ssoUserId, campaignId } = payload;
    const resp = yield call(apis.getSkipMessage, {
      appId,
      ssoUserId,
      campaignId,
    });
    const { status, result } = resp;
    if (status === STATUS_RESPONSE.STATUS_OKE) {
      yield put(actions.getListMessageSuccess(result));
    } else {
      yield put(actions.getListMessageFailed());
    }
  } catch (error) {
    yield put(actions.getListMessageFailed());
    // toastMsgError('Lỗi:  ');
  }
}

export function* addMessage({ payload }) {
  try {
    const resp = yield call(apis.createMessage, payload);
    yield put(actions.addMessageSuccess({ result: resp.result, payload }));
  } catch (error) {
    console.log(error);
  }
}

export function* updateNluMessage({ payload }) {
  try {
    yield call(apis.updateMessage, payload);
    yield put(actions.updateNluMessageSuccess(payload));
  } catch (error) {
    console.log(error);
  }
}

export function* handleConfirmMessage({ payload }) {
  try {
    const resp = yield call(apis.updateIsConfirmMessage, payload);
    const { status } = resp;
    if (status === STATUS_RESPONSE.STATUS_OKE) {
      yield put(actions.handleConfirmMessageSuccess(payload));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* handleCommentMessage({ payload }) {
  try {
    const resp = yield call(apis.updateMessage, payload);
    const { status } = resp;
    if (status === STATUS_RESPONSE.STATUS_OKE) {
      yield put(actions.handleCommentMessageSuccess(payload));
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.actionTypes.GET_LIST_MESSAGE, getListMessage),
    takeLatest(actions.actionTypes.ADD_MESSAGE, addMessage),
    takeLatest(
      actions.actionTypes.HANDLE_CONFIRM_MESSAGE,
      handleConfirmMessage,
    ),
    takeLatest(
      actions.actionTypes.HANDLE_COMMENT_MESSAGE,
      handleCommentMessage,
    ),
    takeLatest(actions.actionTypes.UPDATE_NLU_MESSAGE, updateNluMessage),
  ]);
}
