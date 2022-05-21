const { Router } = require("express");
const { check } = require("express-validator");
const { loginUser } = require("../controllers/login.controller");
const { schemaValidator } = require("../middlewares/schemaValidator");
const router = Router();

// ---------------------routes------------------------
// ---------------------------------------------------
router.post(
  "/",
  [
    check("email", "email is required").isEmail(),
    check("password", "password is required").not().isEmpty(),
    schemaValidator,
  ],
  loginUser
);

module.exports = router;
