const routes = require('express').Router();
const {RoomType} = require('../models/roomType');
const _ = require('lodash');
const {ObjectID} = require('mongodb');

routes.get('/room-type', (req, res) => {
    RoomType.find().then((roomType) => {
        if(!roomType) {
            return res.status(404).send();
        }
        res.send(roomType);
    }).catch((e) => {
        res.status(400).send();
    })
});

routes.post('/room-type', (req, res) => {
    let body = _.pick(req.body, ['name', 'description']);
    let roomType = new RoomType(body);
    roomType.save().then((roomType) => {
        if (!roomType) {
            return res.status(404).send();
        }
        res.send(roomType);
    }).catch((e) => {
        res.status(400).send();
    })
});

routes.delete('/room-type/:id', (req, res) => {
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

routes.patch('/room-type/:id', (req, res) => {
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

module.exports = routes;