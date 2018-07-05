const mongoose = require('mongoose');

let BillIncludedSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    }
});

let BillIncluded = mongoose.model('BillIncludedSchema', BillIncludedSchema);
module.exports = {BillIncluded};