const express = require("express");
const {
  registeredUserCtrl,
  loginUserCtrl,
  getUserProfileCtrl,
} = require("../controllers/userController.js");

const userRoute = express.Router();

userRoute.post("/register", registeredUserCtrl);
userRoute.post("/login", loginUserCtrl);
userRoute.get("/profile", getUserProfileCtrl);

module.exports = { userRoute };
