//appRouter.js
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	res.json({ message: 'LoreMiester API - Use /api to get a list of URIs'});  
});

router.get('/:api', function (req, res) {
	res.json({ message: 'TODO: LIST OF APIS'});  
});

module.exports = router;