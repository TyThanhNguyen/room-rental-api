const router = require('express').Router();
const {Booking} = require('../../models/booking');
const {authenticate} = require('../../middleware/authenticate');


// booking items of authen tenant user
/**
 * @api {get} /tenant/booking get a list of room booking
 * @apiGroup Booking
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccessExample {json} Success
 *  [{
        "_id": "5b5997623a096d04fabd83c4",
        "placeId": {
            "imagePaths": [
                "public/images/uploads/img-1531233960958.jpeg",
                "public/images/uploads/img-1531233960959.jpeg"
            ],
            "videoPath": "",
            "room": [
                "5b44a3ab043d8f03c9dfbf0e",
                "5b44a396043d8f03c9dfbf0c"
            ],
            "facilities": [
                "Gym",
                "Bike Storage"
            ],
            "billIncluded": [
                "Vending Machines",
                "Vending Machines"
            ],
            "securityAndSafety": [
                "Secure Access",
                "Secure Access"
            ],
            "propertyRule": [
                "No Smoking",
                "No Smoking"
            ],
            "_id": "5b44c6a80b16290b3579d474",
            "created": "2018-07-10T14:46:00.971Z",
            "updated": "2018-07-10T14:46:00.971Z",
            "address": "blk 12 lorong 7 ToaPayoh, Singapore",
            "description": "nice place to stay",
            "name": "blk 12",
            "__v": 0
        },
        "roomId": {
            "roomDetails": [
                "2 bed apartments",
                "3 bed apartments"
            ],
            "_id": "5b43942c30d21c09cf010dda",
            "price": 550,
            "roomType": "shared room",
            "moveInDate": "2018-01-01T16:00:00.000Z",
            "moveOutDate": "2018-09-04T16:00:00.000Z",
            "created": "2018-07-09T16:58:20.387Z",
            "updated": "2018-07-09T16:58:20.388Z",
            "__v": 0
        },
        "userId": "5b50c911beb6e60dadde1719",
        "moveInDate": "2018-02-07T16:00:00.000Z",
        "moveOutDate": "2018-09-07T16:00:00.000Z",
        "created": "2018-07-26T09:41:54.297Z",
        "__v": 0
    }]
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.get('/booking', authenticate, (req, res) => {
    // get access type
    let access = req.user.tokens[0].access;
    // check the right to access router of auth user.
    if (access !== 'tenantAuth') {
        res.status(401).send();
    }
    let userId = req.user._id;
    console.log('userId',userId);

    Booking.findOne({userId}).populate('roomId').populate('placeId').exec((error, booking) => {
        if (error) {
            return res.status(404).send(error);
        }
        res.send(booking);
    });
});

    // Booking.find({userId}).populate('roomId').populate('placeId').exec((error, booking) => {
    //     if (error) {
    //         return res.status(404).send(error);
    //     }
    //     console.log(booking);
    //     res.send(booking);
    // });

// create a new booking for tenant user
/**
 * @api {post} /tenant/booking Create a room booking
 * @apiGroup Booking
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccess {String} placeId id of place.
 * @apiSuccess {[String]} roomId id of room.
 * @apiSuccess {Date} moveInDate date move to room
 * @apiSuccess {Date} moveOutDate date move out room
 * @apiSuccessExample {json} Success
 *  {
        "_id": "5b5997623a096d04fabd83c4",
        "placeId": {
            "imagePaths": [
                "public/images/uploads/img-1531233960958.jpeg",
                "public/images/uploads/img-1531233960959.jpeg"
            ],
            "videoPath": "",
            "room": [
                "5b44a3ab043d8f03c9dfbf0e",
                "5b44a396043d8f03c9dfbf0c"
            ],
            "facilities": [
                "Gym",
                "Bike Storage"
            ],
            "billIncluded": [
                "Vending Machines",
                "Vending Machines"
            ],
            "securityAndSafety": [
                "Secure Access",
                "Secure Access"
            ],
            "propertyRule": [
                "No Smoking",
                "No Smoking"
            ],
            "_id": "5b44c6a80b16290b3579d474",
            "created": "2018-07-10T14:46:00.971Z",
            "updated": "2018-07-10T14:46:00.971Z",
            "address": "blk 12 lorong 7 ToaPayoh, Singapore",
            "description": "nice place to stay",
            "name": "blk 12",
            "__v": 0
        },
        "roomId": {
            "roomDetails": [
                "2 bed apartments",
                "3 bed apartments"
            ],
            "_id": "5b43942c30d21c09cf010dda",
            "price": 550,
            "roomType": "shared room",
            "moveInDate": "2018-01-01T16:00:00.000Z",
            "moveOutDate": "2018-09-04T16:00:00.000Z",
            "created": "2018-07-09T16:58:20.387Z",
            "updated": "2018-07-09T16:58:20.388Z",
            "__v": 0
        },
        "userId": "5b50c911beb6e60dadde1719",
        "moveInDate": "2018-02-07T16:00:00.000Z",
        "moveOutDate": "2018-09-07T16:00:00.000Z",
        "created": "2018-07-26T09:41:54.297Z",
        "__v": 0
    }
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.post('/booking', authenticate, (req, res) => {
    // get access type
    let access = req.user.tokens[0].access;
    // check the right to access router of auth user.
    if (access !== 'tenantAuth') {
        res.status(401).send();
    }
    let placeId = req.body.placeId;
    let roomId = req.body.roomId;
    let moveInDate = req.body.moveInDate;
    let moveOutDate = req.body.moveOutDate;
    let itemsProcessed = 0;
    let booking = new Booking({
        placeId,
        roomId,
        userId: req.user._id,
        moveInDate,
        moveOutDate
    });
    console.log(booking);
    booking.save().then((booking) => {
            console.log('res :' , booking);
            res.send(booking);
    }).catch((e) => {
        res.status(400).send();
    });
});

// delete booking by tenant user
/**
 * @api {delete} /tenant/booking/:id Delete of room booking
 * @apiGroup Booking
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccess {String} placeId id of place.
 * @apiSuccess {[String]} roomId id of room.
 * @apiSuccess {Date} moveInDate date move to room
 * @apiSuccess {Date} moveOutDate date move out room
 * @apiSuccessExample {json} Success
 *  HTTP/1.1 200 Ok
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
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