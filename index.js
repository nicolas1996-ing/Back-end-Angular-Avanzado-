// ---------------------imports-----------------------
// ---------------------------------------------------
require("dotenv").config(); // environments
let cors = require("cors"); // connection to API
const { dbConnection } = require("./db/config"); // bd
const express = require("express"); // server 
const { logErrors, errroHandler } = require("./middlewares/errorHandler");

// -------------------others config-------------------
// ---------------------------------------------------
dbConnection(); // ORM bd

// -------------------config server-------------------
// ---------------------------------------------------
const port = process.env.PORT;
const ipv4 = " 192.168.0.5:";
const app = express(); // server
app.listen(port, () => {
  console.log(ipv4 + port);
  console.log("server run in port " + port);
});

// -------------------middleware -g-------------------
// ---------------------------------------------------
app.use(cors());
app.use(express.json());

// ------------connect with the front-end------------
app.use(express.static('public'));

app.use('/api/users', require('./routes/users.router.js'));
app.use('/api/login', require('./routes/login.router.js'));
app.use('/api/hospitals', require('./routes/hospitals.router.js'));
app.use('/api/doctors', require('./routes/doctors.router.js'));
app.use('/api/all', require('./routes/all.router.js'));
app.use('/api/uploads', require('./routes/uploads.router.js'));


// publish postman collection
// https://learning.postman.com/docs/publishing-your-api/publishing-your-docs/