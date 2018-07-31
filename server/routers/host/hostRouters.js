const router = require('express').Router();
const _ = require('lodash');
const { User } = require('../../models/user');
const {authenticate} = require('../../middleware/authenticate');
const userAccess = {
    type: 'host'
}

/**
 * @api {post} /host/users Create a new user
 * @apiGroup Host
 * @apiSuccess {String} email email of a user
 * @apiSuccess {String} password password of a user
 * @apiSuccessExample {json} Success
 *  {
        "_id": "5b60591a5ceaf73b525041ff",
        "email": "host02@gmail.com",
        "password": "$2a$10$O96wpDroGeLk54jaxOF0l.7Ep1qo9hTp0GiWmyetbt5lORPJ85s/6",
        "tokens": [
            {
                "_id": "5b60591a5ceaf73b52504200",
                "access": "hostAuth",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjYwNTkxYTVjZWFmNzNiNTI1MDQxZmYiLCJhY2Nlc3MiOiJob3N0QXV0aCIsImlhdCI6MTUzMzA0MDkyMn0.9dkoGlriIl0-A3WXKE4gs2-gBMcGmEci23Y8L18OznY"
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
 * @api {post} /host/users/login Login system
 * @apiGroup Host
 * @apiSuccess {String} email email of a user
 * @apiSuccess {String} password password of a user
 * @apiSuccessExample {json} Success
 *  {
        "_id": "5b60591a5ceaf73b525041ff",
        "email": "host02@gmail.com",
        "password": "$2a$10$O96wpDroGeLk54jaxOF0l.7Ep1qo9hTp0GiWmyetbt5lORPJ85s/6",
        "tokens": [
            {
                "_id": "5b60591a5ceaf73b52504200",
                "access": "hostAuth",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjYwNTkxYTVjZWFmNzNiNTI1MDQxZmYiLCJhY2Nlc3MiOiJob3N0QXV0aCIsImlhdCI6MTUzMzA0MDkyMn0.9dkoGlriIl0-A3WXKE4gs2-gBMcGmEci23Y8L18OznY"
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
 * @api {get} /host/users/me Get a current user's profile
 * @apiGroup Host
  * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccessExample {json} Success
 *  {
        "_id": "5b60591a5ceaf73b525041ff",
        "email": "host02@gmail.com",
        "password": "$2a$10$O96wpDroGeLk54jaxOF0l.7Ep1qo9hTp0GiWmyetbt5lORPJ85s/6",
        "tokens": [
            {
                "_id": "5b60591a5ceaf73b52504200",
                "access": "hostAuth",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjYwNTkxYTVjZWFmNzNiNTI1MDQxZmYiLCJhY2Nlc3MiOiJob3N0QXV0aCIsImlhdCI6MTUzMzA0MDkyMn0.9dkoGlriIl0-A3WXKE4gs2-gBMcGmEci23Y8L18OznY"
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
 * @api {delete} /host/users/token Logout system
 * @apiGroup Host
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK 
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