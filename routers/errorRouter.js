//errorRouter.js
var express = require('express');
var router = express.Router();

router.get('/loginFailure', function (req, res) {
  res.jsonp({ error: 'Failed to Login'});
});

router.get('/signupGood', function (req, res) {
  res.jsonp({ success: 'Signup Successful!'});
});


module.exports = router;