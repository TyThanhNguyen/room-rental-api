const mongoose = require('mongoose');

var RoomSchema = new mongoose.Schema({
    belongToPlace: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
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