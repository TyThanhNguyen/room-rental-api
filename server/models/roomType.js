const mongoose = require('mongoose');

let RoomTypeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

let RoomType = mongoose.model('RoomType', RoomTypeSchem);
module.exports = {RoomType};