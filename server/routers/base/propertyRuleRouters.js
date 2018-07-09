const router = require('express').Router();
const { ObjectID } = require('mongodb');
const _ = require('lodash');
const { PropertyRule } = require('../../models/places/propertyRule');

router.get('/property-rules', (req, res) => {
    PropertyRule.find().then((propertyRules) => {
        res.send(propertyRules);
    }).catch((e) => {
        res.status(400).send();
    });
});

router.post('/property-rule', (req, res) => {
    let body = _.pick(req.body, ['name']);
    let propertyRule = new PropertyRule(body);
    PropertyRule.existVerify(propertyRule.name).then(() => {
        propertyRule.save().then((propertyRule) => {
            res.send(propertyRule);
        });
    }).catch((e) => {
        if (e === 'Exist') {
            res.send('This property rule is already existed');
        } else {
            res.status(400).send();
        }
    });
});

router.patch('/property-rule/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    PropertyRule.findByIdAndUpdate(id, {$set: body}, {new: true}).then((propertyRule) => {
        if (!propertyRule) {
            return res.status(404).send();
        }
        res.send(propertyRule);
    }).catch((e) => {
        res.status(400).send();
    });
});

router.delete('/property-rule/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    PropertyRule.findByIdAndRemove(id).then((propertyRule) => {
        if (!propertyRule) {
            return res.status(404).send();
        }
        res.send(propertyRule);
    }).catch((e) => {
        res.status(400).send();
    });
});

module.exports = router;