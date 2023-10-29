const express = require("express");
const {
  registeredUserCtrl,
  loginUserCtrl,
  getUserProfileCtrl,
  updateShippingAddressCtrl,
} = require("../controllers/userController.js");
const isUserLoggedIn = require("../middlewares/isUserLoggedIn");

const userRoute = express.Router();

userRoute.post("/register", registeredUserCtrl);
userRoute.post("/login", loginUserCtrl);
userRoute.get("/profile", isUserLoggedIn, getUserProfileCtrl);
userRoute.put("/update/shipping", isUserLoggedIn, updateShippingAddressCtrl);

module.exports = { userRoute };
