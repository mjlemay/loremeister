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
    creator_id: String,
    connectedStories: [],
    connectedTribes: []
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
});

module.exports = mongoose.model('Character', CharacterSchema);
