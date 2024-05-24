const express = require("express");
const {
  signup,
  signin,
  google,
  verifyUser,
} = require("../controllers/auth.controller.js");
const { verifyToken } = require("../utils/verifyUser.js");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.post("/verifyuser", verifyToken, verifyUser);

module.exports = router;
