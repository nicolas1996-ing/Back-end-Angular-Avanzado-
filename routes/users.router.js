const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");
const { validateJSONWebToken } = require("../middlewares/jsonTokenValidator");
const { schemaValidator } = require("../middlewares/schemaValidator");

const router = Router();

// ---------------------routes------------------------
// ---------------------------------------------------
// http://localhost:3005/api/users/
router.get("/", validateJSONWebToken, getUsers);
router.post(
  "/",
  [
    // schema validators
    // errors are adding in the req
    check("name", "name is required").not().isEmpty(),
    check("password", "password is required").not().isEmpty(),
    check("email", "email is required").isEmail(),
    schemaValidator,
  ],
  createUser
);

router.patch(
  "/:id",
  [
    validateJSONWebToken,
    check("name", "name is required").not().isEmpty(),
    check("email", "email is required").isEmail(),
    check("role", "role is required").not().isEmpty(),
    schemaValidator,
  ],
  updateUser
);

router.delete("/:id", validateJSONWebToken, deleteUser);
module.exports = router;
