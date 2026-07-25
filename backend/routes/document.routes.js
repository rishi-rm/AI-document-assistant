const express = require("express");
const router = express.Router();

const documentController = require("../controllers/document.controller");

router.get("/", documentController.getDocuments);

module.exports = router;    