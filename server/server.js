require('./config/config');
require('./db/mongoose');

const express = require('express');
const bodyParser = require('body-parser');
const roomTypeRouters = require('./routers/hostAndAdmin/roomTypeRouters');
const roomDetailRouters = require('./routers/hostAndAdmin/roomDetailRouters');
const facilityRouters = require('./routers/hostAndAdmin/facilityRouter');
const billIncludedRouters = require('./routers/hostAndAdmin/billIncludedRouter');
const propertyRuleRouters = require('./routers/hostAndAdmin/propertyRuleRouter');
const securityAndSafetyRouters = require('./routers/hostAndAdmin/securityAndSafety');
const roomRouters = require('./routers/hostAndAdmin/roomRouter');

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
app.use('/admin', roomRouters);

// host routers
app.use('/host', roomTypeRouters);
app.use('/host', roomDetailRouters);
app.use('/host', facilityRouters);
app.use('/host', billIncludedRouters);
app.use('/host', propertyRuleRouters);
app.use('/host', securityAndSafetyRouters);
app.use('/host', roomRouters);

// guest routers
app.use('/', roomTypeRouters);
app.use('/', roomDetailRouters);
app.use('/', facilityRouters);
app.use('/', billIncludedRouters);
app.use('/', propertyRuleRouters);
app.use('/', securityAndSafetyRouters);
app.use('/', roomRouters);

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}/`);
});