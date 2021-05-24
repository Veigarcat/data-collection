const campaignService = require('../services/campaign');

const getListAllCampaign = async (req, res) => {
  const listCampaign = await campaignService.getListAllCampaign();
  return res.send({ status: 1, result: listCampaign });
};

const getInfoCampaign = async (req, res) => {
  const { campaignId } = req.query;
  const infoCampaign = await campaignService.getInfoCampaign(campaignId);
  return res.send({ status: 1, result: infoCampaign });
};

const searchCampaign = async (req, res) => {
  const { query } = req;
  const result = await campaignService.searchCampaign(query);
  return res.send({ status: 1, result });
};

const createCampaign = async (req, res) => {
  const campaign = req.body;
  const result = await campaignService.createCampaign(campaign);
  return res.send({ status: 1, result });
};

const deleteCampaign = async (req, res) => {
  const { campaignId } = req.params;
  const result = await campaignService.deleteCampaign(campaignId);
  return res.send({ status: 1, result });
};

const updateCampaign = async (req, res) => {
  const { campaignId, data } = req.body;
  const result = await campaignService.updateCampaign({ campaignId, data });
  return res.send({ status: 1, result });
};

const changeStatusCampaign = async (req, res) => {
  const { campaignId, status } = req.body;
  const result = await campaignService.changeStatusCampaign({
    campaignId,
    status,
  });
  return res.send({ status: 1, result });
};

module.exports = {
  getListAllCampaign,
  searchCampaign,
  createCampaign,
  deleteCampaign,
  updateCampaign,
  getInfoCampaign,
  changeStatusCampaign,
};
