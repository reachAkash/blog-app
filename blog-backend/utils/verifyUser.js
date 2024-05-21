const jwt = require("jsonwebtoken");
const { errorHandler } = "./error.js";

const verifyToken = (req, res, next) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGNhZDNkYmE2YzM4NWZiZGVkZjAyNyIsImlhdCI6MTcxNjMwMTQ1NywiZXhwIjoxNzE2Mzg3ODU3fQ.CGqYT1g1LIV4Mz6tGV9Zi9ai63aVOCXvVg4BYJ4oZj8";
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

module.exports = verifyToken;
