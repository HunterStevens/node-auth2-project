const express = require("express");
const helmet = require('helmet');
const profileRouter = require("./profile/profile-router");
const cors = require('cors');
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api", profileRouter);

server.get("/", (req, res) => {
  res.json({ welcome: "if you have not created an account, please do so." });
});

module.exports = server;