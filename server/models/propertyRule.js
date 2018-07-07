const mongoose = require('mongoose');

let PropertyRuleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
});

let PropertyRule = mongoose.model('PropertyRule', PropertyRuleSchema);
module.exports = { PropertyRule };