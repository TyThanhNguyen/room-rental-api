const router = require('express').Router();
const _ = require('lodash');
const { ObjectID } = require('mongodb');
const multer = require('multer');
const { College } = require('../../models/college');
const upload = require('../../utils/imageUpload');

router.get('/college', (req, res) => {
    College.find().then((colleges) => {
        colleges.forEach(college => {
            let url = 'http://localhost:3000/';
            college.imagePath = url + college.imagePath;
        })
        res.send(colleges);
    }).catch((e) => {
        res.status(400).send();
    })
});

router.post('/college', upload.any() ,(req, res) => {
    console.log('abc');
    let collegeImagePath = req.files[0].path;
    let collegeName = req.body.name;
    let collegeAddress = req.body.address;
    let college = new College({name: collegeName, imagePath: collegeImagePath, address: collegeAddress});
    College.existVerify(collegeName).then(() => {
        college.save().then((college) => {
            let url = 'http://localhost:3000/'
            college.imagePath = url + college.imagePath
            res.send(college);
        });
    }).catch((e) => {
        if (e === 'Exist') {
            res.send('This college/university is already existed');
        } else {
            res.status(400).send();
        }
    });
});

router.patch('/college/:id', upload.any(), (req, res) => {
    let id = req.params.id;
    let imagePath = req.files[0].path;
    let name = req.body.name;
    let body = {name: name, imagePath: imagePath};
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    College.findByIdAndUpdate(id, {$set: body}, {new: true}).then((college) => {
        if (!college) {
            return res.status(404).send();
        }
        res.send(college);
    }).catch((e) => {
        res.status(400).send();
    });
});

router.delete('/college/:id', (req, res) => {
    let id = req.params.id;
    College.findByIdAndRemove(id).then((college) => {
        if (!college) {
            return res.status(404).send();
        }
        res.send(college);
    }).catch((e) => {
        res.status(400).send();
    });
});

module.exports = router;
