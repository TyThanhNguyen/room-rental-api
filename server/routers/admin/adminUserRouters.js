const router = require('express').Router();
const _ = require('lodash');
const { User } = require('../../models/user');
const {authenticate} = require('../../middleware/authenticate');
const userAccess = {
    type: 'admin'
}

router.get('/users', (req, res) => {
    User.find().then((users) => {
        res.send(users);
    }).catch((e) => {
        res.status(400).send();
    });
});

// create a user with token generation which will be attached to the header of http response
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
router.delete('/users/me/token', authenticate, (req, res) => {
    console.log('req.token: ', req.token);
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }).catch((e) => {
        res.status(400).send();
    });
});

module.exports = router;