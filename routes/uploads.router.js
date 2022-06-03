const { Router } = require("express");
const { validateJSONWebToken } = require("../middlewares/jsonTokenValidator");
const { fileUploads, showImage } = require("../controllers/uploads.controller");
const fileUpload = require('express-fileupload');

const router = Router();
router.use(fileUpload());

router.put("/:type/:id", validateJSONWebToken, fileUploads);
router.get("/:type/:urlImg", showImage)

module.exports = router;
