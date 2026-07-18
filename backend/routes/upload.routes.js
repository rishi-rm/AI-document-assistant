const express = require("express");
const router = express.Router();

const upload = require("../config/multer");
const uploadController = require("../controllers/upload.controller");

router.post(
    "/",
    upload.single("pdf"),
    uploadController.uploadPDF
);

module.exports = router;