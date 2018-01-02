var router = require('express').Router();
var User = require('../models/user');
var adminController = require('../controllers/admin.controller');
var checkAuth = require('../modules/checkAuth');

router.route('/ventures').get(checkAuth.isAdmin, adminController.fetchVentures);

router.route('/ventures/new').post(checkAuth.isAdmin, adminController.addNewVenture);

router.route('/skills').get(checkAuth.isAdmin, adminController.fetchSkills);

router.route('/stats').get(checkAuth.isAdmin, adminController.fetchStats);

router.route('/skills/new').post(checkAuth.isAdmin, adminController.addNewSkill);

module.exports = router;
