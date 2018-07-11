const mongoose = require('mongoose');

let CollegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    imagePath: {
        type: String,
        required: true
    }
});


CollegeSchema.statics.existVerify = function(name) {
    let college = this;
    return College.findOne({name}).then((college) => {
        if (!college) {
            return Promise.resolve();
        }
        return Promise.reject('Exist');
    });
};

let College = mongoose.model('College', CollegeSchema);
module.exports = { College };