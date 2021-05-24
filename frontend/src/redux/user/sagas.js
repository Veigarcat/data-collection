import { STATUS_RESPONSE } from '../../constants/index';
import { toastMsgError, toastSuccess } from '../../commons/Toastify';

const { put, call, all, takeLatest } = require('redux-saga/effects');
const apis = require('../../apis/user');

const actions = require('./actions');

export function* filterUser({ payload }) {
  try {
    const { page, records } = payload;
    const resp = yield call(apis.apiFilterUser, {
      page,
      records,
      key: payload.key,
      status: payload.status,
    });
    const { status, result } = resp;
    if (status === STATUS_RESPONSE.STATUS_OKE) {
      yield put(actions.fetchListUserSuccess(result));
    } else {
      yield put(actions.fetchListUserFailed());
    }
  } catch (error) {
    yield put(actions.fetchListUserFailed());
    // toastMsgError('Lỗi:  ');
  }
}

export function* getDataUser({ payload }) {
  const { userId } = payload;
  const resp = yield call(apis.apiGetDataUser, { userId });
  const { status, data, message } = resp.data;

  if (STATUS_RESPONSE.OK === status) {
    yield put(actions.getDataUser(data));
  } else {
    toastMsgError(`Lỗi:  ${status} - ${message}`);
  }
}

export function* userJoinCampaign({ payload }) {
  try {
    const { campaignId, userId } = payload;
    const resp = yield call(apis.apiUserJoinCampaign, { campaignId, userId });
    const { status } = resp;
    if (status === STATUS_RESPONSE.STATUS_OKE) {
      toastSuccess('Đăng ký tham gia thành công');
      yield put(actions.userJoinCampaignSuccess(true));
    } else {
      const { code, message } = resp;
      toastMsgError(`Lỗi:  ${code} - ${message}`);
    }
  } catch (error) {
    toastMsgError('Lỗi:  ');
  }
}

export function* editUser({ payload }) {
  const { accessToken, user } = payload;
  const resp = yield call(apis.apiEditUser, { accessToken, user });
  const { status, message } = resp;
  if (status === STATUS_RESPONSE.STATUS_OKE) {
    yield put(actions.fetchHandleUserSuccess(true));
  } else {
    toastMsgError(`Lỗi:  ${status} - ${message}`);
  }
}

export function* userLeaveCampaign({ payload }) {
  try {
    const { campaignId, userId } = payload;
    const resp = yield call(apis.apiUserLeaveCampaign, { campaignId, userId });
    const { status } = resp;
    if (status === STATUS_RESPONSE.STATUS_OKE) {
      toastSuccess('Rời chiến dịch thành công');
      yield put(actions.userLeaveCampaignSuccess(true));
    } else {
      const { code, message } = resp;
      toastMsgError(`Lỗi:  ${code} - ${message}`);
    }
  } catch (error) {
    toastMsgError('Lỗi:  ');
  }
}

export function* handleAcceptInvite({ payload }) {
  try {
    const { campaignId, userId } = payload;
    const resp = yield call(apis.handleAcceptInvite, { campaignId, userId });
    const { status } = resp;
    if (status === STATUS_RESPONSE.STATUS_OKE) {
      toastSuccess('Bạn đã chấp nhận lời mời');
      yield put(actions.handleAcceptInviteSuccess(true));
    } else {
      const { code, message } = resp;
      toastMsgError(`Lỗi:  ${code} - ${message}`);
    }
  } catch (error) {
    toastMsgError('Lỗi:  ');
  }
}
export default function* rootSaga() {
  yield all([
    takeLatest(actions.actionTypes.FILTER_USER, filterUser),
    takeLatest(actions.actionTypes.GET_DATA_USER, getDataUser),
    takeLatest(actions.actionTypes.USER_JOIN_CAMPAIGN, userJoinCampaign),
    takeLatest(actions.actionTypes.USER_LEAVE_CAMPAIGN, userLeaveCampaign),
    takeLatest(actions.actionTypes.HANDLE_ACCEPT_INVITE, handleAcceptInvite),
    takeLatest(actions.actionTypes.HANDLE_EDIT_USER, editUser),
  ]);
}
