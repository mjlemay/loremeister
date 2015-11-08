//storyRouter.js
var express = require('express');
var router = express.Router();
var Story = require('../models/story');


router.route('/:story_slug')
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
          if (req.user) {
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
            res.redirect('/error/loginFailure');
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