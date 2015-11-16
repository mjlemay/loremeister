//tribessRouter.js
var express = require('express');
var router = express.Router();
var Tribe = require('../models/tribe');

router.route('/')
    // create tribe
    .post(function(req, res) {
        if (req.user) {
          var tribe = new Tribe(); 
          tribe.name = req.body.name;
          tribe.slug = encodeURI(req.body.name.split(' ').join('_'));
    	    tribe.origin = req.body.origin;
    	    tribe.background = req.body.background;
    	    tribe.allies = req.body.allies;
    	    tribe.enemies = req.body.allies;
    	    tribe.inspirations = req.body.inspirations;
    	    tribe.girth = req.body.girth;
          tribe.leaders = req.body.leaders;
          tribe.creator_id = req.user._id;

          // save and check for errors
          Tribe.findOne({slug: tribe.slug}, function(err, existingTribe) {
            if (existingTribe && existingTribe.slug == tribe.slug) {
              res.jsonp({ message: 'Error: Tribe slug already exists!' });
            } else {
              tribe.save(function(err) {
                  if (err) {
                      res.send(err);
                  }
                  res.jsonp({ message: 'Tribe created!' });
              });
            }
          });
        } else {
          res.redirect('/error/loginFailure');
        }
    })
    .get(function(req, res) {
        Tribe.find(function(err, tribes) {
          if (err) {
            res.send(err);
          }
          res.jsonp(tribes);
        });
    })
module.exports = router;