/* eslint-disable */
var User = require('../models/user');
var Skill = require('../models/skill');
var Venture = require('../models/venture');
var cloudinary = require('../modules/cloudinary');
var Sprint = require('../models/sprint');

module.exports = {

  updateProfile: function(req, res) {
    var username = req.params.username;
    var name = req.body.name;
    var github = req.body.github;
    var linkedin = req.body.linkedin;
    var twitter = req.body.twitter;
    var about = req.body.about;
    var role = req.body.role;
    var skills = req.body.skills;
    var image = req.body.image;

    if(!name){
      return res.status(403).send({ message: 'No Name'});
    }

    User.findOne({ username: username }).exec(function( err, user ){
      if(!user) {
        return res.status(404).send({ message: 'No User'});
      }
      
      if(req.user._id.toString() !== user._id.toString() && req.user.admin) {
        return res.status(403).send({ message: 'Not Authorised.'});
      }

      user.name = name;
      user.linkedin = linkedin;
      user.twitter = twitter;
      user.github = github;
      user.onboardingDone = true;
      user.about = about;
      user.role = role;
      var oldSkills = user.skills;
      user.skills = skills;
      user.image = image;

      user.save(function(err, saved) {
        res.json({ user: saved });

        // Update skills.
        if(!err) {
          oldSkills.forEach(function(skill, i) {
            if(user.skills.indexOf(skill) === -1) {
              Skill.findOneAndUpdate({ _id: skill }, {$pull: { users: user._id } }).exec();
            }
          });

          // Add New TeamMembers. update their profile
          user.skills.forEach(function(skill, i) {
            if(oldSkills.indexOf(skill) === -1) {
              Skill.findOneAndUpdate({ _id: skill }, {$push: { users: user._id } }).exec();
            }
          });
        }
      });

      // upload new image
      if(user.image.slice(0, 10) == 'data:image') {
        cloudinary.uploadImage(user.image, function(url) {
          if(url) {
            User.findOneAndUpdate({ _id: user._id }, { $set: { image: url } }).exec();
          }
        });
      }

    });
  },

  fetchSuggestedUsers: function(req, res) {
    var name = req.query.name;

    if(!name) {
      return res.json({ users: [] });
    }

    User.find({ name: new RegExp(name, "i") }).select('name image').exec(function(err, users) {
      res.json({ users: users });
    });
  },

  getUserDetails: function (req, res) {
    var username = req.params.username;
    if (!username) {
      return res.status(400).send({ message: 'No Username found.' });
    }

    User.findOne({ username: username })
      .populate('ventures', 'name slug logo')
      .populate('skills', 'name slug logo')
      .exec(function(err, user) {

        if (!user) {
          return res.status(404).send({ message: 'Not Found.' });
        }

        res.json({ user: user });
      });
  },

  fetchUsers: function(req, res) {
    User.find().populate('ventures', 'name').exec(function(err, users) {
      res.json({ users: users });
    });
  },

  uploadImage: function(req, res) {
    var data = req.body.data;
    if(!data) {
      return res.status(400).send({ message: 'No Image Found.' });
    }

    cloudinary.uploadImage(data, function(url) {
      res.json({ url: url });
    });
  },

  deleteProfile: function (req, res) {
    if (!req.params.username) {
      return res.status(400).send({ message: "No slug found." });
    }

    if (!req.user.admin) {
      return res.status(400).send({ message: "Unathorized Request." });
    }

    User.findOne({ username: req.params.username }).exec(function (err, user) {
      if(user.admin) {
        return res.status(400).send({ message: 'Cant delete admin.'})
      }
      var ventures = user.ventures;
      var skills = user.skills;
      var userId = user._id;
      user.remove();
      res.send({ message: 'ok' });

      // remove this user from all the ventures who had it.
      Venture.find({ _id: { $in: ventures } }).exec(function (err, ventures) {
        ventures.forEach(function (venture, i) {
          var userIndex = venture.team.findIndex(function (user, i) {
            return user.toString() == userId.toString();
          });
          venture.team.splice(userIndex, 1);
          venture.save();
        });
      });

      Skill.find({ _id: { $in: skills } }).exec(function (err, skills) {
        skills.forEach(function (skill, i) {
          var userIndex = skill.users.findIndex(function (user, i) {
            return user.toString() == userId.toString();
          });
          skill.users.splice(userIndex, 1);
          skill.save();
        });
      });

    });
  }

};
