const router = require('express').Router();
const { ObjectID } = require('mongodb');
const _ = require('lodash');
const { SecurityAndSafety } = require('../../models/places/securityAndSafety');


/**
 * @api {get} /<admin|host>/security-safeties Get a list of security safeties
 * @apiGroup Security Safety
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccessExample {json} Success
 *  [{
        "_id": "5b58265eb57ca216c68a8d3e",
        "name": "ss1",
        "created": "2018-07-25T07:27:26.903Z",
        "updated": "2018-07-25T07:27:26.903Z",
        "__v": 0
    }]
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.get('/security-safeties', (req, res) => {
    SecurityAndSafety.find().then((doc) => {
        res.send(doc);
    }).catch((e) => {
        res.status(400).send();
    });
});


/**
 * @api {post} /<admin|host>/security-safeties Create a new security safeties
 * @apiGroup Security Safety
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccess {String} name name of security and safety item.
 * @apiSuccessExample {json} Success
 *  {
        "_id": "5b58265eb57ca216c68a8d3e",
        "name": "ss1",
        "created": "2018-07-25T07:27:26.903Z",
        "updated": "2018-07-25T07:27:26.903Z",
        "__v": 0
    }
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.post('/security-safety', (req, res) => {
    let body = _.pick(req.body, ['name']);
    let securityAndSafety = new SecurityAndSafety(body);
    SecurityAndSafety.existVerify(securityAndSafety.name).then(() => {
        securityAndSafety.save().then((doc) => {
            res.send(doc);
        });
    }).catch((e) => {
        if (e === 'Exist') {
            res.send('This security and safety name is already existed');
        } else {
            res.status(400).send();
        }
    })
});


/**
 * @api {patch} /<admin|host>/security-safety/:id Update a security safeties
 * @apiGroup Security Safety
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccess {String} id id of security and safety item. 
 * @apiSuccess {String} name name of security and safety item.
 * @apiSuccessExample {json} Success
 *  {
        "_id": "5b58265eb57ca216c68a8d3e",
        "name": "ss1",
        "created": "2018-07-25T07:27:26.903Z",
        "updated": "2018-07-25T07:27:26.903Z",
        "__v": 0
    }
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.patch('/security-safety/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    SecurityAndSafety.findByIdAndUpdate(id, {$set: body}, {new: true}).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((e) => {
        res.status(400).send();
    });
});


/**
 * @api {delete} /<admin|host>/security-safety/:id Get a list of security safeties
 * @apiGroup Security Safety
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccess {String} id id of security and safety item.
 * @apiSuccessExample {json} Success
 *  {
        "_id": "5b58265eb57ca216c68a8d3e",
        "name": "ss1",
        "created": "2018-07-25T07:27:26.903Z",
        "updated": "2018-07-25T07:27:26.903Z",
        "__v": 0
    }
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.delete('/security-safety/:id', (req, res) => {
    let id = req.params.id;
    SecurityAndSafety.findByIdAndRemove(id).then((doc) => {
        if(!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((e) => {
        res.status(400).send();
    });
});

module.exports = router;