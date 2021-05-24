const overviewService = require('../../services/admin/overview');

const overview = async (req, res) => {
  const dataOverview = await overviewService.overview();
  return res.send({ status: 1, result: dataOverview });
};

module.exports = {
  overview,
};
