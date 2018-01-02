var Venture = require('../models/venture');
var User = require('../models/user');
var cloudinary = require('../modules/cloudinary');

module.exports = {

  fetchVentures: function(req, res) {
    Venture.find({}).populate('team', 'name image').exec(function(err, ventures){
      return res.json({ ventures: ventures });
    });
  },

  getVentureDetails: function(req, res) {

    if (!req.params.slug) {
      return res.status(400).send({ message: "No slug found." });
    }

    Venture.findOne({ slug: req.params.slug }).populate('team', 'name image username skills').exec(function(err, venture){
      return res.json({ venture: venture });
    });

  },

  updateVentureDetails: function(req, res) {
    if (!req.params.slug) {
      return res.status(400).send({ message: "No slug found." });
    }

    var name = req.body.name;
    var problemStatement = req.body.problemStatement;
    var mvp = req.body.mvp;
    var team = req.body.team;
    var logo = req.body.logo;

    if (!name) {
      return res.status(400).send({ message: "No name found." });
    }

    team = team.map(function (t) {
      return t._id;
    });

    if (!req.user.admin && (team.indexOf(req.user._id) == -1) ) {
      return res.status(403).send({ message: "Not authorized." });
    }

    Venture.findOne({ slug: req.params.slug }).exec(function(err, venture){
      venture.name = name;
      venture.problemStatement = problemStatement;
      venture.mvp = mvp;
      var oldTeam = venture.team;
      venture.team = team;

      venture.save(function(err, saved) {
        res.json({ venture: saved });
      });

      if(logo) {
        cloudinary.uploadImage(logo, function(url) {
          Venture.findOneAndUpdate({ _id: venture._id }, { $set: { logo: url } }).exec();
        });
      }

      // Remove all old team members. update their profile.
      oldTeam.forEach(function(member, i) {
        if(venture.team.indexOf(member) === -1) {
          User.findOneAndUpdate({ _id: member }, {$pull: {ventures: venture._id } }).exec();
        }
      });

      // Add New TeamMembers. update their profile
      venture.team.forEach(function(member, i) {
        if(oldTeam.indexOf(member) === -1) {
          User.findOneAndUpdate({ _id: member }, {$push: {ventures: venture._id } }).exec();
        }
      });

    });
  },

  deleteVenture: function (req, res) {
    if (!req.params.slug) {
      return res.status(400).send({ message: "No slug found." });
    }

    if (!req.user.admin) {
      return res.status(400).send({ message: "Unathorized Request." });
    }

    Venture.findOne({ slug: req.params.slug }).exec(function (err, venture) {
      var users = venture.team;
      var ventureId = venture._id;

      venture.remove();
      res.send({ message: 'ok' });

      // remove this venture from all the users who had it.
      User.find({ _id: { $in: users } }).exec(function (err, users) {
        users.forEach(function (user, i) {
          var ventureIndex = user.ventures.findIndex(function (venture, i) {
            return venture.toString() == ventureId.toString();
          });
          user.ventures.splice(ventureIndex, 1);
          user.save();
        });
      });

    });
  }

}
