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
    author: String,
    creator: String
    },
    {timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});


module.exports = mongoose.model('Story', StorySchema);
