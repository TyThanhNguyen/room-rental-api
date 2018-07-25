require('./config/config');
require('./db/mongoose');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
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
const collegeRouters = require('./routers/tenant/collegeRouters');
const adminUserRouter = require('./routers/admin/adminUserRouters');
const authTenantRouters = require('./routers/tenant/authTenantRouters');
const hostRouters = require('./routers/host/hostRouters');
const wishListRouters = require('./routers/tenant/wishListRouters');
const commentRouters = require('./routers/tenant/commentRouters');

const port = process.env.PORT;
let app = express();
app.use(cors());
app.use(express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.dirname(__dirname)));

// admin routers
app.use('/admin', roomTypeRouters);
app.use('/admin', roomDetailRouters);
app.use('/admin', facilityRouters);
app.use('/admin', billIncludedRouters);
app.use('/admin', placeRouters);
app.use('/admin', propertyRuleRouters);
app.use('/admin', securityAndSafetyRouters);
app.use('/admin', roomRouters);
app.use('/admin', adminUserRouter);

// host routers
app.use('/host', roomTypeRouters);
app.use('/host', roomDetailRouters);
app.use('/host', facilityRouters);
app.use('/host', billIncludedRouters);
app.use('/host', placeRouters);
app.use('/host', propertyRuleRouters);
app.use('/host', securityAndSafetyRouters);
app.use('/host', roomRouters);
app.use('/host', hostRouters);

// tenant routers
app.use('/tenant', placeListRouters);
app.use('/tenant', placeDetailsRouters);
app.use('/tenant', collegeRouters);
app.use('/tenant', authTenantRouters);
app.use('/tenant', wishListRouters);
app.use('/tenant', commentRouters);

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}/`);
});