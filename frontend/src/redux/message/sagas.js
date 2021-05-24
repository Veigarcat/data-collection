import { STATUS_RESPONSE } from '../../constants/index';

const { put, call, all, takeLatest } = require('redux-saga/effects');
const apis = require('../../apis/message');

const actions = require('./actions');

export function* addMessage({ payload }) {
  try {
    const resp = yield call(apis.createMessage, payload);
    yield put(actions.addMessageSuccess({ result: resp.result, payload }));
  } catch (error) {
    console.log(error);
  }
}

export function* handleConfirmMessage({ payload }) {
  try {
    const resp = yield call(apis.updateMessage, payload);
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
    takeLatest(actions.actionTypes.ADD_MESSAGE, addMessage),
    takeLatest(
      actions.actionTypes.HANDLE_CONFIRM_MESSAGE,
      handleConfirmMessage,
    ),
    takeLatest(
      actions.actionTypes.HANDLE_COMMENT_MESSAGE,
      handleCommentMessage,
    ),
  ]);
}
