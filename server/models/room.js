const mongoose = require('mongoose');

var RoomSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    imagePath: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    // moveInDate: {
    //     type: Date
    // },
    // moveOutDate: {
    //     type: Date
    // }
});

let Room = mongoose.model('Room', RoomSchema);

module.exports = {Room};