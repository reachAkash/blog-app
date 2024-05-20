const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const UserRoutes = require("./routes/user.route.js");

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

app.use("/api/v1", UserRoutes);

app.listen(3000, () => {
  console.log("Server Started!");
});
