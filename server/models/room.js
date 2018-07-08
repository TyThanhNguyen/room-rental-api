const mongoose = require('mongoose');

var RoomSchema = new mongoose.Schema({
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
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    roomType: {
        type: String,
        required: true, 
        trim: true
    },
    roomDetails: {
        type: [String],
        required: true,
        trim: true
    },
    moveInDate: {
        type: Date,
        required: true,
        trim: true
    },
    moveOutDate: {
        type: Date,
        required: false,
        trim: true
    },
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

let Room = mongoose.model('Room', RoomSchema);
module.exports = { Room };