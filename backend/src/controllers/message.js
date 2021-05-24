const messageService = require('../services/message');

const findMessageByUserId = async (req, res) => {
  const { appId, ssoUserId, campaignId, limit, sort } = req.query;

  const result = await messageService.findMessageByUserId({
    appId,
    ssoUserId,
    campaignId,
    limit,
    sort,
  });
  return res.send({ status: 1, result });
};

const getListMessageAll = async (req, res) => {
  const { appId, ssoUserId, campaignId } = req.query;
  const result = await messageService.getListMessage({
    appId,
    ssoUserId,
    campaignId,
  });
  return res.send({ status: 1, result });
};

const getSkipMessage = async (req, res) => {
  const { appId, ssoUserId, messageId, limit, campaignId } = req.query;
  const result = await messageService.getSkipMessage({
    appId,
    ssoUserId,
    messageId,
    limit,
    campaignId,
  });
  return res.send({ status: 1, result });
};

const createMessage = async (req, res) => {
  const message = req.body;
  const result = await messageService.createMessage(message);
  return res.send({ status: 1, result });
};

const updateMessage = async (req, res) => {
  const { messageId, textComment, nlu } = req.body;
  const result = await messageService.updateMessage({
    messageId,
    textComment,
    nlu,
  });
  return res.send({ status: 1, result });
};

const updateIsConfirmMessage = async (req, res) => {
  const { messageId, isConfirm } = req.body;
  const result = await messageService.updateIsConfirmMessage({
    messageId,
    isConfirm,
  });
  return res.send({ status: 1, result });
};

const getMsgListByIntent = async (req, res) => {
  const { intentId, campaignId, ssoUserId, usecaseId } = req.query;
  const result = await messageService.getMsgListByIntent({
    intentId,
    campaignId,
    ssoUserId,
    usecaseId,
  });
  return res.send({ status: 1, result });
};

module.exports = {
  getListMessageAll,
  findMessageByUserId,
  getSkipMessage,
  createMessage,
  updateMessage,
  updateIsConfirmMessage,
  getMsgListByIntent,
};
