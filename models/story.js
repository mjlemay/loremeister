// app/models/story.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StorySchema = new Schema({
    title: String,
    slug: {type: String, index: true, unique: true, required: true},
    summary: String,
    body: String,
    published_at: Date,
    is_published: Boolean,
    creator_id: String,
    connectedCharacters: [],
    connectedTribes: []
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
});

module.exports = mongoose.model('Story', StorySchema);
