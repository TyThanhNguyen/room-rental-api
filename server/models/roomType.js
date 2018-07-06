const mongoose = require('mongoose');

let RoomTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }
});

let RoomType = mongoose.model('RoomType', RoomTypeSchema);
module.exports = { RoomType };