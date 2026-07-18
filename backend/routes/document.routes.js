const express = require("express");
const router = express.Router();

const documentController = require("../controllers/document.controller");

router.get("/", documentController.getDocuments);
router.get("/:filename", documentController.getDocumentText);

module.exports = router;    