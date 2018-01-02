var router = require('express').Router();
var User = require('../models/user');
var userController = require('../controllers/users.controller');
var checkAuth = require('../modules/checkAuth');

router.route('/').get(checkAuth.isUser, userController.fetchUsers);

router.route('/update/:username').post(checkAuth.isUser, userController.updateProfile);

router.route('/delete/:username').post(checkAuth.isUser, userController.deleteProfile);

router.route('/upload/image').post(checkAuth.isUser, userController.uploadImage);

router.route('/suggestions/fetch').get(checkAuth.isUser, userController.fetchSuggestedUsers);

router.route('/:username').get(checkAuth.isUser, userController.getUserDetails);

module.exports = router;
