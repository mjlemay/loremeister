//storyRouter.js
var express = require('express');
var router = express.Router();
var Story = require('../models/story');
var _ = require('lodash');


router.route('/:story_slug')
  .get(function(req, res) {
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
              message: 'Cannot modify tribe.'
            });
          }
      });
  })
  .delete(function(req, res) {
      if (req.user) {
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
        res.json({ error: 'Failed to Login'});
      }
  });

module.exports = router;