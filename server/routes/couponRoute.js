const express = require("express");
const {
  createCouponCtrl,
  getAllCouponsCtrl,
  getSingleCouponCtrl,
  updateCouponCtrl,
  deleteCouponCtrl,
} = require("../controllers/couponCtrl");
const isUserLoggedIn = require("../middlewares/isUserLoggedIn");
const isAdmin = require("../middlewares/isAdmin");

const couponRouter = express.Router();

couponRouter.post("/", isUserLoggedIn, isAdmin, createCouponCtrl);
couponRouter.get("/", getAllCouponsCtrl);
couponRouter.get("/:id", getSingleCouponCtrl);
couponRouter.put("/update/:id", isUserLoggedIn, isAdmin, updateCouponCtrl);
couponRouter.delete("/delete/:id", isUserLoggedIn, isAdmin, deleteCouponCtrl);

module.exports = couponRouter;
