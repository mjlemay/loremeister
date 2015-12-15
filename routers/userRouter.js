//userRoutes.js
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var flash = require('connect-flash');

router.post('/signup', passport.authenticate('local-signup', {
    	successRedirect : '/error/signupGood', // redirect to the secure profile section
    	failureRedirect : '/error/loginFailure',
    	failureFlash : true // allow flash messages
	})
);

router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/user/profile',
    failureRedirect : '/error/loginFailure',
    failureFlash : true
}));


router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/user/profile',
        failureRedirect: '/user/profile'
}));

router.get('/auth/google', passport.authenticate('google', { scope: ['email'] }));

// handle the callback after facebook has authenticated the user
router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/user/profile',
        failureRedirect: '/user/profile'
}));


router.route('/admin/:user_id').put(function(req, res) {
      User.findById(req.params.user_id,  function(err, foundUser) {
         if (req.user &&
            (req.user.is_admin === true)) {
            foundUser.is_admin = true;
            foundUser.save(function(err) {
              if (err) {
                res.send(err);
              }
              res.jsonp({ message: 'User updated to Admin.' });
            });
          } else {
            res.jsonp({
              message: 'Cannot modify user.'
            });
          }
      });
  }).delete(function(req, res) {
    User.findById(req.params.user_id,  function(err, foundUser) {
         if (req.user &&
            (req.user.is_admin === true)) {
            foundUser.is_admin = false;
            foundUser.save(function(err) {
              if (err) {
                res.send(err);
              }
              res.jsonp({ message: 'User removed from Admin.' });
            });
          } else {
            res.jsonp({
              message: 'Cannot modify user.'
            });
          }
      });
  });

router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
});

router.get('/profile', function (req, res) {
  console.log('###### /profile ######');
  //console.log(req);
  if(typeof req.user == 'undefined') {
    res.redirect('/error/loginFailure');
  } else {
    res.jsonp(req.user);
  }
});


module.exports = router;