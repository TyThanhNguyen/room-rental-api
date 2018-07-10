const mongoose = require('mongoose');

var PlaceSchema = new mongoose.Schema({
    imagePaths: {
        type: [String],
        required: false,
        trim: true,
        default: []
    },
    videoPath: {
        type: String,
        required: false,
        trim: true,
        default: ''
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    room: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
    }],
    facilities: {
        type: [String],
        required: true
    },
    billIncluded: {
        type: [String],
        required: true
    },
    securityAndSafety: {
        type: [String],
        required: false
    },
    propertyRule: {
        type: [String],
        required: false
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

let Place = mongoose.model('Place', PlaceSchema);
module.exports = { Place };