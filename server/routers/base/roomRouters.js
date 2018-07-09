const router = require('express').Router();
const { ObjectID } = require('mongodb');
const _ = require('lodash');
const { Room } = require('../../models/rooms/room');

router.get('/rooms', (req, res) => {
    Room.find().then((rooms) => {
        res.send(rooms);
    }).catch((e) => {
        res.status(400).send();
    });
});

router.post('/room', (req, res) => {
    let body = _.pick(req.body, ['price', 'roomType', 'roomDetails', 'moveInDate', 'moveOutDate']);
    let room = new Room(body);
    room.save().then((room) => {
        res.send(room);
    }).catch((e) => {
        res.status(400).send();
    });
});

router.patch('/room/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['price', 'roomType', 'roomDetails', 'moveInDate', 'moveOutDate']);
    Room.findByIdAndUpdate(id, {$set: body}, {new: true}).then((room) => {
        if (!room) {
            return res.status(404).send();
        }
        res.send(room);
    }).catch((e) => {
        res.status(400).send();
    });
});

router.delete('/room/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid) {
        return res.status(404).send();
    }
    Room.findByIdAndRemove(id).then((room) => {
        if (!room) {
            return res.status(404).send();
        }
        res.send(room);
    }).catch((e) => {
        res.status(400).send();
    });
});

module.exports = router;