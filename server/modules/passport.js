/* eslint-disable */
var passport = require('passport');
var SlackStrategy = require('passport-slack').Strategy;
var User = require('../models/user');
var request = require('superagent');
var config = require('../config');

module.exports = function (passport) {

  passport.serializeUser(function(user, done) {
    done(null, user._id)
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id).select('-password -email').exec(function(err, user) {
      done(err, user);
    });
  });

  // passport.use('slack', new SlackStrategy({
  //   clientID: config.slack.clientID,
  //   clientSecret: config.slack.clientSecret,
  //   callbackURL: '/auth/slack/callback/',
  //   scope: 'identity.basic,identity.email,identity.team,identity.avatar',
  //   extendedUserProfile: false,
  //   passReqToCallback: true
  // }, function(req, token, tokenSecret, profile, done) {
  //   console.log(profile, 'uyyyyy')
  //   process.nextTick(function(){
  //     console.log(profile, 'in here')
  //     User.findOne({slackUserId: profile.id}).exec(function(err, user){
  //       if(user) {
  //         console.log(user, 'in here 2')
  //         req.login(user,function(){
  //           done(null,user);
  //         });
  //       } else {
  //         request
  //           .get('https://slack.com/api/users.identity?token='+token)
  //           .end(function(err, res){
  //             // Do something 
  //             console.log(user, profile, 'called');
  //             var user = res.body.user;
  //             var username = profile.displayName;
  //             var slackUserId = user.id;
  //             var name = user.name;
  //             var email = user.email;
  //             var image = user.image_512;
  //             var newUser = new User({ name, username, email, slackUserId, image });
  //             newUser.save(function(err, saved){
  //               if(!err) {
  //                 req.login(saved,function(){
  //                   done(null,saved);
  //                 });
  //               }
  //             });
  //         });
          
  //       }
  //     });
  //   });
  // }
  // ));

  passport.use(new SlackStrategy({
    clientID: config.slack.clientID,
    clientSecret: config.slack.clientSecret,
    callbackURL: '/auth/slack/callback/',
    scope: ['users:read'],       //'identity.basic','identity.email','identity.team','identity.avatar'
    team: 'T05060M5P',
    passReqToCallback: true,
  },
  function(req, token, tokenSecret, profile, done) {
    User.findOne({ slackUserId: profile.id }).exec(function(err, user){ 
      if(user) {
        req.login(user,function(){
          done(null,user);
        });
      } else {
        request
          .get('https://slack.com/api/users.info?token='+token+'&user='+profile.id)
          .end(function(err, res){
            if(err || res.status != 200) {
              // send a response back saying invalid check for team as well
            }
            
            var adminEmails = ['prashant.abhishek7g@gmail.com', 'freeman@jaaga.in', 'freemanindia@gmail.com', 'archana@jaaga.in', 'tej@jaaga.in'];

            var user = res.body.user;
            var username = user.name;
            var slackUserId = user.id;
            var name = user.real_name;
            var email = user.profile.email;
            var image = user.profile.image_512;
            var admin = false;

            if(adminEmails.indexOf(email) !== -1) {
              admin = true;
            }

            var newUser = new User({ name, username, email, slackUserId, image, admin });
            newUser.save(function(err, saved){
              if(!err) {
                req.login(saved,function(){
                  done(null,saved);
                });
              }
            });
        });
        
      }
    });
  }
));

}

