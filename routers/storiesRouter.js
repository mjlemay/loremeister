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
        story.slug = encodeURI(req.body.title.split(' ').join('_'));
        story.summary = req.body.summary;
        story.body = req.body.body;
        story.published_at = req.body.publish_date;
        story.is_published = req.body.is_published;
        story.author = req.body.author;
        story.creator = req.body.creator;

        // save the bear and check for errors
        story.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Story created!' });
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
          res.json(stories);
        });

    });

module.exports = router;