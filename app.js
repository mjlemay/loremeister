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
app.use('/api/characters', router);
app.use('/api/character/:character_slug', router);
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


router.route('/api/characters')
    // create character (accessed at POST http://localhost:3000/api/characters)
    .post(function(req, res) {
        if (req.user) {
          var character = new Character();      // create a new instance of the Character model
          character.name = req.body.name;
          character.slug = encodeURI(req.body.name.split(' ').join('_'));
    	    character.origin = req.body.origin;
    	    character.background = req.body.background;
    	    character.strength = req.body.strength;
    	    character.weakness = req.body.weakness;
    	    character.goals = req.body.goals;
    	    character.likes = req.body.likes;
    	    character.dislikes = req.body.dislikes;
    	    character.inspirations = req.body.inspirations;
    	    character.girth = req.body.girth;

          // save the bear and check for errors
          character.save(function(err) {
              if (err)
                  res.send(err);
              res.json({ message: 'Character created!' });
          });
        } else {
          res.redirect('/error/loginFailure');
        }
    })
    .get(function(req, res) {
        Character.find(function(err, characters) {
          if (err) {
            res.send(err);
          }
          res.json(characters);
        });
    })


router.route('/api/character/:character_slug')
  .get(function(req, res) {
    console.log(req.params.character_slug);
      Character.findOne({slug: req.params.character_slug}, function(err, character) {
          if (err) {
            res.json(err);
          }
          res.json(character);
      });
  })
  .put(function(req, res) {
      Character.findOne({slug: req.params.character_slug}, function(err, character) {
          if (err) {
            res.json(err);
          }
          _.forOwn(req.body, function(value, key) {
            character[key] = value;
          });
          character.save(function(err) {
            if (err) {
              res.send(err);
            }
            res.json({ message: 'Character updated.' });
          });
      });
  })
  .delete(function(req, res) {
      if (req.user) {
        Character.remove({slug: req.params.character_slug}, function(err, character) {
            if (err) {
              res.send(err);
            } else {
              res.json({
                message: 'Character deleted.'
              });
            }
        });
      } else {
        res.json({ error: 'Failed to Login'});
      }
  });



/*
router.get('/api/character/:id', function (req, res) {
  res.send('<h1>LoreMiester API</h1><p><ul>TODO: REPLACE WITH JSON OBJECT</p>');
});
*/

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
});
