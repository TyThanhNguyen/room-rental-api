const router = require('express').Router();
const { ObjectID } = require('mongodb');
const _ = require('lodash');
const { Facility } = require('../../models/places/facility');

router.get('/facilities', (req, res) => {
    Facility.find().then((facilities) => {
        res.send(facilities);
    }).catch((e) => {
        res.status(400).send();
    });
});

router.post('/facility', (req, res) => {
    let body = _.pick(req.body, ['item']);
    let facility = new Facility(body);
    // check if room-detail object is existed before save to db
    Facility.existVerify(facility.item).then(() => {
        facility.save().then((facility) => {
            res.send(facility);
        });
    }).catch((e) => {
        if (e === 'Exist') {
            res.send('Facility item is aleardy existed');
        } else {
            res.status(400).send();
        }
    });
});

router.patch('/facility/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['item']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Facility.findByIdAndUpdate(id, {$set: body}, {new: true}).then((facility) => {
        if (!facility) {
            return res.status(404).send();
        }
        res.send(facility);
    }).catch((e) => {
        res.status(400).send();
    });
});

router.delete('/facility/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Facility.findByIdAndRemove(id).then((facility) => {
        if (!facility) {
            return res.status(404).send();
        }
        res.send(facility);
    }).catch((e) => {
        res.status(400).send();
    });
});

module.exports = router;