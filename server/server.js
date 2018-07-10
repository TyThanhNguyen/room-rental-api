require('./config/config');
require('./db/mongoose');

const express = require('express');
const bodyParser = require('body-parser');
const roomTypeRouters = require('./routers/base/roomTypeRouters');
const roomDetailRouters = require('./routers/base/roomDetailRouters');
const facilityRouters = require('./routers/base/facilityRouters');
const billIncludedRouters = require('./routers/base/billIncludedRouters');
const placeRouters = require('./routers/base/placeRouters');
const propertyRuleRouters = require('./routers/base/propertyRuleRouters');
const securityAndSafetyRouters = require('./routers/base/securityAndSafetyRouters');
const roomRouters = require('./routers/base/roomRouters');
const placeListRouters = require('./routers/tenant/placeListRouters');
const placeDetailsRouters = require('./routers/tenant/placeDetailsRouters');


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
app.use('/admin', placeRouters);
app.use('/admin', propertyRuleRouters);
app.use('/admin', securityAndSafetyRouters);
app.use('/admin', roomRouters);

// host routers
app.use('/host', roomTypeRouters);
app.use('/host', roomDetailRouters);
app.use('/host', facilityRouters);
app.use('/host', billIncludedRouters);
app.use('/host', placeRouters);
app.use('/host', propertyRuleRouters);
app.use('/host', securityAndSafetyRouters);
app.use('/host', roomRouters);

// tenant routers
app.use('/', placeListRouters);
app.use('/', placeDetailsRouters);

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}/`);
});