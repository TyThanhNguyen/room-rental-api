const mongoose = require('mongoose');

var RoomSchema = new mongoose.Schema({
    imagePath: {
        type: String,
        required: true
    },
    videoPath: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        default: ''
    },
    price: {
        type: Number,
        required: true,
        default: 0.00
    },
    moveInDate: {
        type: Date
    },
    moveOutDate: {
        type: Date
    },
    facilities: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true
    },
    billIncluded: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true
    },
    securityAndSafety: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false
    },
    propertyRule: {
        type: [mongoose.Schema.Types.ObjectId],
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