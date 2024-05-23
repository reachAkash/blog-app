const express = require("express");
const {
  signup,
  signin,
  google,
  verifyUser,
} = require("../controllers/auth.controller.js");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.post("/verifyuser", verifyUser);

module.exports = router;
