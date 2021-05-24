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

export async function apiGetDataCampaign(campaignId) {
  const campaign = await api({
    method: 'GET',
    url: '/campaign/info_campaign',
    params: { campaignId },
  });
  return campaign;
}

export async function apiCreateCampaign({ campaign }) {
  const result = await api({
    method: 'POST',
    url: '/campaign/create',
    data: campaign,
  });
  return result;
}

export async function apiEditCampaign({ campaignId, data }) {
  const result = await api({
    method: 'POST',
    url: '/campaign/update',
    data: { campaignId, data },
  });
  return result;
}

export async function apiDeleteCampaign({ campaignId }) {
  const result = await api({
    method: 'DELETE',
    url: `/campaign/delete/${campaignId}`,
  });
  return result;
}

export async function apiChangeStatusCampaign({ campaignId, status }) {
  const result = await api({
    method: 'POST',
    url: `/campaign/change-status-campaign`,
    data: { campaignId, status },
  });
  return result;
}
