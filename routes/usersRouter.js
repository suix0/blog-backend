const { Router } = require("express");
const usersController = require("../controllers/usersController");

const userRouters = Router();

userRouters.post("/", usersController.registerUser);
userRouters.post("/sessions", usersController.loginUser);

module.exports = userRouters;
