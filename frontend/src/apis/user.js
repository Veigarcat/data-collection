import api from './api';

export async function apiFilterUser(dataSearch) {
  const result = await api({
    method: 'GET',
    url: '/users/search',
    params: dataSearch,
  });
  return result;
}

export async function apiSearchAllByKeyEmail(dataSearch) {
  const result = await api({
    method: 'GET',
    url: '/users/search-all-by-key-email',
    params: dataSearch,
  });
  return result;
}

export async function apiGetUser(condition) {
  const user = await api({
    method: 'GET',
    url: '/user/get-user',
    params: { condition },
  });
  return user;
}
export async function apiAllGetUser() {
  const users = await api({
    method: 'GET',
    url: '/user/get-all-user',
  });
  return users;
}
export async function apiUserJoinCampaign({ userId, campaignId }) {
  const result = await api({
    method: 'POST',
    url: '/user/user-join',
    data: { userId, campaignId },
  });
  return result;
}

export async function apiUserLeaveCampaign({ userId, campaignId }) {
  const result = await api({
    method: 'POST',
    url: '/user/user-leave',
    data: { userId, campaignId },
  });
  return result;
}

export async function handleAcceptInvite({ userId, campaignId }) {
  const result = await api({
    method: 'POST',
    url: '/user/handle-accept-invite',
    data: { userId, campaignId },
  });
  return result;
}

export async function apiEditUser({ accessToken, user }) {
  const result = await api({
    method: 'POST',
    url: '/user/edit-user',
    data: { accessToken, data: user },
  });
  return result;
}
