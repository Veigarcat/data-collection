const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const messageController = require('../controllers/message');
// const {
//   creatMessageValidate,
//   updateMessageValidate,
// } = require('../validations/message');

router.get(
  '/message/list-message-all',
  asyncMiddleware(messageController.getListMessageAll),
);
router.get(
  '/message/list-message',
  asyncMiddleware(messageController.findMessageByUserId),
);
router.get(
  '/message/skip-message',
  asyncMiddleware(messageController.getSkipMessage),
);
// router.get(
//   '/campaign/search',
//   asyncMiddleware(campaignController.searchCampaign),
// );
router.post(
  '/message/create',
  asyncMiddleware(messageController.createMessage),
);

router.post(
  '/message/update',
  asyncMiddleware(messageController.updateMessage),
);

router.post(
  '/message/update-confirm',
  asyncMiddleware(messageController.updateIsConfirmMessage),
);

router.get(
  '/message/count-msg-confirm',
  asyncMiddleware(messageController.getMsgListByIntent),
);

module.exports = router;
