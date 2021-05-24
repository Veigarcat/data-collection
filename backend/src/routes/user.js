const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const { auth } = require('../middlewares/auth');
const userController = require('../controllers/user');
const { userJoinValidate } = require('../validations/campaign');

router.get('/users/search', asyncMiddleware(userController.searchUsers));

router.get(
  '/users/search-all-by-key-email',
  asyncMiddleware(userController.searchAllByKey),
);
router.get('/user/get-user', asyncMiddleware(userController.getUser));
router.get('/user/get-all', asyncMiddleware(userController.getAllUser));
router.post('/user/edit-user', auth, asyncMiddleware(userController.editUser));
router.post(
  '/user/user-join',
  userJoinValidate,
  asyncMiddleware(userController.userJoinCampaign),
);
router.post(
  '/user/user-leave',
  userJoinValidate,
  asyncMiddleware(userController.userLeaveCampaign),
);
router.post(
  '/user/handle-accept-invite',
  userJoinValidate,
  asyncMiddleware(userController.userAcceptInvite),
);
module.exports = router;
