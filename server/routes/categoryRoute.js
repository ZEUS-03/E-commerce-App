const express = require("express");
const { createCategoryCtrl } = require("../controllers/categoryCtrl");
const isUserLoggedIn = require("../middlewares/isUserLoggedIn.js");

const categoryRouter = express.Router();

categoryRouter.post("/", isUserLoggedIn, createCategoryCtrl);
// userRoute.post("/login", loginUserCtrl);
// userRoute.get("/profile", isUserLoggedIn, getUserProfileCtrl);

module.exports = { categoryRouter };
