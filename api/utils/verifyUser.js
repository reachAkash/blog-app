const jwt = require("jsonwebtoken");
const { errorHandler } = require("../utils/error.js");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(errorHandler(404, "Unauthorized"));
  }

  const token = authHeader.split(" ")[1]; // Extract the token from the header
  if (!token) {
    return next(errorHandler(404, "Unauthorized"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized"));
    }
    req.user = user;
    next();
  });
};

module.exports = { verifyToken };
