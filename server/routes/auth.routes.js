var router = require('express').Router();
var passport = require('passport');
var User = require('../models/user');

module.exports = function(){
  router.route('/logout').get(function(req, res) {
    req.session.destroy(function (err) {
      return res.redirect('/');
    });
  });

  router.route('/slack').get(passport.authenticate('slack'));

  router.route('/slack/callback').get(function(req, res, next){
    passport.authenticate('slack', function(err, user){
      if (req.user && !req.user.onboardingDone) {
        return res.redirect('/onboarding');
      } else {
        return res.redirect('/');
      }
    })(req, res, next);
  });

  // passport.use('local', new LocalStrategy({
  //     usernameField : 'email',
  //         passwordField : 'password',
  //         passReqToCallback : true 
  //   },
  //     function(req, email, password, done) {

  //       User.findOne({ email: email }).exec(function (err, user) {

  //         if (err) { return done(err, null); }

  //           if (!user) {
  //             return done(null, null, { message: 'Incorrect email.' });
  //           }

  //           // test a matching password
  //         user.comparePassword(password, function(err, isMatch) {
  //             if (isMatch && !err) {
  //               req.login(user, function(){
  //                     return done(null, user);
  //                 });
  //             } else {
  //               return done(null, null, { message: 'Incorrect Password.' });
  //             }
  //         });


  //           // if (user.password !== password) {
  //           //   return done(null, false, { message: 'Incorrect password.' });
  //           // }

  //           //manually login the user
  //       });
  //     }
  // ));

  return router;
}