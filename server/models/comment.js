const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
let SchemaTypes = mongoose.Schema.Types;

let CommentSchema = new mongoose.Schema({
    placeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place'
    },
    contents: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        title: {
            type: String
        },
        rank: {
            type: SchemaTypes.Double
        },
        message: {
            type: String,
            trim: true
        }
    }],
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

let Comment = mongoose.model('Comment', CommentSchema);
module.exports = { Comment };