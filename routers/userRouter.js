//userRoutes.js
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var flash = require('connect-flash');

router.post('/signup', passport.authenticate('local-signup', {
    	successRedirect : '/user/profile', // redirect to the secure profile section
    	failureRedirect : '/error/loginFailure',
    	failureFlash : true // allow flash messages
	})
);

router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/user/profile',
    failureRedirect : '/user/profile',
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


router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
});

router.get('/profile', function (req, res) {
  if(typeof req.user == 'undefined') {
    res.redirect('/error/loginFailure');
  } else {
    res.json(req.user);
  }
});


module.exports = router;