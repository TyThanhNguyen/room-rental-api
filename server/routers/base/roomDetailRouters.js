const router = require('express').Router();
const { ObjectID } = require('mongodb');
const _ = require('lodash');
const { RoomDetail } = require('../../models/rooms/roomDetail');


/**
 * @api {get} /<admin|host>/room-details Get list of room detail items
 * @apiGroup Room Details
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
    },]
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.get('/room-details', (req, res) => {
    RoomDetail.find().then((roomDetails) => {
        res.send(roomDetails);
    }).catch((e) => {
        res.status(404).send();
    });
});


/**
 * @api {post} /<admin|host>/room-detail Create a new room detail item
 * @apiGroup Room Details
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccess {String} name name of room detail item.
 * @apiSuccessExample {json} Success
 *  {
        "_id": "5b605285cea0c53472fb7e4a",
        "name": "1 bedroom apartment",
        "created": "2018-07-31T12:13:57.286Z",
        "updated": "2018-07-31T12:13:57.286Z",
        "__v": 0
    }
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.post('/room-detail', (req, res) => {
    let body = _.pick(req.body, ['name', 'description']);
    let roomDetail = new RoomDetail(body);
    // check if room-detail object is existed before save to db
    RoomDetail.existVerify(roomDetail.name).then(() => {
        roomDetail.save().then((roomDetail) => {
            res.send(roomDetail);
        });
    }).catch((e) => {
        if (e === 'Exist') {
            res.send('This room detail is already existed')
        } else {
            res.status(400).send();
        }
    });
});

/**
 * @api {delete} /<admin|host>/room-detail/:id Delete a room detail item
 * @apiGroup Room Details
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccess {id} id id of room detail item.
 * @apiSuccessExample {json} Success
 *  {
        "_id": "5b605285cea0c53472fb7e4a",
        "name": "1 bedroom apartment",
        "created": "2018-07-31T12:13:57.286Z",
        "updated": "2018-07-31T12:13:57.286Z",
        "__v": 0
    }
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.delete('/room-detail/:id', (req, res) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    RoomDetail.findByIdAndRemove(id).then((roomDetail) => {
        if(!roomDetail) {
            return res.status(404).send();
        }
        res.send(roomDetail);
    }).catch((e) => {
        res.status(400).send();
    });
});


/**
 * @api {patch} /<admin|host>/room-detail/:id Update a room detail item
 * @apiGroup Room Details
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccess {id} id id of room detail item.
 * @apiSuccessExample {json} Success
 *  {
        "_id": "5b605285cea0c53472fb7e4a",
        "name": "1 bedroom apartment",
        "created": "2018-07-31T12:13:57.286Z",
        "updated": "2018-07-31T12:13:57.286Z",
        "__v": 0
    }
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.patch('/room-detail/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'description']);
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    RoomDetail.findByIdAndUpdate(id, {$set: body}, {new: true}).then((roomDetail) => {
        if(!roomDetail) {
            return res.status(404).send();
        }
        res.send(roomDetail);
    }).catch((e) => {
        res.status(400).send();
    });
})

module.exports = router;
