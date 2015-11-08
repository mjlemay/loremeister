var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

var _ = require('lodash');
var app = express();
var router = express.Router();
var configDB = require('./config/db.js');

/* Schemas listed Below */
var Character = require('./models/character')(router);

/* Routes Listed Here */
var storiesRouter = require('./routers/storiesRouter');
var storyRouter = require('./routers/storyRouter');
var charactersRouter = require('./routers/charactersRouter');
var characterRouter = require('./routers/characterRouter');

/* Loads a Mongo DB */
mongoose.connect(configDB.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error.'));
db.once('open', function (callback) {
  console.log('WE HAVE MONGO CONNECTION YO!');
});


require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

// required for passport
app.use(session({ secret: 'ilovepineguinsyoushouldtoo' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


/* Begins routing! */
router.use('/', function (req, res, next) {
	next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use('/', router);
app.use('/login', router);
app.use('/api', router);
app.use('/api/stories', storiesRouter);
app.use('/api/story', storyRouter);
app.use('/api/characters', charactersRouter);
app.use('/api/character', characterRouter);
app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/error/loginFailure',
    failureFlash : true // allow flash messages
}));
app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile',
    failureRedirect : '/profile',
    failureFlash : true
}));

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// handle the callback after facebook has authenticated the user
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/profile'
    }));

router.get('/', function (req, res) {
	res.json({ message: 'LoreMiester API - Use /api to get a list of URIs'});  
});

router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
});

router.get('/api', function (req, res) {
	res.json({ message: 'TODO: LIST OF APIS'});  
});

router.get('/profile', function (req, res) {
  if(typeof req.user == 'undefined') {
    res.redirect('/error/loginFailure');
  } else {
    res.json(req.user);
  }
});

router.get('/error/loginFailure', function (req, res) {
  res.json({ error: 'Failed to Login'});
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
});
