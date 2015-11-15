//characterRouter.js
var express = require('express');
var router = express.Router();
var Story = require('../models/story');
var Character = require('../models/character');
var Tribe = require('../models/tribe');
var _ = require('lodash');

router.route('/:tribe_slug')
  .get(function(req, res) {
      Tribe.findOne({slug: req.params.tribe_slug}, function(err, tribe) {
          if (err || tribe  === null) {
            res.json(err);
          }
          res.json(tribe);
      });
  })
  .put(function(req, res) {
      Tribe.findOne({slug: req.params.tribe_slug}, function(err, tribe) {
          if (err || tribe  === null) {
            res.json(err);
          }
          if (req.user &&
            (req.user.is_admin === true ||
              req.user._id === tribe.creator_id)) {
            _.forOwn(req.body, function(value, key) {
              tribe[key] = value;
            });
            tribe.save(function(err) {
              if (err) {
                res.send(err);
              }
              res.json({ message: 'Tribe updated.' });
            });
          } else {
            res.json({
              message: 'Cannot modify tribe.'
            });
          }
      });
  })
  .delete(function(req, res) {
      if (req.user) {
        Tribe.findOne({slug: req.params.tribe_slug}, function(err, tribe) {
          if (err || tribe  === null) {
            res.json(err);
          } else {
            if (req.user.is_admin === true ||
              req.user._id.toString() === tribe.creator_id) {
              Tribe.remove({slug: req.params.tribe_slug}, function(err, tribe) {
                if (err) {
                  res.send(err);
                } else {

                  res.json({
                    message: 'Tribe deleted.'
                  });
                }
              });
            } else {
              res.json({
                message: 'Cannot delete tribe.'
              });
            }
          }
        });
      } else {
        res.json({ error: 'Failed to Login.'});
      }
  });


router.route('/connect/:tribe_slug/story/:story_slug')
  .put(function(req, res) {
      Tribe.findOne({slug: req.params.tribe_slug}, function(err, tribe) {
          if (err || tribe  === null) {
            res.json(err);
          }
          if (req.user &&
            (req.user.is_admin === true ||
              req.user._id === tribe.creator_id)) {
             Story.findOne({slug: req.params.story_slug}, function(err, story) {
                if (err) {
                  res.json(err);
                }  
                  if (_.indexOf(tribe.connectedStories, req.params.story_slug) === -1){
                    tribe.connectedStories.push(req.params.story_slug);
                  }
                  tribe.save(function(err) {
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
      Tribe.findOne({slug: req.params.character_slug}, function(err, tribe) {
          if (err || tribe  === null) {
            res.json(err);
          }
          if (req.user &&
            (req.user.is_admin === true ||
              req.user._id === tribe.creator_id)) {
              tribe.connectedStories = _.without(tribe.connectedStories, req.params.story_slug);
              tribe.save(function(err) {
                if (err) {
                  res.send(err);
                }
                res.json({ message: 'Tribe connection removed.' });
              });
          } else {
            res.json({
              message: 'Cannot modify tribe.'
            });
          }
      });
  });


router.route('/connect/:tribe_slug/character/:character_slug')
  .put(function(req, res) {
      Tribe.findOne({slug: req.params.tribe_slug}, function(err, tribe) {
          if (err || tribe  === null) {
            res.json(err);
          }
          if (req.user &&
            (req.user.is_admin === true ||
              req.user._id === tribe.creator_id)) {
             Character.findOne({slug: req.params.character_slug}, function(err, character) {
                if (err || character  === null) {
                  res.json(err);
                }  
                  if (_.indexOf(tribe.connectedCharacters, req.params.character_slug) === -1){
                    tribe.connectedCharacters.push(req.params.character_slug);
                  }
                  tribe.save(function(err) {
                    if (err) {
                      res.send(err);
                    }
                    res.json({ message: 'Tribe connection updated.' });
                  });
            });
          } else {
            res.json({
              message: 'Cannot modify tribe.'
            });
          }
      });
  })
  .delete(function(req, res) {
      Tribe.findOne({slug: req.params.tribe_slug}, function(err, tribe) {
          if (err || tribe  === null) {
            res.json(err);
          }
          if (req.user &&
            (req.user.is_admin === true ||
              req.user._id === tribe.creator_id)) {
              tribe.connectedCharacters = _.without(tribe.connectedCharacters, req.params.character_slug);
              tribe.save(function(err) {
                if (err) {
                  res.send(err);
                }
                res.json({ message: 'Tribe connection removed.' });
              });
          } else {
            res.json({
              message: 'Cannot modify tribe.'
            });
          }
      });
  });


module.exports = router;
