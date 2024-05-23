const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const UserRoutes = require("./routes/user.route.js");
const AuthRoutes = require("./routes/auth.route.js");
const PostRoutes = require("./routes/post.route.js");
const CommentRoutes = require("./routes/comment.route.js");
const cookieParser = require("cookie-parser");
const path = require("path");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/user", UserRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/post", PostRoutes);
app.use("/api/comment", CommentRoutes);
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
app.listen(3000, () => {
  console.log("Server Started!");
});
