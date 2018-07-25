const router = require('express').Router();
const _ = require('lodash');
const {Comment} = require('../../models/comment');
const {authenticate} = require('../../middleware/authenticate');

router.get('/comment', (req, res) => {
    Comment.find().then((comments) => {
        res.send(comments);
    }).catch((e) => {
        res.status(400).send();
    });
});

router.post('/comment', authenticate, (req, res) => {
    let placeId = req.body.placeId;
    let title = req.body.title;
    let rank = req.body.rank;
    let message = req.body.message;
    let content = {
        userId: req.user._id,
        title,
        rank,
        message
    }
    console.log('content: ', content);
    let newComment = new Comment({placeId, contents: [content]});
    console.log('new commment: ', newComment);

    Comment.findOne({placeId}).then((comment) => {
        if (!comment) {
            newComment.save().then((result) => {
                res.send(result);
            });
        } else {
            // if exist -> update comment's content
            comment.contents.push(content);
            Comment.findByIdAndUpdate(comment._id, {$set: comment}, {new: true}).then((result) => {
                res.send(result);
            });
        }
    });
});

router.delete('/comment/:commentId/:messageId', authenticate, (req, res) => {
    let commentId = req.params.commentId;
    let messageId = req.params.messageId;
    // find comment with commentId
    Comment.findById(commentId).then((comment) => {
        if (!comment) {
            res.status(404).send();
        }
        // find a comment's content which is in comment.contents list
        let contentToRemove = comment.contents.find(content => content._id.toString() === messageId);
        
        // check if that user have a right to remove content review
        if (contentToRemove.userId.toString() === req.user._id.toString()) {
            let newContents = comment.contents.filter((content) => content._id.toString() !== messageId)
            // update comment
            comment.contents = newContents
            Comment.findByIdAndUpdate(comment._id, {$set: comment}, {new: true}).then((result) => {
                res.send(result);
            });
        }
    }).catch((e) => {
        res.status(400).send();
    });
});

module.exports = router;