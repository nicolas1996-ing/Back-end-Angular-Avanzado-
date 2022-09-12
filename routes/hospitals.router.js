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

router.get("/", validateJSONWebToken, getHospitals);
router.post(
  "/",
  [
    validateJSONWebToken,
    check("name", "hospital name is required").not().isEmpty(),
    schemaValidator,
  ],
  postHospital
);
router.patch(
  "/:id",
  [validateJSONWebToken, check("name", "name is required"), schemaValidator],
  updateHospital
);
router.delete("/:id",validateJSONWebToken, deleteHospital);

module.exports = router;
