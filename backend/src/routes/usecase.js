const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const usecaseController = require('../controllers/usecase');

router.get(
  '/chatInfo/auto-gender',
  asyncMiddleware(usecaseController.getRenderAutoChatInfo),
);
router.get(
  '/campaign/get-list-convert-usecase',
  asyncMiddleware(usecaseController.getListUsecaseNeedChat),
);
router.post(
  '/usecase/end-usecase',
  asyncMiddleware(usecaseController.endUsecase),
);
router.get(
  '/usecase/chat-info-by-id',
  asyncMiddleware(usecaseController.getInfoUsecaseById),
);

module.exports = router;
