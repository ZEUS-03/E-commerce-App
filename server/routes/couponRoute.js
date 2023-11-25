const express = require("express");
const {
  createCouponCtrl,
  getAllCouponsCtrl,
} = require("../controllers/couponCtrl");
const isUserLoggedIn = require("../middlewares/isUserLoggedIn");

const couponRouter = express.Router();

couponRouter.post("/", isUserLoggedIn, createCouponCtrl);
couponRouter.get("/", getAllCouponsCtrl);

module.exports = couponRouter;
