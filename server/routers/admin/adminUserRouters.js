const router = require('express').Router();
const _ = require('lodash');
const { User } = require('../../models/user');
const {authenticate} = require('../../middleware/authenticate');
const userAccess = {
    type: 'admin'
}

/**
 * @api {get} /admin/users Get list the users (Tenant and Host)
 * @apiGroup Admin
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccess {String} id User's id.
 * @apiSuccess {String} email User's email.
 * @apiSuccess {String} password Hashed password.
 * @apiSuccess {[Object]} tokens User's token for authentication and authorization.
 * @apiSuccessExample {json} Success
 *  [{
        "_id": "5b50c911beb6e60dadde1719",
        "email": "tenant01@gmail.com",
        "password": "$2a$10$/r/4J9VmOMEunwGMJTKvZ.8x9I1HiNgm3DevyBiZg8um26izS04lW",
        "tokens": [
            {
                "_id": "5b59812a86973f15097fc12f",
                "access": "tenantAuth",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"
            }
        ],
        "__v": 7
    },]
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.get('/users', (req, res) => {
    User.find().then((users) => {
        res.send(users);
    }).catch((e) => {
        res.status(400).send();
    });
});

// create a user with token generation which will be attached to the header of http response
/**
 * @api {post} /admin/users Create a new user
 * @apiGroup Admin
 * @apiSuccess {String} email User's email.
 * @apiSuccess {String} password User's password.
 * @apiSuccessExample {json} Success
 *  {
        "_id": "5b601ea4157de124bbe616d3",
        "email": "admin03@gmail.com",
        "password": "$2a$10$4vFgrZje0cTiDFLGNCd3POy5OD2dM60aPJVlMCmkM46kM5NfhMRS6",
        "tokens": [
            {
                "_id": "5b601ea4157de124bbe616d4",
                "access": "adminAuth",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjYwMWVhNDE1N2RlMTI0YmJlNjE2ZDMiLCJhY2Nlc3MiOiJhZG1pbkF1dGgiLCJpYXQiOjE1MzMwMjU5NTZ9.hNECFM4UNSNlKdZN57Wj4l-AopWraBssByvqIsoa8Ug"
            }
        ],
        "__v": 1
    }
 * @apiErrorExample {json} List error
 *     HTTP/1.1 404 NotFound Error
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
 * @api {post} /admin/users/login Admin Login
 * @apiGroup Admin
 * @apiSuccess {String} email User's email.
 * @apiSuccess {String} password User's password.
 * @apiSuccessExample {json} Success
 *  {
        "_id": "5b601ea4157de124bbe616d3",
        "email": "admin03@gmail.com",
        "password": "$2a$10$4vFgrZje0cTiDFLGNCd3POy5OD2dM60aPJVlMCmkM46kM5NfhMRS6",
        "tokens": [
            {
                "_id": "5b601ea4157de124bbe616d4",
                "access": "adminAuth",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjYwMWVhNDE1N2RlMTI0YmJlNjE2ZDMiLCJhY2Nlc3MiOiJhZG1pbkF1dGgiLCJpYXQiOjE1MzMwMjU5NTZ9.hNECFM4UNSNlKdZN57Wj4l-AopWraBssByvqIsoa8Ug"
            },
        ],
        "__v": 2
    }
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.post('/users/login', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken(userAccess.type).then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(401).send();
    });
});

router.get('/users/me', authenticate, (req, res) => {
    console.log(req.user);
    res.send(req.user);
});

// router.patch('/users/:id', (req, res) => {
//     let id = req.params.id;
//     let body = _.pick(req.body, ['email'])
// });

// logout system
/**
 * @api {delete} /admin/me/token Admin Logout
 * @apiGroup Admin
 * @apiHeader {String} x-auth Token of authenticated user
 * @apiHeaderExample {json} Header
 *     {"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwYzkxMWJlYjZlNjBkYWRkZTE3MTkiLCJhY2Nlc3MiOiJ0ZW5hbnRBdXRoIiwiaWF0IjoxNTMyNTkyNDI2fQ.RbfHFNuazzT3TGB_MeqvuRQSF3k1mrjxfzAUlhMOTkM"}
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * @apiErrorExample {json} List error
 *     HTTP/1.1 401 UnAuthorization Error
 */
router.delete('/users/me/token', authenticate, (req, res) => {
    console.log('req.token: ', req.token);
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }).catch((e) => {
        res.status(400).send();
    });
});

module.exports = router;