const express = require("express");
const authRoute = require("../controllers/auth.controller.js");
const router = express.Router();

router.post("/signup", authRoute);

module.exports = router;
