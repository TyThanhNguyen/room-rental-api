const {User} = require('../../models/user');
const {ObjectID} = require('mongodb'); 
const jwt = require('jsonwebtoken');
const {BillIncluded} = require('../../models/places/billIncluded');

const adminUserId = new ObjectID();
const hostUserId = new ObjectID();
const tenantUserId = new ObjectID();

const users = [{
    _id: adminUserId,
    email: 'admin01@gmail.com',
    password: 'admin01Pass',
    tokens: [{
        access: 'adminAuth',
        token: jwt.sign({_id: adminUserId, access: 'adminAuth'}, 'fyp2018').toString()
    }]
}, {
    _id: hostUserId,
    email: 'host01@gmail.com',
    password: 'host01Pass',
    tokens: [{
        access: 'hostAuth',
        token: jwt.sign({_id: hostUserId, access: 'hostAuth'}, 'fyp2018').toString()
    }]
}, {
    _id: tenantUserId,
    email: 'tenant01@gmail.com',
    password: 'tenant01Pass',
    tokens: [{
        access: 'tenantAuth',
        token: jwt.sign({_id: hostUserId, access: 'tenantAuth'}, 'fyp2018').toString()
    }]
}];

const billIncludeds = [{
    _id: new ObjectID(),
    item: 'First item'
}, {
    _id: new ObjectID(),
    item: 'Second item'
}]

const populateBillIncludeds = (done) => {
    BillIncluded.remove({}).then(() => {
        // return BillIncluded.insertMany(billIncludeds)
        var billIncluded01 = new BillIncluded(billIncludeds[0]).save();
        var billIncluded02 = new BillIncluded(billIncludeds[1]).save();
        
        return Promise.all([billIncluded01, billIncluded02]);
    }).then(() => done());
}

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var adminUser = new User(users[0]).save();
        var hostUser = new User(users[1]).save();
        var tenantUser = new User(users[2]).save();

        // make sure adminUser, hostUser and tenantUser has been saved before call 'then' command
        return Promise.all([adminUser, hostUser, tenantUser]);
    }).then(() => done());
}

module.exports = {users, billIncludeds, populateUsers, populateBillIncludeds}

