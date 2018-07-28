const mongoose = require('mongoose');

let BookingSchema = new mongoose.Schema({
    placeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place'
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    moveInDate: {
        type: Date,
        required: true
    },
    moveOutDate: {
        type: Date,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

let Booking = mongoose.model('Booking', BookingSchema);
module.exports = { Booking };