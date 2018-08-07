const router = require('express').Router();
const { ObjectID } = require('mongodb');
const { Place } = require('../../models/places/place');
const { Room } = require('../../models/rooms/room');

router.get('/place/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Place.findById(id)
         .populate('room')
         .exec((error, place) => {
            if (error) {
                return res.status(404).send()
            }

            let url = 'http://localhost:3000/';
            place.imagePaths = place.imagePaths.map(element => url + element);
            res.send(place);
         });
});

module.exports = router;
