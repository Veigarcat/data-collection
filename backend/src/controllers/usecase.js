/* eslint-disable no-console */
const usecaseService = require('../services/usecase');

const getRenderAutoChatInfo = async (req, res) => {
  const { campaignId, userId } = req.query;
  const result = await usecaseService.getRenderAutoChatInfo({
    campaignId,
    userId,
  });
  return res.send({ status: 1, result });
};

const getListUsecaseNeedChat = async (req, res) => {
  const { campaignId, userId, usecaseId } = req.query;
  const result = await usecaseService.getListUsecaseNeedChat({
    campaignId,
    userId,
    usecaseId,
  });
  return res.send({ status: 1, result });
};

const endUsecase = async (req, res) => {
  const { campaignId, userId, usecaseId } = req.body;
  const result = await usecaseService.endUsecase({
    campaignId,
    userId,
    usecaseId,
  });
  return res.send({ status: 1, result });
};

const getInfoUsecaseById = async (req, res) => {
  const { campaignId, userId, usecaseId } = req.query;
  const result = await usecaseService.getInfoUsecaseById({
    campaignId,
    userId,
    usecaseId,
  });
  return res.send({ status: 1, result });
};

module.exports = {
  getRenderAutoChatInfo,
  getListUsecaseNeedChat,
  endUsecase,
  getInfoUsecaseById,
};
