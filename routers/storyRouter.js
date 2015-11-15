//storyRouter.js
var express = require('express');
var router = express.Router();
var Story = require('../models/story');
var Character = require('../models/character');
var Tribe = require('../models/tribe');
var _ = require('lodash');


router.route('/:story_slug')
  .get(function(req, res) {
      Story.findOne({slug: req.params.story_slug}, function(err, story) {
          if (err || story == null) {
            res.json(err);
          }
          res.json(story);
      });
  })
  .put(function(req, res) {
      Story.findOne({slug: req.params.story_slug}, function(err, story) {
          if (err || story == null) {
            res.json(err);
          }
          if (req.user &&
            (req.user.is_admin === true ||
              req.user._id === story.creator_id)) {
            _.forOwn(req.body, function(value, key) {
              story[key] = value;
            });
            story.save(function(err) {
              if (err) {
                res.send(err);
              }
              res.json({ message: 'Story updated.' });
            });
          } else {
            res.json({
              message: 'Cannot modify story.'
            });
          }
      });
  })
  .delete(function(req, res) {
      if (req.user) {
        Story.findOne({slug: req.params.story_slug}, function(err, story) {
          if (err || story == null) {
            res.json(err);
          } else {
            if (req.user.is_admin === true ||
              req.user._id.toString() === story.creator_id) {
              Story.remove({slug: req.params.story_slug}, function(err, story) {
                if (err) {
                  res.send(err);
                } else {

                  res.json({
                    message: 'Story deleted.'
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

router.route('/connect/:story_slug/character/:character_slug')
  .put(function(req, res) {
      Story.findOne({slug: req.params.story_slug}, function(err, story) {
          if (err || story == null) {
            res.json(err);
          }
          if (req.user &&
            (req.user.is_admin === true ||
              req.user._id === story.creator_id)) {
             Character.findOne({slug: req.params.character_slug}, function(err, character) {
                if (err) {
                  res.json(err);
                }  
                  if (_.indexOf(story.connectedCharacters, req.params.character_slug) === -1){
                    story.connectedCharacters.push(req.params.character_slug);
                  }
                  story.save(function(err) {
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
      Story.findOne({slug: req.params.story_slug}, function(err, story) {
          if (err || story == null) {
            res.json(err);
          }
          if (req.user &&
            (req.user.is_admin === true ||
              req.user._id === story.creator_id)) {
              story.connectedCharacters = _.without(story.connectedCharacters, req.params.character_slug);
              console.log(story.connectedCharacters);
              story.save(function(err) {
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

router.route('/connect/:story_slug/tribe/:tribe_slug')
  .put(function(req, res) {
      Story.findOne({slug: req.params.story_slug}, function(err, story) {
          if (err || story == null) {
            res.json(err);
          }
          if (req.user &&
            (req.user.is_admin === true ||
              req.user._id === story.creator_id)) {
             Tribe.findOne({slug: req.params.tribe_slug}, function(err, tribe) {
                if (err) {
                  res.json(err);
                }  
                  if (_.indexOf(story.connectedTribes, req.params.tribe_slug) === -1){
                    story.connectedTribes.push(req.params.tribe_slug);
                  }
                  story.save(function(err) {
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
      Story.findOne({slug: req.params.story_slug}, function(err, story) {
          if (err || story == null) {
            res.json(err);
          }
          if (req.user &&
            (req.user.is_admin === true ||
              req.user._id === story.creator_id)) {
              story.connectedTribes = _.without(story.connectedTribes, req.params.tribe_slug);
              story.save(function(err) {
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