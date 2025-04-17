const { Router } = require("express");
const userController = require("../controllers/userController");

const userRouter = Router();

userRouter.post("/", userController.registerUser);
userRouter.post("/sessions", userController.loginUser);

module.exports = userRouter;
