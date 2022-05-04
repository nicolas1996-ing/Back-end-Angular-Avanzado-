// ---------------------imports-----------------------
// ---------------------------------------------------
require("dotenv").config();
let cors = require("cors");
const { dbConnection } = require("./db/config");
const express = require("express");

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

// routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "entry point",
  });
});
