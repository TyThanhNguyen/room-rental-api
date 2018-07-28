const router = require('express').Router();
const _ = require('lodash');
const {WishList}  = require('../../models/wishlist');
const {authenticate} = require('../../middleware/authenticate');

// get wishlist of auth tenant user
router.get('/wishlists', authenticate, (req, res) => {
    // get access type
    let access = req.user.tokens[0].access;
    // check the right to access router of auth user.
    if (access !== 'tenantAuth') {
        res.status(401).send();
    }

    let userId = req.user._id;
    console.log(userId);
    WishList.find({userId}).then((wishList) => {
        console.log(wishList);
        res.send(wishList);
    }).catch((e) => {
        res.status(400).send();
    });
});

// create a new wish one of auth tenant user
router.post('/wishlists', authenticate, (req, res) => {
    // get access type
    let access = req.user.tokens[0].access;
    // check the right to access router of auth user.
    if (access !== 'tenantAuth') {
        res.status(401).send();
    }

    let userId = req.user._id;
    let placeId = req.body.placeId;
    let wishlist = new WishList({userId, placeId});

    // find one by userId
    WishList.findOne({userId}).then((result) => {
        if (!result) {
            wishlist.save().then((wishlist) => {
                res.send(wishlist);
            });
        } else {
            // find existed one in a list of placeId
            let existedId = result.placeId.find((element) => {
                return element == placeId;
            });
            // already exist
            if (typeof(existedId) !== 'undefined') return res.status(200).send('This place is already existed in your wishlist')

            // update wishlist
            result.placeId.push(placeId);
            WishList.findByIdAndUpdate(result._id, {$set: result}, {new: true}).then((newWishList) => {
                res.send(newWishList);
            });
        }
    }).catch((e) => {
        res.status(400).send();
    })
});

// delete one by auth tenant
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