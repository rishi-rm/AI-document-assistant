const express = require("express");
const cors = require("cors");

const uploadRoutes = require("../routes/upload.routes");
const documentRoutes = require("../routes/document.routes");
const chatRoutes = require("../routes/chat.routes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/upload", uploadRoutes);
app.use("/documents", documentRoutes);
app.use("/chat", chatRoutes);
module.exports = app;