const router = require('express').Router();
const _ = require('lodash');
const { User } = require('../../models/user');
const {authenticate} = require('../../middleware/authenticate');
const userAccess = {
    type: 'tenant'
}

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

router.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

// logout system
router.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }).catch((e) => {
        res.status(400).send();
    });
});

module.exports = router;