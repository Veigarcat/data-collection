const statisticService = require('../services/statistic');

const getStatisticCampaignById = async (req, res) => {
  const result = await statisticService.getStatisticCampaignById();
  return res.send({ status: 1, result });
};

module.exports = {
  getStatisticCampaignById,
};
