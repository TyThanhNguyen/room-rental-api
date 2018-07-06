const mongoose = require('mongoose');

let FacilitySchema = new mongoose.Schema({
    item: {
        type: String,
        requied: true
    }
});

// model methods
FacilitySchema.statics.existVerify = function(item) {
    let facility = this;
    return Facility.findOne({item}).then((facility) => {
        if (facility === null) {
            return Promise.resolve();
        }
        return Promise.reject('Exist');
    });
};

let Facility = mongoose.model('Facility', FacilitySchema);
module.exports = { Facility };