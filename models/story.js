// app/models/story.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var StorySchema   = new Schema({
    title: String,
    slug: String,
    summary: String,
    body: String,
    publish_date: Date,
    creation_date: Date,
    is_published: Boolean,
    author: String,
    creator: String
});

module.exports = mongoose.model('Story', StorySchema);
