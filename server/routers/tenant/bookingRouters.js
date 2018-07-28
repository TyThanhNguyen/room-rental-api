const router = require('express').Router();
const {Booking} = require('../../models/booking');
const {authenticate} = require('../../middleware/authenticate');

// booking items of authen tenant user
router.get('/booking', authenticate, (req, res) => {
    // get access type
    let access = req.user.tokens[0].access;
    // check the right to access router of auth user.
    if (access !== 'tenantAuth') {
        res.status(401).send();
    }
    let userId = req.user._id;
    Booking.find({userId}).populate('roomId').populate('placeId').exec((error, booking) => {
        if (error) {
            return res.status(404).send(error);
        }
        res.send(booking);
    });
});

// create a new booking for tenant user
router.post('/booking', authenticate, (req, res) => {
    // get access type
    let access = req.user.tokens[0].access;
    // check the right to access router of auth user.
    if (access !== 'tenantAuth') {
        res.status(401).send();
    }
    let placeId = req.body.placeId;
    let roomIds = req.body.roomIds;
    let moveInDate = req.body.moveInDate;
    let moveOutDate = req.body.moveOutDate;
    let itemsProcessed = 0;
    let bookingList = [];
    roomIds.forEach(roomId => {
        let booking = new Booking({
            placeId,
            roomId,
            userId: req.user._id,
            moveInDate,
            moveOutDate
        });
        bookingList.push(booking)
        itemsProcessed++;
        booking.save().then(() => {
            if (itemsProcessed === roomIds.length) {
                res.send(bookingList);
            }
        }).catch((e) => {
            res.status(400).send();
        });
    });
});

// delete booking by tenant user
router.delete('/booking/:id', authenticate, (req, res) => {
    // get access type
    let access = req.user.tokens[0].access;
    // check the right to access router of auth user.
    if (access !== 'tenantAuth') {
        res.status(401).send();
    }
    let id = req.params.id;
    Booking.findByIdAndRemove(id).then((result) => {
        res.send(result);
    }).catch((e) => {
        res.status(400).send();
    });
});

module.exports = router;