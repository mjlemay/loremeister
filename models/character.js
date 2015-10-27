// app/models/character.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CharacterSchema   = new Schema({
    name: String,
    origin: String,
    background: String,
    strength: String,
    weakness: String,
    goals: String,
    likes: String,
    dislikes: String,
    inspirations: String,
    girth: String
});

module.exports = mongoose.model('Character', CharacterSchema);
