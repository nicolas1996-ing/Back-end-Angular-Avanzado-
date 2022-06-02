const { Router } = require("express");
const { validateJSONWebToken } = require("../middlewares/jsonTokenValidator");
const { fileUploads } = require("../controllers/uploads.controller");
const fileUpload = require('express-fileupload');

const router = Router();
router.use(fileUpload());

router.put("/:type/:id", validateJSONWebToken, fileUploads);

module.exports = router;
