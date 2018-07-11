const router = require('express').Router();
const { ObjectID } = require('mongodb');
const _ = require('lodash');
const path = require('path');
const multer = require('multer');
const { Place } = require('../../models/places/place');
const upload = require('../../utils/imageUpload');

router.get('/places', (req, res) => {
    Place.find().then((places) => {
        res.send(places);
    }).catch((e) => {
        res.status(400).send();
    });
});

router.post('/place', upload.any(), (req, res) => {
    let imagePaths = [];
    req.files.forEach(image => {
        imagePaths.push(image.path);
    });
    let place = new Place();
    place.imagePaths = imagePaths;
    let content = req.body;
    for (let key in content) {
        place[key] = content[key];
    }

    Place.existVerify(place.address).then(() => {
        place.save().then((place) => {
            res.send(place);
        });
    }).catch((e) => {
        if (e === 'Exist') {
            res.send('A place with this address is already existed');
        } else {
            res.status(400).send();
        }
    });
});

router.patch('/place/:id', upload.any(), (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    let imagePaths = [];
    req.files.forEach(image => {
        imagePaths.push(image.path);
    });
    let newPlace = {};
    newPlace.imagePaths = imagePaths;
    let content = req.body;
    for (let key in content) {
        newPlace[key] = content[key];
    }
    Place.findByIdAndUpdate(id, {$set: newPlace}, {new: true}).then((place) => {
        if (!place) {
            return res.status(404).send();
        }
        res.send(place);
    }).catch((e) => {
        res.status(400).send();
    });
});

router.delete('/place/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid) {
        return res.status(404).send();
    }
    Place.findByIdAndRemove(id).then((place) => {
        if (!place) {
            return res.status(404).send();
        }
        res.send(place);
    }).catch((e) => {
        res.status(400).send();
    });
});

module.exports = router;