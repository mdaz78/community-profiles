var Sprint = require('../models/sprint');
var User = require('../models/user');
var Skill = require('../models/skill');
var cloudinary = require('../modules/cloudinary');

module.exports = {
 
  fetchSprints: function (req, res) {
    Sprint.find({}).populate({ path: 'sprintHead participants category', populate: { path: 'ventures' } }).sort('-dateAdded').exec(function(err, sprints){
      return res.json({ sprints: sprints });
    });
  },

  createNewSprint: function (req, res) {
    var description = req.body.description;
    var category = req.body.category;
    var dateTime = req.body.dateTime;

    if(!description || !category || !dateTime) {
      return res.status(400).send({ message: 'Please send description, category and date.' });
    }

    var newSprint = new Sprint({ description, category, sprintHead: req.user._id, dateTime });

    newSprint.save(function (err, savedSprint) {
      var sprint = savedSprint;
      User.findById(req.user._id).populate('ventures', 'name slug').exec(function (err, user) {
        sprint.sprintHead = user;
        Skill.findById(category).select('name').exec(function (err, skill) {
          sprint.category = skill;
          res.json({ sprint: sprint });
        });
      });
    });
  },

  updateSprint: function (req, res) {
    var sprintId = req.body.sprintId;
    var description = req.body.description;
    var category = req.body.category;
    var dateTime = req.body.dateTime;

    if (!description || !category || !dateTime) {
      return res.status(400).send({ message: 'Please send description, category and date.' });
    }

    Sprint.findById(sprintId).exec(function (err, sprint) {
      if (sprint.sprintHead.toString() !== req.user._id.toString()) {
        return res.status(403).send({ message: 'Unauthorized!' });
      }

      sprint.description = description;
      sprint.category = category;
      sprint.dateTime = dateTime;

      sprint.save(function (err, saved) {
        sprint.populate('category', function (err, populatedSprint) {
          res.send({ sprint: populatedSprint });
        });
      });
    });

  },

  toggleAttendance: function(req, res) {
    var sprintId = req.body.sprintId;
    var userId = req.user._id;

    Sprint.findById(sprintId).exec(function (err, sprint) {
      if(sprint.participants.indexOf(userId) == -1) {
        sprint.participants.push(userId);
      } else {
        sprint.participants.splice(sprint.participants.indexOf(userId), 1);
      }

      sprint.save(function (err, saved) {
        res.send({ user: req.user })
      });
    });
  },

  deleteSprint: function(req, res) {
    var sprintId = req.body.sprintId;

    Sprint.findById(sprintId).exec(function(err, sprint) {
      if (sprint.sprintHead.toString() != req.user._id.toString()) {
        return res.status(403).send({ message: 'Unauthorized!' });
      }

      sprint.remove(function (err, removed) {
        return res.send({ message: 'Deleted!'});
      });
    });
  },

};
