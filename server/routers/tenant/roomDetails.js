const router = require('express').Router();
const { ObjectID } = require('mongodb');
const { Room } = require('');

router.get('/room/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid()) {
        return res.status(404).send();
    }
    Room.findById(id).then((room) => {
        if (!room) {
            return res.status(404).send();
        }
        res.send(room);
    }).catch((e) => {
        res.status(400).send();
    });
});

module.exports = router;