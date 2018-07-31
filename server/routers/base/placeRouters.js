const router = require('express').Router();
const { ObjectID } = require('mongodb');
const _ = require('lodash');
const path = require('path');
const multer = require('multer');
const { Place } = require('../../models/places/place');
const upload = require('../../utils/imageUpload');

/**
 * @api {get} /<admin|host>/places Get list of places
 * @apiGroup Place
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccessExample {json} Success
 *  [{
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
    },]
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.get('/places', (req, res) => {
    Place.find().then((places) => {
        res.send(places);
    }).catch((e) => {
        res.status(400).send();
    });
});

/**
 * @api {post} /<admin|host>/places Create a new place
 * @apiGroup Place
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccess {File} image place's images.
 * @apiSuccess {String} address place's address.
 * @apiSuccess {String} description place's description.
 * @apiSuccess {[String]} rooms place's room.
 * @apiSuccess {[String]} facility place's facility.
 * @apiSuccess {[String]} billIncluded place's bill included.
 * @apiSuccess {[String]} facility place's facility.
 * @apiSuccess {[String]} securityAndSafety place's security and safety.
 * @apiSuccess {[String]} propertyRule place's property rule.
 * @apiSuccessExample {json} Success
 *  {
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
    }
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.post('/place', upload.any(), (req, res) => {
    let imagePaths = [];
    req.files.forEach(image => {
        imagePaths.push(image.path);
    });
    let place = new Place();
    place.imagePaths = imagePaths;
    let content = req.body;
    for (let key in content) {
        place[key] = content[key];
    }

    Place.existVerify(place.address).then(() => {
        place.save().then((place) => {
            res.send(place);
        });
    }).catch((e) => {
        if (e === 'Exist') {
            res.send('A place with this address is already existed');
        } else {
            res.status(400).send();
        }
    });
});

/**
 * @api {patch} /<admin|host>/place/:id Update a place
 * @apiGroup Place
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccess {String} id place's id.
 * @apiSuccess {File} image place's images.
 * @apiSuccess {String} address place's address.
 * @apiSuccess {String} description place's description.
 * @apiSuccess {[String]} rooms place's room.
 * @apiSuccess {[String]} facility place's facility.
 * @apiSuccess {[String]} billIncluded place's bill included.
 * @apiSuccess {[String]} facility place's facility.
 * @apiSuccess {[String]} securityAndSafety place's security and safety.
 * @apiSuccess {[String]} propertyRule place's property rule.
 * @apiSuccessExample {json} Success
 *  {
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
    }
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.patch('/place/:id', upload.any(), (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    let imagePaths = [];
    req.files.forEach(image => {
        imagePaths.push(image.path);
    });
    let newPlace = {};
    newPlace.imagePaths = imagePaths;
    let content = req.body;
    for (let key in content) {
        newPlace[key] = content[key];
    }
    Place.findByIdAndUpdate(id, {$set: newPlace}, {new: true}).then((place) => {
        if (!place) {
            return res.status(404).send();
        }
        res.send(place);
    }).catch((e) => {
        res.status(400).send();
    });
});

/**
 * @api {delete} /<admin|host>/place/:id Delete a place
 * @apiGroup Place
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccess {String} id place's id.
 * @apiSuccessExample {json} Success
 *  {
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
    }
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.delete('/place/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid) {
        return res.status(404).send();
    }
    Place.findByIdAndRemove(id).then((place) => {
        if (!place) {
            return res.status(404).send();
        }
        res.send(place);
    }).catch((e) => {
        res.status(400).send();
    });
});

module.exports = router;