import api from './api';

export async function apiGetListCampaign({ page, records }) {
  const listCampaign = await api({
    method: 'GET',
    url: '/campaign/list_campaign',
    params: { page, records },
  });
  return listCampaign;
}

export async function apiSearchCampaign(dataSearch) {
  const result = await api({
    method: 'GET',
    url: '/campaign/search',
    params: dataSearch,
  });
  return result;
}

export async function apiUserJoinCampaign({ userId, campaignId }) {
  const result = await api({
    method: 'POST',
    url: '/campaign/user-join',
    data: { userId, campaignId },
  });
  return result;
}

export async function apiUserLeaveCampaign({ userId, campaignId }) {
  const result = await api({
    method: 'POST',
    url: '/campaign/user-leave',
    data: { userId, campaignId },
  });
  return result;
}

export async function apiGetDataCampaign(campaignId) {
  const campaign = await api({
    method: 'GET',
    url: '/campaign/info_campaign',
    params: { campaignId },
  });
  return campaign;
}

export async function apiCreateCampaign(campaign) {
  const result = await api({
    method: 'POST',
    url: '/campaign/create',
    data: { campaign },
  });
  return result;
}
