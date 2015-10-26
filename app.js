var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('<h1>LoreMiester API</h1><p>Please use /api to acess a list of URIs.</p>');
});

app.get('/api', function (req, res) {
  res.send('<h1>LoreMiester API</h1><p><ul><li><strong>/api/stories/*</strong> - displays a paginated list of stories.</li><li><strong>/api/characters/*</strong> - displays a paginated list of characters.</li></ul></p>');
});

app.get('/api/stories', function (req, res) {
  res.send('<h1>LoreMiester API</h1><p><ul>TODO: REPLACE WITH JSON OBJECT</p>');
});

app.get('/api/story/:id', function (req, res) {
  res.send('<h1>LoreMiester API</h1><p><ul>TODO: REPLACE WITH JSON OBJECT</p>');
});

app.get('/api/characters', function (req, res) {
  res.send('<h1>LoreMiester API</h1><p><ul>TODO: REPLACE WITH JSON OBJECT</p>');
});

app.get('/api/character/:id', function (req, res) {
  res.send('<h1>LoreMiester API</h1><p><ul>TODO: REPLACE WITH JSON OBJECT</p>');
});

app.use(function(err, req, res) {
  res.status(500).send('<h1>ERROR: 500</h1><p>Something went horribly wrong!!');
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
});
