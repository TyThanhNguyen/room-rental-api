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
RoomTypeSchema.statics.existVerify = function (name) {
    var roomType = this;
    return RoomType.findOne({name}).then((roomType) => {
        if (!roomType) {
            return Promise.resolve();
        }
        return Promise.reject('Exist');
    });
};

let RoomType = mongoose.model('RoomType', RoomTypeSchema);
module.exports = { RoomType };