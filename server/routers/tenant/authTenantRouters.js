const router = require('express').Router();
const _ = require('lodash');
const { User } = require('../../models/user');
const {authenticate} = require('../../middleware/authenticate');
const userAccess = {
    type: 'tenant'
}


/**
 * @api {post} /tenant/users Create a new user
 * @apiGroup Tenant
 * @apiSuccess {String} email email of a user
 * @apiSuccess {String} password password of a user
 * @apiSuccessExample {json} Success
 *  {
        "_id": "5b605ae2e94b2b3ceeb8a9a2",
        "email": "tenant03@gmail.com",
        "password": "$2a$10$law27VmN/F6lEASfXwgDautemw4qH5Ar9x16ejLumaz3QkhesFpXO",
        "tokens": [
            {
                "_id": "5b605ae2e94b2b3ceeb8a9a3",
                "access": "tenantAuth",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjYwNWFlMmU5NGIyYjNjZWViOGE5YTIiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMzMDQxMzc4fQ.HAQPVliyBeha1dtOABgkub8X91_eHnaTDYQCXF95_-g"
            }
        ],
        "__v": 1
    }
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    let user = new User(body);
    user.save().then((user) => {
        return user.generateAuthToken(userAccess.type);
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(404).send(e);
    });
});


/**
 * @api {post} /tenant/users/login Login system
 * @apiGroup Tenant
 * @apiSuccess {String} email email of a user
 * @apiSuccess {String} password password of a user
 * @apiSuccessExample {json} Success
 *  {
        "_id": "5b605ae2e94b2b3ceeb8a9a2",
        "email": "tenant03@gmail.com",
        "password": "$2a$10$law27VmN/F6lEASfXwgDautemw4qH5Ar9x16ejLumaz3QkhesFpXO",
        "tokens": [
            {
                "_id": "5b605ae2e94b2b3ceeb8a9a3",
                "access": "tenantAuth",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjYwNWFlMmU5NGIyYjNjZWViOGE5YTIiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMzMDQxMzc4fQ.HAQPVliyBeha1dtOABgkub8X91_eHnaTDYQCXF95_-g"
            }
        ],
        "__v": 1
    }
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.post('/users/login', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    console.log(body);
    User.findByCredentials(body.email, body.password).then((user) => {
        console.log('user: ', user);
        return user.generateAuthToken(userAccess.type).then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(401).send();
    });
});

// router.patch('/users/:id', (req, res) => {
//     let id = req.params.id;
//     let body = _.pick(req.body, ['email'])
// });


/**
 * @api {get} /tenant/users Get a current user's profile
 * @apiGroup Tenant
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccessExample {json} Success
 *  {
        "_id": "5b605ae2e94b2b3ceeb8a9a2",
        "email": "tenant03@gmail.com",
        "password": "$2a$10$law27VmN/F6lEASfXwgDautemw4qH5Ar9x16ejLumaz3QkhesFpXO",
        "tokens": [
            {
                "_id": "5b605ae2e94b2b3ceeb8a9a3",
                "access": "tenantAuth",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjYwNWFlMmU5NGIyYjNjZWViOGE5YTIiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMzMDQxMzc4fQ.HAQPVliyBeha1dtOABgkub8X91_eHnaTDYQCXF95_-g"
            }
        ],
        "__v": 1
    }
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

// logout system
/**
 * @api {delete} /tenant/users Delete a user
 * @apiGroup Tenant
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccessExample {json} Success
 *  HTTP/1.1 200 Ok
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }).catch((e) => {
        res.status(400).send();
    });
});

module.exports = router;