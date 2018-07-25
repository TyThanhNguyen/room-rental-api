const mongoose = require('mongoose');

let WishListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    placeId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place'
    }],
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

let WishList = mongoose.model('WishList', WishListSchema);
module.exports = { WishList };
