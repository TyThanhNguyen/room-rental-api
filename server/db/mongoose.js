const mongoose = require('mongoose');

// mongoose keep connect to mongodb whenever a query is performed.
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

module.exports = {mongoose};