const mongoose = require('mongoose');

let RoomTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

let RoomType = mongoose.model('RoomType', RoomTypeSchem);
module.exports = { RoomType };