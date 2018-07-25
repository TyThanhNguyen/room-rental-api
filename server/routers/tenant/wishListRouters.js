const router = require('express').Router();
const _ = require('lodash');
const {WishList}  = require('../../models/wishlist');
const {authenticate} = require('../../middleware/authenticate');

router.get('/wishlists', (req, res) => {
    WishList.find().then((wishlists) => {
        res.send(wishlists);
    }).catch((e) => {
        res.status(400).send();
    });
});

router.post('/wishlists', (req, res) => {
    let body = _.pick(req.body, ['userId', 'placeId']);
    let wishlist = new WishList(body);
    let userId = body.userId;
    // find one by userId
    WishList.findOne({userId}).then((result) => {
        if (!result) {
            wishlist.save().then((wishlist) => {
                res.send(wishlist);
            });
        } else {
            // find existed one in a list of placeId
            let existedId = result.placeId.find((element) => {
                return element == body.placeId;
            });
            // already exist
            if (existedId) return res.status(200).send('This place is already existed in your wishlist')
            // update wishlist
            result.placeId.push(body.placeId);
            WishList.findByIdAndUpdate(result._id, {$set: result}, {new: true}).then((newWishList) => {
                res.send(newWishList);
            });
        }
    }).catch((e) => {
        res.status(400).send();
    })
});

router.delete('/wishlists/:placeId', authenticate, (req, res) => {
    let placeId = req.params.placeId;
    let userId = req.user._id;
    WishList.findOne({userId}).then((wishlist) => {
        if (!wishlist) {
            res.status(404).send();
        }
        // get placeId which should be deleted out of list of placeId in wishlist
        let newPlaceIdList = wishlist.placeId.filter((element) => element.toString() !== placeId);
        wishlist.placeId = newPlaceIdList;
        WishList.findByIdAndUpdate(wishlist._id, {$set: wishlist}, {new: true}).then((result) => {
            if (!result) {
                res.status(404).send()
            }
            res.send(result);
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

module.exports = router;