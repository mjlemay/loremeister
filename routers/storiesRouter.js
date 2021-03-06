//storyRouter.js
var express = require('express');
var router = express.Router();
var Story = require('../models/story');

router.route('/')
   .post(function(req, res) {
      if (req.user) {
        // logged in
        var story = new Story();// create a new instance of the Story model
        story.title = req.body.title;
        story.slug = encodeURI(req.body.title.replace(/\s/g, '_'));
        story.summary = req.body.summary;
        story.body = req.body.body;
        story.published_at = req.body.publish_date;
        story.is_published = req.body.is_published;
        story.author = req.body.author;
        story.creator_id = req.user._id;

        // save and check for errors
        Story.findOne({slug: story.slug}, function(err, existingStory) {
          if (existingStory && existingStory.slug == story.slug) {
            res.jsonp({ message: 'Error: Story slug already exists!' });
          } else {
            story.save(function(err) {
                if (err) {
                  res.jsonp({ message: err});
                }
                res.jsonp({ message: 'Story created!' });
            });
          }
        });
      } else {
        res.redirect('/error/loginFailure');
      }
    }) 
    .get(function(req, res) {

        Story.find(function(err, stories) {
          if (err) {
            res.send(err);
          }
          res.jsonp(stories);
        });

    });

module.exports = router;