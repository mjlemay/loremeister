// config/passport.js

var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/user');
var appEnvironment = process.env.NODE_ENV;
var configAuth;
if (appEnvironment === 'development' || typeof appEnvironment === 'undefined') {
    try {
        configAuth = require('../config/localhost/auth');
    } catch (e) {
        configAuth = require('../config/auth');
    }
} else {
    configAuth = require('../config/auth');
}

module.exports = function(passport) {
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    /* Generic user login Strat */
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'logins.local.email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
                // if there is no user with that email
                // create the user
                var newUser = new User();
                newUser.logins.local.email = email;
                newUser.logins.local.password = newUser.generateHash(password);
                
                User.count(function(err, c) {
                    console.log('number of users is:' +c);
                    if (c <= 0) {
                        newUser.is_admin = true;
                    };
                }).exec(function() {
                    //save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                });
            }

        });    

        });

    }));
  	passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
        console.log(req + ', ' + email + ', ' +password);
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'logins.local.email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            console.log(user);

            if (err) {
                console.log(err);
                return done(err);
            }
            // if no user is found, return the message
            if (!user) {
                console.log('NO USER!');
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            }
            // if the user is found but the password is wrong
            if (!user.validPassword(password)) {
                console.log('NO PASSWORD');
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            }
            // all is well, return successful user
            console.log('ITS ALL GOOD YO!');
            return done(null, user);
        });

    }));

	/* Facebook OAuth Strat */
	passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        profileFields	: ['id','displayName','email', 'name'],
        proxy: true
    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {
    	var fbEmail = '';
    	if (typeof profile.emails !== 'undefined' && profile.emails[0].value)  {
    		fbEmail = profile.emails[0].value;
    	}
        // asynchronous
        process.nextTick(function() {

            // find the user in the database based on their facebook id
            User.findOne({ 
					$or: [
			            {'logins.facebook.id': profile.id},
			            {'logins.local.email': fbEmail}
					]
				}, function(err, user) {
				var fbUser = {};
                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err) {
                    return done(err);
                }
                // if the user is found with fb data, then log them in
                if (user) {
                	if (typeof user.logins.facebook !== 'undefined'
                		&& typeof user.logins.facebook.id !== 'undefined') {
                    	return done(null, user); // user found, return that user
                	} else {
                		fbUser = user;
                	}
                } else {
                	fbUser = new User();
                	fbUser.logins.local.email = fbEmail;
                }
                // set all of the facebook information in our user model
                fbUser.logins.facebook.id    = profile.id; // set the users facebook id                   
                fbUser.logins.facebook.token = token; // we will save the token that facebook provides to the user                    
                fbUser.logins.facebook.name  = profile.displayName; // look at the passport user profile to see how names are returned
                fbUser.logins.facebook.email = fbEmail; // facebook can return multiple emails so we'll take the first // facebook can return multiple emails so we'll take the first

                if (typeof profile.name.givenName !== undefined) {
                	fbUser.firstName = profile.name.givenName
                }
                if (typeof profile.name.familyName !== undefined) {
                	fbUser.lastName = profile.name.familyName
                }

                // save our user to the database
                fbUser.save(function(err) {
                    if (err)
                        throw err;

                    // if successful, return the new user
                    return done(null, fbUser);
                });
            });
        });
    }));

    /* Google OAuth Strat */
    passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
        proxy: true
    },
    function(token, refreshToken, profile, done) {
        var gmail = '';
        if (typeof profile.emails !== 'undefined' && profile.emails[0].value)  {
            gmail = profile.emails[0].value;
        }
        process.nextTick(function() {
            // try to find the user based on their google id
            User.findOne({
                $or: [
                        {'logins.google.id': profile.id},
                        {'logins.local.email': gmail}
                ]
            }, function(err, user) {
               var gUser = {};
               if (err) {
                    return done(err);
                }
                if (user) {
                    if (typeof user.logins.google !== 'undefined'
                        && typeof user.logins.google.id !== 'undefined') {
                        return done(null, user); // user found, return that user
                    } else {
                        gUser = user;
                    }
                } else {
                    gUser = new User();
                    gUser.logins.local.email = gmail;
                }
                // set all of the facebook information in our user model
                gUser.logins.google.id    = profile.id; // set the users facebook id                   
                gUser.logins.google.token = token; // we will save the token that facebook provides to the user                    
                gUser.logins.google.name  = profile.displayName; // look at the passport user profile to see how names are returned
                gUser.logins.google.email = gmail; // facebook can return multiple emails so we'll take the first // facebook can return multiple emails so we'll take the first

                if (typeof profile.name.givenName !== undefined) {
                    gUser.firstName = profile.name.givenName
                }
                if (typeof profile.name.familyName !== undefined) {
                    gUser.lastName = profile.name.familyName
                }

                // save our user to the database
                gUser.save(function(err) {
                    if (err) {
                        throw err;
                    }

                    // if successful, return the new user
                    return done(null, gUser);
                });
            });
        });

    }));
};