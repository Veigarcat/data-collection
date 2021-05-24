import api from './api';

export async function getListUsecaseNeedChat({
  campaignId,
  userId,
  usecaseId,
}) {
  const result = await api({
    method: 'GET',
    url: `/campaign/get-list-convert-usecase`,
    params: { campaignId, userId, usecaseId },
  });
  return result;
}

export async function renderAutoChatInfo({ campaignId, userId }) {
  const result = await api({
    method: 'GET',
    url: `/chatInfo/auto-gender`,
    params: { campaignId, userId },
  });
  return result;
}

export async function apiEndUsecase({ campaignId, userId, usecaseId }) {
  const result = await api({
    method: 'POST',
    url: '/usecase/end-usecase',
    data: { campaignId, userId, usecaseId },
  });
  return result;
}

export async function getInfoUsecaseById({ campaignId, userId, usecaseId }) {
  const result = await api({
    method: 'GET',
    url: `/usecase/chat-info-by-id`,
    params: { campaignId, userId, usecaseId },
  });
  return result;
}
