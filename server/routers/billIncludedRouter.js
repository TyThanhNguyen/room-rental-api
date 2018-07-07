const router = require('express').Router();
const { ObjectID } = require('mongodb');
const _ = require('lodash');
const { BillIncluded } = require('../models/billIncluded');

router.get('/bill-included', (req, res) => {
    BillIncluded.find().then((billIncluded) => {
        console.log(billIncluded);
        res.send(billIncluded);
    }).catch((e) => {
        res.status(400).send();
    });
});

router.post('/bill-included', (req, res) => {
    let body = _.pick(req.body, ['item']);
    let billIncluded = new BillIncluded(body);
    BillIncluded.existVerify(billIncluded.item).then(() => {
        billIncluded.save().then((billIncluded) => {
            res.send(billIncluded);
        });
    }).catch((e) => {
        if (e === 'Exist') {
            res.send('This bill included item is already existed');
        } else {
            res.status(400).send();
        }
    });
});

router.patch('/bill-included/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['item']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    BillIncluded.findByIdAndUpdate(id, {$set: body}, {new: true}).then((billIncluded) => {
        if (!billIncluded) {
            return res.status(404).send();
        }
        res.send(billIncluded);
    }).catch((e) => {
        res.status(400).send();
    });
});

router.delete('/bill-included/:id', (req, res) => {
    let id = req.params.id;
    BillIncluded.findByIdAndRemove(id).then((billIncluded) => {
        if (!billIncluded) {
            return res.status(404).send();
        }
        res.send(billIncluded);
    }).catch((e) => {
        res.status(400).send();
    });
});

module.exports = router;