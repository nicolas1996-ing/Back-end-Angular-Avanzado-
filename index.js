// ---------------------imports-----------------------
// ---------------------------------------------------
require("dotenv").config(); // environments
let cors = require("cors"); // connection to API
const { dbConnection } = require("./db/config"); // bd
const express = require("express"); // server
const { logErrors, errroHandler } = require("./middlewares/errorHandler");
const path = require("path");

// -------------------others config-------------------
// ---------------------------------------------------
dbConnection(); // ORM bd

// -------------------config server-------------------
// ---------------------------------------------------
const port = process.env.PORT || 8080;
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
app.use(express.static("public"));

// routes
app.use("/api/users", require("./routes/users.router.js"));
app.use("/api/login", require("./routes/login.router.js"));
app.use("/api/hospitals", require("./routes/hospitals.router.js"));
app.use("/api/doctors", require("./routes/doctors.router.js"));
app.use("/api/all", require("./routes/all.router.js"));
app.use("/api/uploads", require("./routes/uploads.router.js"));

// solve problem about refresh app ( front-end )
app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/index.html"));
});

// publish postman collection
// https://learning.postman.com/docs/publishing-your-api/publishing-your-docs/
