//charactersRouter.js
var express = require('express');
var router = express.Router();
var Character = require('../models/character');

router.route('/')
    // create character (accessed at POST http://localhost:3000/api/characters)
    .post(function(req, res) {
        if (req.user) {
          var character = new Character();      // create a new instance of the Character model
          character.name = req.body.name.replace(/"/g, '\\\\\"');
          character.slug = encodeURI(req.body.name.replace(/\s/g, '_'));
    	    character.origin = req.body.origin.replace(/"/g, '\\\\\"');
    	    character.background = req.body.background.replace(/"/g, '\\\\\"');
    	    character.strength = req.body.strength.replace(/"/g, '\\\\\"');
    	    character.weakness = req.body.weakness.replace(/"/g, '\\\\\"');
    	    character.goals = req.body.goals.replace(/"/g, '\\\\\"');
    	    character.likes = req.body.likes.replace(/"/g, '\\\\\"');
    	    character.dislikes = req.body.dislikes.replace(/"/g, '\\\\\"');
    	    character.inspirations = req.body.inspirations.replace(/"/g, '\\\\\"');
    	    character.girth = req.body.girth.replace(/"/g, '\\\\\"');
          character.creator_id = req.user._id;

          // save and check for errors
          Character.findOne({slug: character.slug}, function(err, existingCharacter) {
            if (existingCharacter && existingCharacter.slug == character.slug) {
              res.jsonp({ message: 'Error: Character slug already exists!' });
            } else {
              character.save(function(err) {
                if (err) {
                  res.send(err);
                }
                res.jsonp({ message: 'Character created!' });
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
          res.jsonp(characters);
        });
    })
module.exports = router;