require('./config/config');
require('./db/mongoose');

const express = require('express');
const bodyParser = require('body-parser');
const roomTypeRouters = require('./routers/roomTypeRouters');
const roomDetailRouters = require('./routers/roomDetailRouters');
const facilityRouters = require('./routers/facilityRouter');
const billIncludedRouters = require('./routers/billIncludedRouter');
const propertyRuleRouters = require('./routers/propertyRuleRouter');

const port = process.env.PORT;
let app = express();
app.use(bodyParser.json());

app.use('/admin', roomTypeRouters);
app.use('/admin', roomDetailRouters);
app.use('/admin', facilityRouters);
app.use('/admin', billIncludedRouters);
app.use('/admin', propertyRuleRouters);

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}/`);
});