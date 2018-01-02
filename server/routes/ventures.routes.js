var router = require('express').Router();
var User = require('../models/user');
var venturesController = require('../controllers/ventures.controller');
var checkAuth = require('../modules/checkAuth');

router.route('/').get(checkAuth.isUser, venturesController.fetchVentures);

router.route('/:slug').get(checkAuth.isUser, venturesController.getVentureDetails);

router.route('/update/:slug').post(checkAuth.isAdmin, venturesController.updateVentureDetails);

router.route('/delete/:slug').post(checkAuth.isAdmin, venturesController.deleteVenture);

module.exports = router;
