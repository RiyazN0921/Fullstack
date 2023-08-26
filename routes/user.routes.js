const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user.controllers');

userRouter.post("/api/signup", userController.signup);
userRouter.post("/api/login", userController.login);
userRouter.get("/api/getusername", userController.getUserName);

module.exports = userRouter;