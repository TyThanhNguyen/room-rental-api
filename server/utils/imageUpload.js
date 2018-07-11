const multer = require('multer');
const path = require('path');

let upload = multer({storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'public/images/uploads');
        },
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    }),
    fileFilter: function(req, file, cb) {
        let ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return cb(res.send('Only image are allowed'), null, false);
        }
        cb(null, true);
    }
});

module.exports = upload;