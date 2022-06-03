const { Router } = require("express");
const { check } = require("express-validator");
const {
  getDoctors,
  createDoctors,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctors.controller");
const { validateJSONWebToken } = require("../middlewares/jsonTokenValidator");
const { schemaValidator } = require("../middlewares/schemaValidator");
const router = Router();

router.get("/",validateJSONWebToken, getDoctors);
router.post(
  "/",
  [
    validateJSONWebToken,
    check("name", "name is required").not().isEmpty(),
    check("hospital", "hospita ID is required").not().isEmpty(),
    check("hospital", "hospital ID is not a mongo ID").isMongoId(),
    schemaValidator,
  ],
  createDoctors
);
router.patch("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);

module.exports = router;