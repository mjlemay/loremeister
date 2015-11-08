// app/models/story.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var StorySchema   = new Schema({
    title: String,
    slug: String,
    summary: String,
    body: String,
    published_at: Date,
    is_published: Boolean,
    creator: String
    },
    {timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    connectedCharacters: [],
    connectedTribes: []
});


module.exports = mongoose.model('Story', StorySchema);
