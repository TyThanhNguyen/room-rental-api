require('./config/config');
require('./db/mongoose');

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routers/routers');

const port = process.env.PORT;
let app = express();
app.use(bodyParser.json());

app.use('/admin', routes);
app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}/`);
});