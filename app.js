var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Character = require('./models/character');
var app = express();
var router = express.Router();

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('WE HAVE MONGO CONNECTION YO!');
});

router.use('/', function (req, res, next) {
	next();
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/', router);
app.use('/api', router);
app.use('/api/stories', router);
app.use('/api/story/:id', router);
app.use('/api/characters', router);
app.use('/api/character/:id', router);


router.get('/', function (req, res) {
	res.json({ message: 'LoreMiester API - Use /api to get a list of URIs'});  
});

router.get('/api', function (req, res) {
	res.json({ message: 'TODO: LIST OF APIS'});  
});

router.get('/api/stories', function (req, res) {
	res.send('<h1>LoreMiester API</h1><p><ul>TODO: REPLACE WITH JSON OBJECT</p>');
});

router.get('/api/story/:id', function (req, res) {
  res.send('<h1>LoreMiester API</h1><p><ul>TODO: REPLACE WITH JSON OBJECT</p>');
});

router.route('/api/characters')
    // create character (accessed at POST http://localhost:3000/api/characters)
    .post(function(req, res) {
        
        var character = new Character();      // create a new instance of the Character model
        console.log('req',req);
        character.name = req.body.name;
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

     // get all the characters (accessed at GET http://localhost:3000/api/characters)
    .get(function(req, res) {
        Character.find(function(err, characters) {
            if (err)
                res.send(err);

            res.json(characters);
        });
    });

router.get('/api/character/:id', function (req, res) {
  res.send('<h1>LoreMiester API</h1><p><ul>TODO: REPLACE WITH JSON OBJECT</p>');
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
});
