const router = require('express').Router();
const { ObjectID } = require('mongodb');
const _ = require('lodash');
const path = require('path');
const multer = require('multer');
const { Room } = require('../models/room');

let upload = multer({storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'public/images/uploads');
        },
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    }),
    fileFilter: function(req, file, cb) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return cb(res.send('Only images are allowed'), null, false)
        }
        cb(null, true)
    }
});

router.get('/room', (req, res) => {
    Room.find().then((rooms) => {
        res.send(rooms);
    }).catch((e) => {
        res.status(400).send();
    });
});

router.post('/room/', upload.any(), (req, res) => {
    let imagePaths = [];
    req.files.forEach(image => {
        imagePaths.push(image.path);
    });
    let room = new Room();
    room.imagePaths = imagePaths;
    let content = req.body;
    for (let key in content) {
            room[key] = content[key];
    }
    room.save().then((room) => {
        res.send(room);
    }).catch((e) => {
        res.status(400).send();
    });
});

router.patch('/room/:id', upload.any(), (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    let imagePaths = [];
    req.files.forEach(image => {
        imagePaths.push(image.path);
    });
    let newRoom = {};
    newRoom.imagePaths = imagePaths;
    let content = req.body;
    for (let key in content) {
        newRoom[key] = content[key];
    }
    Room.findByIdAndUpdate(id, {$set: newRoom}, {new: true}).then((room) => {
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