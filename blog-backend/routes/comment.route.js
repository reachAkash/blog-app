const express = require("express");
const {
  createComment,
  getPostComments,
  likeComment,
  editComment,
} = require("../controllers/comment.controller.js");
const { verifyToken } = require("../utils/verifyUser.js");
const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getpostcomments/:postId", getPostComments);
router.put("/likecomment/:commentId", verifyToken, likeComment);
router.put("/editcomment/:commentId", verifyToken, editComment);

module.exports = router;
