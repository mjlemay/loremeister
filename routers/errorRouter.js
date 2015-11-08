//errorRouter.js
var express = require('express');
var router = express.Router();

router.get('/loginFailure', function (req, res) {
  res.json({ error: 'Failed to Login'});
});

module.exports = router;