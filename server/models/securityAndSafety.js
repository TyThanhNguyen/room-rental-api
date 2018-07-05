const mongoose = require('mongoose');

let SecurityAndSafetySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

let SecurityAndSafety = mongoose.model('SecurityAndSafety', SecurityAndSafetySchema);
module.exports = { SecurityAndSafety };