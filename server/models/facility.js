const mongoose = require('mongoose');

let FacilitySchema = new mongoose.Schema({
    item: {
        type: String,
        requied: true
    }
});

let Facility = mongoose.model('Facility', FacilitySchema);
module.exports = {Facility};