const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const resultController = require('../controllers/result');

router.get(
  '/result/get-result',
  asyncMiddleware(resultController.getInfoResult),
);

router.post('/result/update', asyncMiddleware(resultController.updateResult));

// tien do nguoi dung theo campaign Id
router.get(
  '/result/statistic-count-user-by-campaign-id',
  asyncMiddleware(resultController.getStatisticCountUserByCampaignId),
);

router.get(
  '/result/detail-result-user-by-campaign-id',
  asyncMiddleware(resultController.getDetailResultUserByCampaignId),
);

// tong quan tat ca chien dich
router.get(
  '/result/statistic-count-user-overview',
  asyncMiddleware(resultController.getStatisticCountUserOverView),
);

module.exports = router;
