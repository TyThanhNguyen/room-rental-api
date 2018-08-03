const router = require('express').Router();
const { ObjectID } = require('mongodb');
const _ = require('lodash');
const { College } = require('../../models/rooms/room');

router.post('/search/', (req, res) => {
    let searchText = _.pick(req.body, ["searchText"]);
    College.find()
});

module.exports = router;