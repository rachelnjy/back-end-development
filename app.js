// rachel ng jia ying 2323530 DIT/FT/1B/05
// again this file is usually given, if not copy eveything here

// initializess and configures your express application, sets up middleware, and connects routes
//////////////////////////////////////////////////////
// INCLUDES
//////////////////////////////////////////////////////
// import require module
const express = require('express');  //notice there is NO express.js


//////////////////////////////////////////////////////
// CREATE APP
//////////////////////////////////////////////////////
// create an instance of the express application
const app = express(); // outside, everyone use "app", must have this

//////////////////////////////////////////////////////
// USES
//////////////////////////////////////////////////////
// set up middelware functions
// always copy theses 2 lines if they are not given
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// These middleware functions allow us to parse incoming requests with JSON or URL-encoded payloads and make the data available in req.body.

//////////////////////////////////////////////////////
// SETUP ROUTES
//////////////////////////////////////////////////////
const mainRoutes = require('./routes/mainRoutes');
// to set root route "/" to use the mainRoutes mod for handling req
app.use("/", mainRoutes);

//////////////////////////////////////////////////////
// SETUP STATIC FILES
//////////////////////////////////////////////////////
app.use("/", express.static('public'));

//////////////////////////////////////////////////////
// EXPORT APP
//////////////////////////////////////////////////////
module.exports = app;