const router = require('express').Router();
const { ObjectID } = require('mongodb');
const _ = require('lodash');
const { Room } = require('../../models/rooms/room');

/**
 * @api {get} /<admin|host>/rooms Get list of rooms
 * @apiGroup Room
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccessExample {json} Success
 *  [{
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
    },]
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.get('/rooms', (req, res) => {
    Room.find().then((rooms) => {
        res.send(rooms);
    }).catch((e) => {
        res.status(400).send();
    });
});


/**
 * @api {post} /<admin|host>/room/:id Create a new room
 * @apiGroup Room
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccess {String} belongToPlace id of place.
 * @apiSuccess {Double} price price of room.
 * @apiSuccess {String} roomType type of room.
 * @apiSuccess {[String]} roomDetails detail of room.
 * @apiSuccess {Date} moveInDate move in date
 * @apiSuccess {Date} moveInDate move out date
 * @apiSuccessExample {json} Success
 *  {
        "belongToPlace": "5b438ef8f1bb560990c936e4",
        "price": 350,
        "roomType": "Single room",
        "roomDetails": ["2 bed apartments", "3 bed apartments"],
        "moveInDate": "2018/01/02",
        "moveOutDate": "2018/09/05"
    }
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.post('/room', (req, res) => {
    console.log('rooom');
    let body = _.pick(req.body, ['belongToPlace' ,'price', 'roomType', 'roomDetails', 'moveInDate', 'moveOutDate']);
    let room = new Room(body);
    room.save().then((room) => {
        res.send(room);
    }).catch((e) => {
        res.status(400).send();
    });
});

/**
 * @api {patch} /<admin|host>/room/:id Update a room
 * @apiGroup Room
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccess {String} id id of room.
 * @apiSuccess {String} belongToPlace id of room.
 * @apiSuccess {Double} price price of room.
 * @apiSuccess {String} roomType type of room.
 * @apiSuccess {[String]} roomDetails detail of room.
 * @apiSuccess {Date} moveInDate move in date
 * @apiSuccess {Date} moveInDate move out date
 * @apiSuccessExample {json} Success
 *  {
        "belongToPlace": "5b438ef8f1bb560990c936e4",
        "price": 350,
        "roomType": "Single room",
        "roomDetails": ["2 bed apartments", "3 bed apartments"],
        "moveInDate": "2018/01/02",
        "moveOutDate": "2018/09/05"
    }
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.patch('/room/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['price', 'roomType', 'roomDetails', 'moveInDate', 'moveOutDate']);
    Room.findByIdAndUpdate(id, {$set: body}, {new: true}).then((room) => {
        if (!room) {
            return res.status(404).send();
        }
        res.send(room);
    }).catch((e) => {
        res.status(400).send();
    });
});

/**
 * @api {delete} /<admin|host>/room/:id Delete a room
 * @apiGroup Room
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccess {String} id id of room.
 * @apiSuccessExample {json} Success
 *  {
        "belongToPlace": "5b438ef8f1bb560990c936e4",
        "price": 350,
        "roomType": "Single room",
        "roomDetails": ["2 bed apartments", "3 bed apartments"],
        "moveInDate": "2018/01/02",
        "moveOutDate": "2018/09/05"
    }
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
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