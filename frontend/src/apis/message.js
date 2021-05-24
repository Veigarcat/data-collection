import api from './api';

export async function getSkipMessage({ appId, ssoUserId, campaignId }) {
  try {
    const response = await api({
      method: 'GET',
      url: '/message/list-message',
      params: { appId, ssoUserId, campaignId },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function createMessage(message) {
  try {
    const response = await api({
      method: 'POST',
      url: '/message/create',
      data: message,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function updateMessage({ messageId, textComment, nlu }) {
  try {
    const response = await api({
      method: 'POST',
      url: '/message/update',
      data: { messageId, textComment, nlu },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function updateIsConfirmMessage({ messageId, isConfirm }) {
  try {
    const response = await api({
      method: 'POST',
      url: '/message/update-confirm',
      data: { messageId, isConfirm },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getCountMsgConfirm({ intentId, campaignId, ssoUserId }) {
  try {
    const response = await api({
      method: 'GET',
      url: '/message/count-msg-confirm',
      params: { intentId, campaignId, ssoUserId },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
