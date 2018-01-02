var Skill = require('../models/skill');
var User = require('../models/user');
var cloudinary = require('../modules/cloudinary');

module.exports = {
 
  fetchSkills: function (req, res) {
    Skill.find({}).exec(function(err, skills){
      return res.json({ skills: skills });
    });
  },

  getSkillDetails: function (req, res) {

    if (!req.params.slug) {
      return res.status(400).send({ message: "No slug found." });
    }

    Skill.findOne({ slug: req.params.slug }).populate({ path: 'users', select: 'name username image ventures', populate: { path: 'ventures', select: 'name logo' } }).exec(function(err, skill){
      return res.json({ skill: skill });
    });
  },

  updateSkillDetails: function (req, res) {

    if (!req.params.slug) {
      return res.status(400).send({ message: "No slug found." });
    }

    if(!req.body.name) {
      return res.status(400).send({ message: 'Name is a must' });
    }

    if(!req.user.admin) {
      return res.status(400).send({ message: "No name found." });
    }

    Skill.findOneAndUpdate({ slug: req.params.slug }, { $set: { name: req.body.name, description: req.body.description } })
      .exec(function(err, saved) {

        if (req.body.logo) {
          cloudinary.uploadImage(req.body.logo, function(url) {
            Skill.findOneAndUpdate({ slug: req.params.slug }, { $set: { logo: url } }).exec(function(){
              res.status(200).end();
            });
          });
        } else {
          res.status(200).end();
        }

      }
    )

  },

  deleteSkill: function (req, res) {
    if (!req.params.slug) {
      return res.status(400).send({ message: "No slug found." });
    }

    if (!req.user.admin) {
      return res.status(400).send({ message: "Unathorized Request." });
    }

    Skill.findOne({ slug: req.params.slug }).exec(function (err, skill) {
      var users = skill.users;
      var skillId = skill._id;
      skill.remove();
      res.send({ message: 'ok' });

      // remove this skill from all the users who had it.
      User.find({ _id: { $in: users } }).exec(function (err, users) {
        users.forEach(function (user, i) {
          var skillIndex = user.skills.findIndex(function (skill, i) {
            return skill.toString() == skillId.toString();
          });
          user.skills.splice(skillIndex, 1);
          user.save();
        });
      });

    });
  },

};
