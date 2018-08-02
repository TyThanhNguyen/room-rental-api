const {User} = require('../../models/user');
const {ObjectID} = require('mongodb'); 
const jwt = require('jsonwebtoken');
const {Facility} = require('../../models/places/facility');

const facility = [{
    _id: new ObjectID(),
    item: 'First item'
}, {
    _id: new ObjectID(),
    item: 'Second item'
}]

const populateFacilities = (done) => {
    Facility.remove({}).then(() => {
        // return BillIncluded.insertMany(billIncludeds)
        var facility01 = new Facility(facility[0]).save();
        var facility02 = new Facility(facility[1]).save();
        
        return Promise.all([facility01, facility02]);
    }).then(() => done());
}

module.exports = {facility, populateFacilities}

