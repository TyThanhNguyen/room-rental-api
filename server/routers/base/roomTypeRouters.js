const router = require('express').Router();
const { ObjectID } = require('mongodb');
const _ = require('lodash');
const { RoomType } = require('../../models/rooms/roomType');

/**
 * @api {get} /<admin|host>/room-types Get a list of room types
 * @apiGroup Room Type
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccessExample {json} Success
 *  [{
        "_id": "5b4389c0403ef408b3e585fe",
        "name": "master room",
        "description": "Enjoy the master room feeling",
        "created": "2018-07-09T16:13:52.802Z",
        "updated": "2018-07-09T16:13:52.803Z",
        "__v": 0
    }]
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.get('/room-types', (req, res) => {
    RoomType.find().then((roomTypes) => {
        res.send(roomTypes);
    }).catch((e) => {
        res.status(400).send();
    })
});

/**
 * @api {post} /<admin|host>/room-types Create a room type
 * @apiGroup Room Type
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccess {String} name name of type.
 * @apiSuccess {String} description description of type.
 * @apiSuccessExample {json} Success
 *  {
        "_id": "5b4389c0403ef408b3e585fe",
        "name": "master room",
        "description": "Enjoy the master room feeling",
        "created": "2018-07-09T16:13:52.802Z",
        "updated": "2018-07-09T16:13:52.803Z",
        "__v": 0
    }
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.post('/room-type', (req, res) => {
    let body = _.pick(req.body, ['name', 'description']);
    let roomType = new RoomType(body);
    // check if room-type object is existed before save to db
    RoomType.existVerify(roomType.name).then(() => {
        roomType.save().then((roomType) => {
            res.send(roomType);
        });
    }).catch((e) => {
        if (e === 'Exist') {
            res.send('This room type is already existed');
        } else {
            res.status(400).send();
        }
    });
});


/**
 * @api {delete} /<admin|host>/room-type/:id Delete a room type
 * @apiGroup Room Type
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccess {String} id id of room type.
 * @apiSuccess {String} description description of type.
 * @apiSuccessExample {json} Success
 *  {
        "_id": "5b4389c0403ef408b3e585fe",
        "name": "master room",
        "description": "Enjoy the master room feeling",
        "created": "2018-07-09T16:13:52.802Z",
        "updated": "2018-07-09T16:13:52.803Z",
        "__v": 0
    }
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.delete('/room-type/:id', (req, res) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    RoomType.findByIdAndRemove(id).then((roomType) => {
        if (!roomType) {
            return res.status(404).send();
        }
        res.send(roomType);
    }).catch((e) => {
        res.status(400).send();
    });
});


/**
 * @api {patch} /<admin|host>/room-type/:id Update a room type
 * @apiGroup Room Type
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccess {String} id id of room type.
 * @apiSuccess {String} name name of type.
 * @apiSuccess {String} description description of type.
 * @apiSuccessExample {json} Success
 *  {
        "_id": "5b4389c0403ef408b3e585fe",
        "name": "master room",
        "description": "Enjoy the master room feeling",
        "created": "2018-07-09T16:13:52.802Z",
        "updated": "2018-07-09T16:13:52.803Z",
        "__v": 0
    }
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.patch('/room-type/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'description']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    RoomType.findByIdAndUpdate(id, {$set: body}, {new: true}).then((roomType) => {
        if (!roomType) {
            return res.status(404).send();
        }
        res.send(roomType);
    }).catch((e) => {
        res.status(400).send();
    })
});

module.exports = router;