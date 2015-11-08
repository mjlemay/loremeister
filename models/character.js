// app/models/character.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CharacterSchema   = new Schema({
    name: String,
    slug: String,
    origin: String,
    background: String,
    strength: String,
    weakness: String,
    goals: String,
    likes: String,
    dislikes: String,
    inspirations: String,
    girth: String,
    creator: String,
    connectedStories: [],
    connectedTribes: []
});

module.exports = mongoose.model('Character', CharacterSchema);
