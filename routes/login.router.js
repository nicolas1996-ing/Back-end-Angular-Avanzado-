const { Router } = require("express");
const { check } = require("express-validator");
const { loginUser, googleSignIn, renewToken } = require("../controllers/login.controller");
const { validateJSONWebToken } = require("../middlewares/jsonTokenValidator");
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

router.post(
  "/google",
  [
    check("token", "token is required").not().isEmpty(),
    schemaValidator,
  ],
  googleSignIn
);

router.get(
  "/renew",
  validateJSONWebToken,
  renewToken
);

module.exports = router;
