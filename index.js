// Rachel Ng Jia Ying 2323530 DIT/FT/1B/05
// this file is usually given. if not can copy this
// just change the port number to what is specified in question

//////////////////////////////////////////////////////
// INCLUDES
//////////////////////////////////////////////////////
// import the app object from the app.js file
const app = require('./src/app');  // the path is important
// can put as: const app = require('.src/app.js');
// but not for npm modules or built-in modules

//////////////////////////////////////////////////////
// SETUP ENVIRONMENT
//////////////////////////////////////////////////////
const PORT = 3000; 

//////////////////////////////////////////////////////
// START SERVER
//////////////////////////////////////////////////////
app.listen(PORT, ()=> {
    console.log(`App listening to port ${PORT}`);
});