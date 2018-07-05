const mongoose = require('mongoose');

let PropertyRuleSchema = new mongoose.Schema({

});

let PropertyRule = mongoose.model('PropertyRule', PropertyRuleSchema);
module.exports = { PropertyRule };