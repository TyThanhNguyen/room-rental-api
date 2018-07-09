const mongoose = require('mongoose');

let PropertyRuleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
PropertyRuleSchema.statics.existVerify = function(name) {
    let propertyRule = this;
    return PropertyRule.findOne({name}).then((propertyRule) => {
        if (!propertyRule) {
            return Promise.resolve();
        }
        return Promise.reject('Exist');
    });
}

let PropertyRule = mongoose.model('PropertyRule', PropertyRuleSchema);
module.exports = { PropertyRule };