const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const overviewController = require('../controllers/admin/overview.js');

router.get('/admin/overview', asyncMiddleware(overviewController.overview));

module.exports = router;
