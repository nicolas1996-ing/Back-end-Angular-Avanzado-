const { Router } = require("express");
const { getAllInfo, getAllInfoByCollection } = require("../controllers/all.controller");
const { validateJSONWebToken } = require("../middlewares/jsonTokenValidator");

const router = Router();
router.get("/:paramSearch", validateJSONWebToken, getAllInfo);
router.get("/collection/:table/:searchTerm", validateJSONWebToken, getAllInfoByCollection);
module.exports = router
