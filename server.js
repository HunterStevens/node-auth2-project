const express = require("express");

const profileRouter = require("./profile/profile-router");

const server = express();

server.use(express.json());

server.use("/api", profileRouter);

server.get("/", (req, res) => {
  res.json({ welcome: "if you have not created an account, please do so." });
});

module.exports = server;