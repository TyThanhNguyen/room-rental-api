const mongoose = require('mongoose');

let RoomDetailSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

let RoomDetail = mongoose.model('RoomDetail', RoomDetailSchema);
module.exports = { RoomDetail };