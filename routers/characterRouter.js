//characterRouter.js
var express = require('express');
var router = express.Router();
var Character = require('../models/character');

router.route('/:character_slug')
  .get(function(req, res) {
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

module.exports = router;
