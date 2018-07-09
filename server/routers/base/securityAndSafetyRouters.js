const router = require('express').Router();
const { ObjectID } = require('mongodb');
const _ = require('lodash');
const { SecurityAndSafety } = require('../../models/places/securityAndSafety');

router.get('/security-safeties', (req, res) => {
    SecurityAndSafety.find().then((doc) => {
        res.send(doc);
    }).catch((e) => {
        res.status(400).send();
    });
});

router.post('/security-safety', (req, res) => {
    let body = _.pick(req.body, ['name']);
    let securityAndSafety = new SecurityAndSafety(body);
    SecurityAndSafety.existVerify(securityAndSafety.name).then(() => {
        securityAndSafety.save().then((doc) => {
            res.send(doc);
        });
    }).catch((e) => {
        if (e === 'Exist') {
            res.send('This security and safety name is already existed');
        } else {
            res.status(400).send();
        }
    })
});

router.patch('/security-safety/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    SecurityAndSafety.findByIdAndUpdate(id, {$set: body}, {new: true}).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((e) => {
        res.status(400).send();
    });
});

router.delete('/security-safety/:id', (req, res) => {
    let id = req.params.id;
    SecurityAndSafety.findByIdAndRemove(id).then((doc) => {
        if(!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((e) => {
        res.status(400).send();
    });
});

module.exports = router;