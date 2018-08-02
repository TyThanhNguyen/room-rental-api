const router = require('express').Router();
const { ObjectID } = require('mongodb');
const _ = require('lodash');
const { BillIncluded } = require('../../models/places/billIncluded');

/**
 * @api {get} /<admin|host>/bill-includeds Get list of bill includes
 * @apiGroup Bill Included
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccessExample {json} Success
 *  [{
        "_id": "5b4f653da026ff06c1128d63",
        "item": "Gas",
        "created": "2018-07-18T16:05:17.742Z",
        "updated": "2018-07-18T16:05:17.742Z",
        "__v": 0
    },]
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.get('/bill-includeds', (req, res) => {
    BillIncluded.find().then((billIncludeds) => {
        res.send(billIncludeds);
    }).catch((e) => {
        res.status(400).send();
    });
});

/**
 * @api {post} /<admin|host>/bill-included Create a new bill included item
 * @apiGroup Bill Included
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccess {String} item name of bill included item.
 * @apiSuccessExample {json} Success
 *  {
        "_id": "5b4f653da026ff06c1128d63",
        "item": "Gas",
        "created": "2018-07-18T16:05:17.742Z",
        "updated": "2018-07-18T16:05:17.742Z",
        "__v": 0
    },
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.post('/bill-included', (req, res) => {
    let body = _.pick(req.body, ['item']);
    let billIncluded = new BillIncluded(body);
    BillIncluded.existVerify(billIncluded.item).then(() => {
        billIncluded.save().then((billIncluded) => {
            res.send(billIncluded);
        });
    }).catch((e) => {
        if (e === 'Exist') {
            console.log('run');
            res.send('Already existed');
        } else {
            res.status(400).send();
        }
    });
});

/**
 * @api {patch} /<admin|host>/bill-included/:id Update a bill included item
 * @apiGroup Bill Included
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccess {String} id id of bill included item.
 * @apiSuccess {String} item name of bill included item.
 * @apiSuccessExample {json} Success
 *  {
        "_id": "5b4f653da026ff06c1128d63",
        "item": "Gas",
        "created": "2018-07-18T16:05:17.742Z",
        "updated": "2018-07-18T16:05:17.742Z",
        "__v": 0
    },
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.patch('/bill-included/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['item']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    BillIncluded.findByIdAndUpdate(id, {$set: body}, {new: true}).then((billIncluded) => {
        if (!billIncluded) {
            return res.status(404).send();
        }
        res.send(billIncluded);
    }).catch((e) => {
        res.status(400).send();
    });
});

/**
 * @api {delete} /<admin|host>/bill-included/:id Delete a bill included item
 * @apiGroup Bill Included
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccess {String} id id of bill included item.
 * @apiSuccessExample {json} Success
 *  {
        "_id": "5b4f653da026ff06c1128d63",
        "item": "Gas",
        "created": "2018-07-18T16:05:17.742Z",
        "updated": "2018-07-18T16:05:17.742Z",
        "__v": 0
    },
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.delete('/bill-included/:id', (req, res) => {
    let id = req.params.id;
    BillIncluded.findByIdAndRemove(id).then((billIncluded) => {
        if (!billIncluded) {
            return res.status(404).send();
        }
        res.send(billIncluded);
    }).catch((e) => {
        res.status(400).send();
    });
});

module.exports = router;