const router = require('express').Router();
const { ObjectID } = require('mongodb');
const _ = require('lodash');
const { RoomType } = require('../models/roomType');

router.get('/room-type', (req, res) => {
    RoomType.find().then((roomTypes) => {
        res.send(roomTypes);
    }).catch((e) => {
        res.status(400).send();
    })
});

router.post('/room-type', (req, res) => {
    let body = _.pick(req.body, ['name', 'description']);
    let roomType = new RoomType(body);
    // check if room-type object is existed before save to db
    RoomType.existVerify(roomType.name).then(() => {
        roomType.save().then((roomType) => {
            res.send(roomType);
        });
    }).catch((e) => {
        if (e === 'Exist') {
            res.send('This room type is already existed');
        } else {
            res.status(400).send();
        }
    });
});

router.delete('/room-type/:id', (req, res) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    RoomType.findByIdAndRemove(id).then((roomType) => {
        if (!roomType) {
            return res.status(404).send();
        }
        res.send(roomType);
    }).catch((e) => {
        res.status(400).send();
    });
});

router.patch('/room-type/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'description']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    RoomType.findByIdAndUpdate(id, {$set: body}, {new: true}).then((roomType) => {
        if (!roomType) {
            return res.status(404).send();
        }
        res.send(roomType);
    }).catch((e) => {
        res.status(400).send();
    })
});

module.exports = router;