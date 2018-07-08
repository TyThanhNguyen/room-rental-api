require('./config/config');
require('./db/mongoose');

const express = require('express');
const bodyParser = require('body-parser');
const roomTypeRouters = require('./routers/roomTypeRouters');
const roomDetailRouters = require('./routers/roomDetailRouters');
const facilityRouters = require('./routers/facilityRouter');
const billIncludedRouters = require('./routers/billIncludedRouter');
const propertyRuleRouters = require('./routers/propertyRuleRouter');
const securityAndSafetyRouters = require('./routers/securityAndSafety');
const roomRouters = require('./routers/roomRouter');

const port = process.env.PORT;
let app = express();
app.use(express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// admin routers
app.use('/admin', roomTypeRouters);
app.use('/admin', roomDetailRouters);
app.use('/admin', facilityRouters);
app.use('/admin', billIncludedRouters);
app.use('/admin', propertyRuleRouters);
app.use('/admin', securityAndSafetyRouters);

// host routers
app.use('/host', roomTypeRouters);
app.use('/host', roomDetailRouters);
app.use('/host', facilityRouters);
app.use('/host', billIncludedRouters);
app.use('/host', propertyRuleRouters);
app.use('/host', securityAndSafetyRouters);
app.use('/host', roomRouters);
// auth user routers


app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}/`);
});