var router = require('express').Router();
var User = require('../models/user');
var sprintController = require('../controllers/sprints.controller');
var checkAuth = require('../modules/checkAuth');

router.route('/').get(checkAuth.isUser, sprintController.fetchSprints);

router.route('/new').post(checkAuth.isUser, sprintController.createNewSprint);

router.route('/toggle-attend').post(checkAuth.isUser, sprintController.toggleAttendance);

router.route('/update').post(checkAuth.isUser, sprintController.updateSprint);

router.route('/delete').post(checkAuth.isUser, sprintController.deleteSprint);

module.exports = router;
