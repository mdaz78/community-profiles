/* eslint-disable func-names, prefer-arrow-callback, vars-on-top, no-var, object-shorthand  */

var slug = require('slug');
var cuid = require('cuid');
var Venture = require('../models/venture');
var Skill = require('../models/skill');
var User = require('../models/user');

module.exports = {

  addNewVenture: function (req, res) {

    var name = req.body.name;
    var problemStatement = req.body.problemStatement;
    var mvp = req.body.mvp;
    var team = req.body.team;
    var logo = req.body.logo;

    if (!name) {
      return res.status(403).send({ message: 'Name is must.' });
    }

    team = team.map(function (t) {
      return t._id;
    });

    var ventureSlug = slug(req.body.name.toLowerCase());

    Venture.findOne({ slug: ventureSlug }).exec(function(err, venture) {
      if (venture) {
        ventureSlug += ("-" + cuid());
      }

      var newVenture = new Venture({ name, problemStatement, mvp, team, logo, slug: ventureSlug });

      newVenture.save(function (err, saved) {
        if (err) {
          return res.status(500).send({ message: 'Internal Server Error.' });
        }

        res.json({ venture: saved });

        if(logo) {
          cloudinary.uploadImage(logo, function(url) {
            Venture.findOneAndUpdate({ _id: saved._id }, { $set: { logo: url } }).exec();
          });
        } 

        team.forEach(function(user) {
          User.findOneAndUpdate({ _id: user }, { $push: { ventures: saved._id } }).exec();
        });
      });


    });

    

  },

  fetchVentures: function (req, res) {
    Venture.find({}).populate('team', 'name image').exec(function (err, ventures) {
      return res.json({ ventures: ventures});
    });
  },

  addNewSkill: function (req, res) {

    var name = req.body.name;
    var description = req.body.description;
    var logo = req.body.logo;
    var skillSlug = slug(name.toLowerCase());

    if(!name) {
      return res.status(403).send({ message: 'Name is must.'});
    }

    Skill.findOne({ slug: skillSlug }).exec(function(err, skill) {
      if (skill) {
        skillSlug += ("-" + cuid());
      }
      
      var newSkill = new Skill({ name, description, logo, slug: skillSlug });

      newSkill.save(function(err, saved) {
        if (err) {
          return res.status(500).send({ message: 'Internal Server Error.'});
        }

        return res.json({ skill: saved });
      });
    });
  },

  fetchSkills: function (req, res) {
    Skill.find({}).exec(function (err, skills) {
      return res.json({ skills: skills });
    });
  },

  fetchStats: function (req, res) {
    Skill.count({}).exec(function (err, skills) {
      User.count({}).exec(function (err, users) {
        Venture.count({}).exec(function (err, ventures) {
          res.json({ stats: { ventures: ventures, users: users, skills: skills } });
        })
      })
    });
  },

}
