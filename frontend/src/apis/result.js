import api from './api';

export async function apiGetDataResult({ campaignId, userId }) {
  const dataGetResult = await api({
    method: 'GET',
    url: '/result/get-result',
    params: { campaignId, userId },
  });
  return dataGetResult;
}

export async function apiUpdateResult({
  campaignId,
  userId,
  usecaseId,
  data,
  type,
}) {
  const result = await api({
    method: 'POST',
    url: `/result/update`,
    data: { campaignId, userId, data, usecaseId, type },
  });
  return result;
}
export async function apiStatisticCountUserByCampaignId({
  campaignId,
  userId,
}) {
  const data = await api({
    method: 'GET',
    url: 'result/statistic-count-user-by-campaign-id',
    params: { campaignId, userId },
  });
  return data;
}

export async function apiStatisticCountUserOverView({ userId }) {
  const data = await api({
    method: 'GET',
    url: '/result/statistic-count-user-overview',
    params: { userId },
  });
  return data;
}

export async function getDetailResultUserByCampaignId({ userId, campaignId }) {
  const data = await api({
    method: 'GET',
    url: '/result/detail-result-user-by-campaign-id',
    params: { userId, campaignId },
  });
  return data;
}
