require('./config/config');
require('./db/mongoose');

const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT;
let app = express();
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send({name: 'nguyen', age: '29'});
});

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}/`);
});