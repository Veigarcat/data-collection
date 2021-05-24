const resultService = require('../services/result');

const getInfoResult = async (req, res) => {
  const { campaignId, userId } = req.query;
  const result = await resultService.getInfoResult({ campaignId, userId });
  return res.send({ status: 1, result });
};

const updateResult = async (req, res) => {
  const { campaignId, userId, data, usecaseId, type } = req.body;
  const result = await resultService.updateResult({
    campaignId,
    userId,
    usecaseId,
    data,
    type,
  });
  return res.send({ status: 1, result });
};

const getStatisticCountUserByCampaignId = async (req, res) => {
  const { campaignId, userId } = req.query;
  const dataProgress = await resultService.getStatisticCountUserByCampaignId({
    campaignId,
    userId,
  });
  return res.send({ status: 1, result: dataProgress });
};

const getStatisticCountUserOverView = async (req, res) => {
  const { userId } = req.query;
  const dataProgress = await resultService.getStatisticCountUserOverView({
    userId,
  });
  return res.send({ status: 1, result: dataProgress });
};

const getDetailResultUserByCampaignId = async (req, res) => {
  const { campaignId, userId } = req.query;
  const dataProgress = await resultService.getDetailResultUserByCampaignId({
    campaignId,
    userId,
  });
  return res.send({ status: 1, result: dataProgress });
};

module.exports = {
  getInfoResult,
  updateResult,
  getStatisticCountUserByCampaignId,
  getDetailResultUserByCampaignId,
  getStatisticCountUserOverView,
};
