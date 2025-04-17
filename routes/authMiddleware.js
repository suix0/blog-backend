const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const isUser = asyncHandler((req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader === undefined) {
    throw new Error("Unauthorized user.");
  }

  const token = bearerHeader.split(" ")[1];

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      throw new Error("Error verifying token");
    }
    req.user = decoded.user;
  });
  next();
});

module.exports = { isUser };
