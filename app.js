var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var _ = require('lodash');
var app = express();
var router = express.Router();

/* Schemas listed Below */
var Character = require('./models/character');
var Story = require('./models/story');

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('WE HAVE MONGO CONNECTION YO!');
});

router.use('/', function (req, res, next) {
	next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use('/', router);
app.use('/api', router);
app.use('/api/stories', router);
app.use('/api/story/:story_slug', router);
app.use('/api/characters', router);
app.use('/api/character/:character_slug', router);


router.get('/', function (req, res) {
	res.json({ message: 'LoreMiester API - Use /api to get a list of URIs'});  
});

router.get('/api', function (req, res) {
	res.json({ message: 'TODO: LIST OF APIS'});  
});


router.route('/api/stories')
    .post(function(req, res) {
        var story = new Story();// create a new instance of the Story model
        story.title = req.body.title;
        story.slug = encodeURI(req.body.title.split(' ').join('_'));
        story.summary = req.body.summary;
        story.body = req.body.body;
        story.published_at = req.body.publish_date;
        story.is_published = req.body.is_published;
        story.author = req.body.author;
        story.creator = req.body.creator;

        // save the bear and check for errors
        story.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Story created!' });
        });
    })
    .get(function(req, res) {
        Story.find(function(err, stories) {
          if (err) {
            res.send(err);
          }
          res.json(stories);
        });
    })


router.route('/api/story/:story_slug')
  .get(function(req, res) {
    console.log(req.params.story_slug);
      Story.findOne({slug: req.params.story_slug}, function(err, story) {
          if (err) {
            res.json(err);
          }
          res.json(story);
      });
  })
  .put(function(req, res) {
      Story.findOne({slug: req.params.story_slug}, function(err, story) {
          if (err) {
            res.json(err);
          }
          _.forOwn(req.body, function(value, key) {
            story[key] = value;
          });
          story.save(function(err) {
            if (err) {
              res.send(err);
            }
            res.json({ message: 'Story updated.' });
          });
      });
  })
  .delete(function(req, res) {
      Story.remove({slug: req.params.story_slug}, function(err, story) {
          if (err) {
            res.send(err);
          } else {
            res.json({
              message: 'Story deleted.'
            });
          }
      });
  });

router.route('/api/characters')
    // create character (accessed at POST http://localhost:3000/api/characters)
    .post(function(req, res) {
        
        var character = new Character();      // create a new instance of the Character model
        console.log('req',req);
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
      Character.remove({slug: req.params.character_slug}, function(err, character) {
          if (err) {
            res.send(err);
          } else {
            res.json({
              message: 'Character deleted.'
            });
          }
      });
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
