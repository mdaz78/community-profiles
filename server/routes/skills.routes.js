var router = require('express').Router();
var User = require('../models/user');
var skillsController = require('../controllers/skills.controller');
var checkAuth = require('../modules/checkAuth');

router.route('/:slug').get(checkAuth.isUser, skillsController.getSkillDetails);

router.route('/').get(checkAuth.isUser, skillsController.fetchSkills);

router.route('/update/:slug').post(checkAuth.isAdmin, skillsController.updateSkillDetails);

router.route('/delete/:slug').post(checkAuth.isAdmin, skillsController.deleteSkill);

module.exports = router;
