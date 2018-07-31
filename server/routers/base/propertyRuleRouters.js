const router = require('express').Router();
const { ObjectID } = require('mongodb');
const _ = require('lodash');
const { PropertyRule } = require('../../models/places/propertyRule');

/**
 * @api {get} /<admin|host>/property-rules Get a list of property rule items
 * @apiGroup Property Rules
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccessExample {json} Success
 *  {
        "_id": "5b5762671bb22d0e5c5131a8",
        "name": "no cooking",
        "created": "2018-07-24T17:31:19.648Z",
        "updated": "2018-07-24T17:31:19.648Z",
        "__v": 0
    },
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.get('/property-rules', (req, res) => {
    PropertyRule.find().then((propertyRules) => {
        res.send(propertyRules);
    }).catch((e) => {
        res.status(400).send();
    });
});


/**
 * @api {post} /<admin|host>/property-rule Create a new property rule item
 * @apiGroup Property Rules
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccess {String} item name of property rule item.
 * @apiSuccessExample {json} Success
 *  {
        "_id": "5b5762671bb22d0e5c5131a8",
        "name": "no cooking",
        "created": "2018-07-24T17:31:19.648Z",
        "updated": "2018-07-24T17:31:19.648Z",
        "__v": 0
    },
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.post('/property-rule', (req, res) => {
    let body = _.pick(req.body, ['name']);
    let propertyRule = new PropertyRule(body);
    PropertyRule.existVerify(propertyRule.name).then(() => {
        propertyRule.save().then((propertyRule) => {
            res.send(propertyRule);
        });
    }).catch((e) => {
        if (e === 'Exist') {
            res.send('This property rule is already existed');
        } else {
            res.status(400).send();
        }
    });
});


/**
 * @api {patch} /<admin|host>/property-rule/:id Update a property rule item
 * @apiGroup Property Rules
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccess {String} id id of property rule item.
 * @apiSuccess {String} item name of property rule item.
 * @apiSuccessExample {json} Success
 *  {
        "_id": "5b5762671bb22d0e5c5131a8",
        "name": "no cooking",
        "created": "2018-07-24T17:31:19.648Z",
        "updated": "2018-07-24T17:31:19.648Z",
        "__v": 0
    },
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.patch('/property-rule/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    PropertyRule.findByIdAndUpdate(id, {$set: body}, {new: true}).then((propertyRule) => {
        if (!propertyRule) {
            return res.status(404).send();
        }
        res.send(propertyRule);
    }).catch((e) => {
        res.status(400).send();
    });
});


/**
 * @api {delete} /<admin|host>/property-rule/:id Delete a property rule item
 * @apiGroup Property Rules
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccess {String} id id of property rule item.
 * @apiSuccessExample {json} Success
 *  {
        "_id": "5b5762671bb22d0e5c5131a8",
        "name": "no cooking",
        "created": "2018-07-24T17:31:19.648Z",
        "updated": "2018-07-24T17:31:19.648Z",
        "__v": 0
    },
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.delete('/property-rule/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    PropertyRule.findByIdAndRemove(id).then((propertyRule) => {
        if (!propertyRule) {
            return res.status(404).send();
        }
        res.send(propertyRule);
    }).catch((e) => {
        res.status(400).send();
    });
});

module.exports = router;