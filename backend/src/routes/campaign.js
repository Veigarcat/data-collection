const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const campaignController = require('../controllers/campaign');
const { creatCampaignValidate } = require('../validations/campaign');

router.get(
  '/campaign/list-all',
  asyncMiddleware(campaignController.getListAllCampaign),
);
router.get(
  '/campaign/info_campaign',
  asyncMiddleware(campaignController.getInfoCampaign),
);
router.get(
  '/campaign/search',
  asyncMiddleware(campaignController.searchCampaign),
);
router.post(
  '/campaign/create',
  creatCampaignValidate,
  asyncMiddleware(campaignController.createCampaign),
);
router.post(
  '/campaign/update',
  asyncMiddleware(campaignController.updateCampaign),
);

router.delete(
  '/campaign/delete/:campaignId',
  asyncMiddleware(campaignController.deleteCampaign),
);
router.post(
  '/campaign/change-status-campaign',
  asyncMiddleware(campaignController.changeStatusCampaign),
);

module.exports = router;
