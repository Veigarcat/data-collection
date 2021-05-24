import { STATUS_RESPONSE } from '../../constants/index';

import { toastMsgError } from '../../commons/Toastify';

const { put, call, all, takeLatest } = require('redux-saga/effects');
const apis = require('../../apis/usecase');
const actions = require('./actions');

export function* addUsecase({ payload }) {
  try {
    const resp = yield call(apis.apiAddUsecase, payload);
    const { status, result } = resp;
    if (status === STATUS_RESPONSE.STATUS_OKE) {
      yield put(actions.actionHandleUsecaseSuccess(true));
      yield put(actions.addUsecaseToList(result));
    } else {
      const { code, message } = resp;
      toastMsgError(`${code} ${message}`);
    }
  } catch (error) {
    toastMsgError('Lỗi: Tạo kịch bản mới không thành công ');
  }
}

export function* deleteUsecase({ payload }) {
  try {
    const { usecaseId } = payload;
    const resp = yield call(apis.apiDeleteUsecase, payload);
    const { status } = resp;
    if (status === STATUS_RESPONSE.STATUS_OKE) {
      yield put(actions.actionHandleUsecaseSuccess(true));
      yield put(actions.deleteUsecaseToList(usecaseId));
    } else {
      const { code, message } = resp;
      toastMsgError(`${code} ${message}`);
    }
  } catch (error) {
    toastMsgError('Lỗi: Xóa kịch bản không thành công ');
  }
}

export function* editUsecase({ payload }) {
  try {
    const { usecaseId, data } = payload;
    const resp = yield call(apis.apiEditUsecase, { usecaseId, data });
    const { status } = resp;
    if (status === STATUS_RESPONSE.STATUS_OKE) {
      yield put(actions.actionHandleUsecaseSuccess(true));
      yield put(actions.editUsecaseToList({ usecaseId, data }));
    } else {
      const { code, message } = resp;
      toastMsgError(`${code} ${message}`);
    }
  } catch (error) {
    toastMsgError('Lỗi: Chỉnh sửa kịch bản không thành công ');
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.actionTypes.ADD_USECASE, addUsecase),
    takeLatest(actions.actionTypes.DELETE_USECASE, deleteUsecase),
    takeLatest(actions.actionTypes.EDIT_USECASE, editUsecase),
  ]);
}
