const router = require('express').Router();
const { ObjectID } = require('mongodb');
const _ = require('lodash');
const { RoomDetail } = require('../../models/roomDetail');

router.get('/room-detail', (req, res) => {
    RoomDetail.find().then((roomDetails) => {
        res.send(roomDetails);
    }).catch((e) => {
        res.status(404).send();
    });
});

router.post('/room-detail', (req, res) => {
    let body = _.pick(req.body, ['name', 'description']);
    let roomDetail = new RoomDetail(body);
    // check if room-detail object is existed before save to db
    RoomDetail.existVerify(roomDetail.name).then(() => {
        roomDetail.save().then((roomDetail) => {
            res.send(roomDetail);
        });
    }).catch((e) => {
        if (e === 'Exist') {
            res.send('This room detail is already existed')
        } else {
            res.status(400).send();
        }
    });
});

router.delete('/room-detail/:id', (req, res) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    RoomDetail.findByIdAndRemove(id).then((roomDetail) => {
        if(!roomDetail) {
            return res.status(404).send();
        }
        res.send(roomDetail);
    }).catch((e) => {
        res.status(400).send();
    });
});

router.patch('/room-detail/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'description']);
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    RoomDetail.findByIdAndUpdate(id, {$set: body}, {new: true}).then((roomDetail) => {
        if(!roomDetail) {
            return res.status(404).send();
        }
        res.send(roomDetail);
    }).catch((e) => {
        res.status(400).send();
    });
})

module.exports = router;
