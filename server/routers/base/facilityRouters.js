const router = require('express').Router();
const { ObjectID } = require('mongodb');
const _ = require('lodash');
const { Facility } = require('../../models/places/facility');

/**
 * @api {get} /<admin|host>/facilities Get of list of facilities
 * @apiGroup Facility
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccessExample {json} Success
 *  [{
        "_id": "5b438bb8403ef408b3e58606",
        "item": "Furnished",
        "created": "2018-07-09T16:22:16.765Z",
        "updated": "2018-07-09T16:22:16.765Z",
        "__v": 0
    },]
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.get('/facilities', (req, res) => {
    Facility.find().then((facilities) => {
        res.send(facilities);
    }).catch((e) => {
        res.status(400).send();
    });
});

/**
 * @api {post} /<admin|host>/facility create a new facility
 * @apiGroup Facility
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccess {String} item name of facility item.
 * @apiSuccessExample {json} Success
 *  {
        "_id": "5b438bb8403ef408b3e58606",
        "item": "Furnished",
        "created": "2018-07-09T16:22:16.765Z",
        "updated": "2018-07-09T16:22:16.765Z",
        "__v": 0
    }
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.post('/facility', (req, res) => {
    let body = _.pick(req.body, ['item']);
    let facility = new Facility(body);
    // check if room-detail object is existed before save to db
    Facility.existVerify(facility.item).then(() => {
        facility.save().then((facility) => {
            res.send(facility);
        });
    }).catch((e) => {
        if (e === 'Exist') {
            res.send('Facility item is aleardy existed');
        } else {
            res.status(400).send();
        }
    });
});

/**
 * @api {patch} /<admin|host>/facility create a new facility
 * @apiGroup Facility
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccess {String} item name of facility item.
 * @apiSuccessExample {json} Success
 *  {
        "_id": "5b438bb8403ef408b3e58606",
        "item": "Furnished",
        "created": "2018-07-09T16:22:16.765Z",
        "updated": "2018-07-09T16:22:16.765Z",
        "__v": 0
    }
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.patch('/facility/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['item']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Facility.findByIdAndUpdate(id, {$set: body}, {new: true}).then((facility) => {
        if (!facility) {
            return res.status(404).send();
        }
        res.send(facility);
    }).catch((e) => {
        res.status(400).send();
    });
});



/**
 * @api {delete} /<admin|host>/facility Delete a new facility
 * @apiGroup Facility
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccess {String} item name of facility item.
 * @apiSuccessExample {json} Success
 *  {
        "_id": "5b438bb8403ef408b3e58606",
        "item": "Furnished",
        "created": "2018-07-09T16:22:16.765Z",
        "updated": "2018-07-09T16:22:16.765Z",
        "__v": 0
    }
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.delete('/facility/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Facility.findByIdAndRemove(id).then((facility) => {
        if (!facility) {
            return res.status(404).send();
        }
        res.send(facility);
    }).catch((e) => {
        res.status(400).send();
    });
});

module.exports = router;