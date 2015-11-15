//characterRouter.js
var express = require('express');
var router = express.Router();
var Story = require('../models/story');
var Character = require('../models/character');
var Tribe = require('../models/tribe');
var _ = require('lodash');

router.route('/:character_slug')
  .get(function(req, res) {
      Character.findOne({slug: req.params.character_slug}, function(err, character) {
          if (err || character == null) {
            res.json(err);
          }
          res.json(character);
      });
  })
  .put(function(req, res) {
      Character.findOne({slug: req.params.character_slug}, function(err, character) {
          if (err || character === null) {
            res.json(err);
          }
          if (req.user &&
            (req.user.is_admin === true ||
              req.user._id === character.creator_id)) {
            _.forOwn(req.body, function(value, key) {
              character[key] = value;
            });
            character.save(function(err) {
              if (err) {
                res.send(err);
              }
              res.json({ message: 'Character updated.' });
            });
          } else {
            res.json({
              message: 'Cannot modify character.'
            });
          }
      });
  })
  .delete(function(req, res) {
            if (req.user) {
        Character.findOne({slug: req.params.character_slug}, function(err, character) {
          if (err || character === null) {
            res.json(err);
          } else {
            if (req.user.is_admin === true ||
              req.user._id.toString() === character.creator_id) {
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
              res.json({
                message: 'Cannot delete story.'
              });
            }
          }
        });
      } else {
        res.json({ error: 'Failed to Login.'});
      }
  });

router.route('/connect/:character_slug/tribe/:tribe_slug')
  .put(function(req, res) {
      Character.findOne({slug: req.params.character_slug}, function(err, character) {
          if (err || character === null) {
            res.json(err);
          }
          console.log('character found to edit');
          if (req.user &&
            (req.user.is_admin === true ||
              req.user._id === character.creator_id)) {
             Tribe.findOne({slug: req.params.tribe_slug}, function(err, tribe) {
                if (err) {
                  res.json(err);
                }  
                  if (_.indexOf(character.connectedTribes, req.params.tribe_slug) === -1){
                    character.connectedTribes.push(req.params.tribe_slug);
                  }
                  character.save(function(err) {
                    if (err) {
                      res.send(err);
                    }
                    res.json({ message: 'Story connection updated.' });
                  });
            });
          } else {
            res.json({
              message: 'Cannot modify story.'
            });
          }
      });
  })
  .delete(function(req, res) {
      Character.findOne({slug: req.params.character_slug}, function(err, character) {
          if (err || character === null) {
            res.json(err);
          }
          if (req.user &&
            (req.user.is_admin === true ||
              req.user._id === character.creator_id)) {
              character.connectedTribes = _.without(character.connectedTribes, req.params.tribe_slug);
              character.save(function(err) {
                if (err) {
                  res.send(err);
                }
                res.json({ message: 'Story connection removed.' });
              });
          } else {
            res.json({
              message: 'Cannot modify story.'
            });
          }
      });
  });

router.route('/connect/:character_slug/story/:story_slug')
  .put(function(req, res) {
      Character.findOne({slug: req.params.character_slug}, function(err, character) {
          if (err || character === null) {
            res.json(err);
          }
          if (req.user &&
            (req.user.is_admin === true ||
              req.user._id === character.creator_id)) {
             Story.findOne({slug: req.params.story_slug}, function(err, story) {
                if (err || character == null) {
                  res.json(err);
                }  
                  if (_.indexOf(character.connectedStories, req.params.story_slug) === -1){
                    character.connectedStories.push(req.params.story_slug);
                  }
                  character.save(function(err) {
                    if (err) {
                      res.send(err);
                    }
                    res.json({ message: 'Story connection updated.' });
                  });
            });
          } else {
            res.json({
              message: 'Cannot modify story.'
            });
          }
      });
  })
  .delete(function(req, res) {
      Character.findOne({slug: req.params.character_slug}, function(err, character) {
          if (err || character === null) {
            res.json(err);
          }
          if (req.user &&
            (req.user.is_admin === true ||
              req.user._id === character.creator_id)) {
              character.connectedStories = _.without(character.connectedStories, req.params.story_slug);
              character.save(function(err) {
                if (err) {
                  res.send(err);
                }
                res.json({ message: 'Story connection removed.' });
              });
          } else {
            res.json({
              message: 'Cannot modify story.'
            });
          }
      });
  });

module.exports = router;
