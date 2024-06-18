// Rachel Ng Jia Ying 2323530 DIT/FT/1B/05
// can copy eveyrthing here if needed
// pay attention to the passwod fro database
// the password is same as the root password for mysql database
require('dotenv').config(); //read .env file and set environment variables

const mysql = require('mysql2'); //do not use "mysql" which similar to "mysql2"
// do not miss out the "2" behind

const setting = {
    connectionLimit : 10, //set limit to 10 connection
    host     : process.env.DB_HOST, //get host from environment variable
    user     : process.env.DB_USER, //get user from environment variable
    password : process.env.DB_PASSWORD, //get password from environment variable
    database : process.env.DB_DATABASE, //get database from environment variable
    multipleStatements: true, //allow multiple sql statements
    dateStrings: true //return date as string instead of Date object
}

const pool = mysql.createPool(setting);

module.exports = pool;
