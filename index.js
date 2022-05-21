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
app.use('/api/users', require('./routes/users.router.js'));
app.use('/api/login', require('./routes/login.router.js'));



