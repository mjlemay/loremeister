// app/models/tribe.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TribeSchema   = new Schema({
    name: String,
    slug: {type: String, unique: true},
    origin: String,
    background: String,
    allies: String,
    enemies: String,
    inspirations: String,
    girth: String,
    creator_id: String,
    leaders: [],
    connectedStories: [],
    connectedCharacters: []
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
});

module.exports = mongoose.model('Tribe', TribeSchema);
