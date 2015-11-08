//characterRouter.js
var express = require('express');
var router = express.Router();
var Tribe = require('../models/tribe');
var _ = require('lodash');

router.route('/:tribe_slug')
  .get(function(req, res) {
      Tribe.findOne({slug: req.params.tribe_slug}, function(err, tribe) {
          if (err) {
            res.json(err);
          }
          res.json(tribe);
      });
  })
  .put(function(req, res) {
      console.log('PUTTING TRIBE IN ITS PLACE!');
      Tribe.findOne({slug: req.params.tribe_slug}, function(err, tribe) {
          if (err) {
            res.json(err);
          }
          console.log(req.user._id + ' = ' + tribe.creator_id);
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
        res.json({ error: 'Failed to Login'});
      }
  });

module.exports = router;
