import { STATUS_RESPONSE } from '../../constants/index';

import { toastMsgError, toastSuccess } from '../../commons/Toastify';

const { put, call, all, takeLatest } = require('redux-saga/effects');
const apis = require('../../apis/campaign');

const actions = require('./actions');

export function* fetchCampaign({ payload }) {
  try {
    const { page, records } = payload;
    const resp = yield call(apis.apiGetListCampaign, { page, records });
    const { status, result } = resp;
    if (status === STATUS_RESPONSE.STATUS_OKE) {
      yield put(actions.fetchListCampaignSuccess(result));
    } else {
      yield put(actions.fetchListCampaignFailed());
    }
  } catch (error) {
    yield put(actions.fetchListCampaignFailed());
    // toastMsgError('Lỗi:  ');
  }
}

export function* searchCampaign({ payload }) {
  try {
    const {
      key,
      userId,
      typeCampaign,
      status,
      typeMessage,
      objectMessage,
      timeStart,
      timeEnd,
      page,
      records,
    } = payload;
    const resp = yield call(apis.apiSearchCampaign, {
      key,
      typeCampaign,
      status,
      userId,
      typeMessage,
      objectMessage,
      page,
      records,
      timeStart,
      timeEnd,
    });
    const { result } = resp;
    if (resp.status === STATUS_RESPONSE.STATUS_OKE) {
      yield put(actions.fetchListCampaignSuccess(result));
    } else {
      yield put(actions.fetchListCampaignFailed());
    }
  } catch (error) {
    yield put(actions.fetchListCampaignFailed());
    // toastMsgError('Lỗi:  ');
  }
}

export function* getDataCampaign({ payload }) {
  const { campaignId } = payload;
  const resp = yield call(apis.apiGetDataCampaign, { campaignId });
  const { status, data, message } = resp.data;

  if (STATUS_RESPONSE.OK === status) {
    yield put(actions.getDataCampaign(data));
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
      yield put(actions.userJoinCampaignSuccess({ campaignId, userId }));
    } else {
      const { code, message } = resp;
      toastMsgError(`Lỗi:  ${code} - ${message}`);
    }
  } catch (error) {
    toastMsgError('Lỗi:  ');
  }
}

export function* userLeaveCampaign({ payload }) {
  try {
    const { campaignId, userId } = payload;
    const resp = yield call(apis.apiUserLeaveCampaign, { campaignId, userId });
    const { status } = resp;
    if (status === STATUS_RESPONSE.STATUS_OKE) {
      toastSuccess('Rời chiến dịch thành công');
      yield put(actions.userLeaveCampaignSuccess({ campaignId, userId }));
    } else {
      const { code, message } = resp;
      toastMsgError(`Lỗi:  ${code} - ${message}`);
    }
  } catch (error) {
    toastMsgError('Lỗi:  ');
  }
}

export function* createCampaign({ payload }) {
  const resp = yield call(apis.apiCreateCampaign, { payload });
  const { status, message } = resp.data;

  if (STATUS_RESPONSE.OK === status) {
    yield put(actions.fetchCreateCampaignSuccess(true));
  } else {
    toastMsgError(`Lỗi:  ${status} - ${message}`);
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.actionTypes.FETCH_CAMPAIGN, fetchCampaign),
    takeLatest(actions.actionTypes.GET_DATA_CAMPAIGN, getDataCampaign),
    takeLatest(actions.actionTypes.USER_JOIN_CAMPAIGN, userJoinCampaign),
    takeLatest(actions.actionTypes.USER_LEAVE_CAMPAIGN, userLeaveCampaign),
    takeLatest(actions.actionTypes.FILTER_SEARCH, searchCampaign),
    takeLatest(actions.actionTypes.CREATE_CAMPAIGN, createCampaign),
  ]);
}
