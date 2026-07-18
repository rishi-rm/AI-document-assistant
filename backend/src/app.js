const express = require("express");
const cors = require("cors");

const uploadRoutes = require("../routes/upload.routes");
const documentRoutes = require("../routes/document.routes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/upload", uploadRoutes);
app.use("/documents", documentRoutes);
module.exports = app;