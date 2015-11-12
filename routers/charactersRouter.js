//charactersRouter.js
var express = require('express');
var router = express.Router();
var Character = require('../models/character');

router.route('/')
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
          character.creator_id = req.user._id;

          // save and check for errors
          Character.findOne({slug: character.slug}, function(err, existingCharacter) {
            if (existingCharacter && existingCharacter.slug == character.slug) {
              res.json({ message: 'Error: Character slug already exists!' });
            } else {
              character.save(function(err) {
                if (err) {
                  res.send(err);
                }
                res.json({ message: 'Character created!' });
              });
            }
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
module.exports = router;