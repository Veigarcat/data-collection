import { STATUS_RESPONSE } from '../../constants/index';

import { toastMsgError } from '../../commons/Toastify';

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
      participantStatus,
      status,
      messageType,
      messageObject,
      timeStart,
      timeEnd,
      page,
      records,
      scope,
      collectType,
    } = payload;
    const resp = yield call(apis.apiSearchCampaign, {
      key,
      participantStatus,
      status,
      userId,
      messageType,
      messageObject,
      page,
      records,
      timeStart,
      timeEnd,
      scope,
      collectType,
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

export function* createCampaign({ payload }) {
  const campaign = payload;
  const resp = yield call(apis.apiCreateCampaign, { campaign });
  const { status, message } = resp;
  if (status === STATUS_RESPONSE.STATUS_OKE) {
    yield put(actions.fetchHandleCampaignSuccess(true));
  } else {
    toastMsgError(`Lỗi:  ${status} - ${message}`);
  }
}

export function* editCampaign({ payload }) {
  const { campaignId, data } = payload;
  const resp = yield call(apis.apiEditCampaign, { campaignId, data });
  const { status, message } = resp;
  if (status === STATUS_RESPONSE.STATUS_OKE) {
    yield put(actions.fetchHandleCampaignSuccess(true));
  } else {
    toastMsgError(`Lỗi:  ${status} - ${message}`);
  }
}

export function* deleteCampaign({ payload }) {
  const { campaignId } = payload;
  const resp = yield call(apis.apiDeleteCampaign, { campaignId });
  const { status, message } = resp;
  if (status === STATUS_RESPONSE.STATUS_OKE) {
    yield put(actions.fetchHandleCampaignSuccess(true));
  } else {
    toastMsgError(`Lỗi:  ${status} - ${message}`);
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.actionTypes.FETCH_CAMPAIGN, fetchCampaign),
    takeLatest(actions.actionTypes.GET_DATA_CAMPAIGN, getDataCampaign),
    takeLatest(actions.actionTypes.FILTER_SEARCH, searchCampaign),
    takeLatest(actions.actionTypes.CREATE_CAMPAIGN, createCampaign),
    takeLatest(actions.actionTypes.EDIT_CAMPAIGN, editCampaign),
    takeLatest(actions.actionTypes.DELETE_CAMPAIGN, deleteCampaign),
  ]);
}
