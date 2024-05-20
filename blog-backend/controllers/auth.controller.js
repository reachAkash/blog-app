const User = require("../models/user.model.js");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error.js");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  console.log(username, email, password);

  if (!(username && email && password)) {
    return next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  console.log(hashedPassword);

  try {
    await newUser.save();
    res.end("SignUp Successfull!");
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
