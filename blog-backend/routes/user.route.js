const express = require("express");
const userController = require("../controllers/user.controller.js");
const router = express.Router();

router.get("/", userController);

router.get("/akash", (req, res) => {
  res.end("Akash");
});

module.exports = router;
