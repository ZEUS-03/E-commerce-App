const express = require("express");
const {
  createCouponCtrl,
  getAllCouponsCtrl,
  getSingleCouponCtrl,
  updateCouponCtrl,
  deleteCouponCtrl,
} = require("../controllers/couponCtrl");
const isUserLoggedIn = require("../middlewares/isUserLoggedIn");

const couponRouter = express.Router();

couponRouter.post("/", isUserLoggedIn, createCouponCtrl);
couponRouter.get("/", getAllCouponsCtrl);
couponRouter.get("/:id", getSingleCouponCtrl);
couponRouter.put("/update/:id", isUserLoggedIn, updateCouponCtrl);
couponRouter.delete("/delete/:id", isUserLoggedIn, deleteCouponCtrl);

module.exports = couponRouter;
