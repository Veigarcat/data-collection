import api from './api';

export async function getSkipMessage({ appId, userId, messageId, limit }) {
  try {
    const response = await api({
      method: 'GET',
      url: '/skip-message',
      params: { appId, userId, messageId, limit },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function createMessage({
  userId,
  messageId,
  appId,
  campaignId,
  textComment,
  isConfirm,
}) {
  try {
    const response = await api({
      method: 'POST',
      url: '/message/create',
      data: { userId, appId, messageId, campaignId, textComment, isConfirm },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function updateMessage({ id, textComment, isConfirm }) {
  try {
    const response = await api({
      method: 'POST',
      url: '/message/update',
      data: { id, textComment, isConfirm },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
