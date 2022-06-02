const { Router } = require("express");
const { check } = require("express-validator");
const {
  getHospitals,
  postHospital,
  updateHospital,
  deleteHospital,
} = require("../controllers/hospitals.controller");
const { validateJSONWebToken } = require("../middlewares/jsonTokenValidator");
const { schemaValidator } = require("../middlewares/schemaValidator");
const router = Router();

router.get("/",validateJSONWebToken, getHospitals);
router.post(
  "/",
  [
    validateJSONWebToken,
    check("name", "hospital name is required").not().isEmpty(),
    schemaValidator
  ],
  postHospital
);
router.patch("/:id", updateHospital);
router.delete("/:id", deleteHospital);

module.exports = router;
