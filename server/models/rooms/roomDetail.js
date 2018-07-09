const mongoose = require('mongoose');

let RoomDetailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
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

// model methods
RoomDetailSchema.statics.existVerify = function(name) {
    let roomDetail = this;
    return RoomDetail.findOne({name}).then((roomDetail) => {
        if (!roomDetail) {
            return Promise.resolve();
        }
        return Promise.reject('Exist')
    });
}

let RoomDetail = mongoose.model('RoomDetail', RoomDetailSchema);
module.exports = { RoomDetail };