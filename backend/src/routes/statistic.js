const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const statisticController = require('../controllers/result');

router.get(
  '/statistic/campaign/:campaignId',
  asyncMiddleware(statisticController.getStatisticCampaignById),
);

module.exports = router;
