const Coupons = require("../model/Coupons");
const asyncHandler = require("express-async-handler");
const User = require("../model/User");

// @desc Create new coupon
// @route POST /api/v1/coupons

const createCouponCtrl = asyncHandler(async (req, res) => {
  // Check if the coupon is already exists
  const { code, startDate, endDate, discount } = req.body;

  const isCodeExists = await Coupons.findOne({
    code,
  });

  if (isCodeExists) {
    throw new Error("Code already exists.");
  }
  if (isNaN(discount)) {
    throw new Error(`${discount} is not a valid Number.`);
  }
  if (endDate < startDate) {
    throw new Error("Please enter a valid endDate.");
  }

  // Create if code not exists already
  const coupon = await Coupons.create({
    code: code?.toUpperCase(),
    discount,
    startDate,
    endDate,
    user: req.userAuthId,
  });

  res.json({
    status: "success",
    msg: "Code created successfully",
    coupon,
  });
});

// @desc Get all coupons
// @route Get /api/v1/coupons

const getAllCouponsCtrl = asyncHandler(async (req, res) => {
  const coupons = await Coupons.find();
  res.json({
    status: "success",
    msg: "All coupons fetched successfully",
    coupons,
  });
});

const getSingleCouponCtrl = asyncHandler(async (req, res) => {
  const couponId = req.params.id;
  const coupon = await Coupons.findById(couponId);
  if (!coupon) {
    throw new Error("No coupon found");
  }
  res.json({
    status: "success",
    msg: "Coupon fetched successfully",
    coupon,
  });
});

const updateCouponCtrl = asyncHandler(async (req, res) => {
  const { code, startDate, endDate, discount } = req.body;
  const couponId = req.params.id;
  const coupon = await Coupons.findByIdAndUpdate(
    couponId,
    {
      code: code?.toUpperCase(),
      startDate,
      endDate,
      discount,
    },
    {
      new: true,
    }
  );
  res.json({
    status: "success",
    msg: "Coupon updated successfully",
    coupon,
  });
});

const deleteCouponCtrl = asyncHandler(async (req, res) => {
  const couponId = req.params.id;
  await Coupons.findByIdAndDelete(couponId);
  res.json({
    status: "success",
    msg: "Coupon deleted successfully.",
  });
});

module.exports = {
  createCouponCtrl,
  getAllCouponsCtrl,
  getSingleCouponCtrl,
  updateCouponCtrl,
  deleteCouponCtrl,
};
