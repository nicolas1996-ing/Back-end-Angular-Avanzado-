const { Router } = require("express");
const { check } = require("express-validator");
const {
  getDoctors,
  createDoctors,
  updateDoctor,
  deleteDoctor,
  getDoctor,
} = require("../controllers/doctors.controller");
const { validateJSONWebToken } = require("../middlewares/jsonTokenValidator");
const { schemaValidator } = require("../middlewares/schemaValidator");
const router = Router();

router.get("/", validateJSONWebToken, getDoctors);
router.get("/:id", validateJSONWebToken, getDoctor);

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
router.patch(
  "/:id",
  [
    validateJSONWebToken,
    check("name", "name is required").not().isEmpty(),
    check("hospital", "hospital Id is required").not().isEmpty(),
    schemaValidator,
  ],
  updateDoctor
);
router.delete("/:id", validateJSONWebToken, deleteDoctor);

module.exports = router;
