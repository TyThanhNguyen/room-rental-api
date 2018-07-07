const mongoose = require('mongoose');

let BillIncludedSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    }
});

// model methods
BillIncludedSchema.statics.existVerify = function(item) {
    let billIncluded = this;
    return BillIncluded.findOne({item}).then((billIncluded) => {
        if(!billIncluded) {
            return Promise.resolve();
        }
        return Promise.reject('Exist');
    });
};

let BillIncluded = mongoose.model('BillIncludedSchema', BillIncludedSchema);
module.exports = { BillIncluded };