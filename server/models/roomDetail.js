const mongoose = require('mongoose');

let RoomDetailSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

let RoomDetail = mongoose.model('RoomDetail', RoomDetailSchema);
