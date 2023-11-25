const mongoose = require("mongoose");
const CouponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Virtual properties for expired coupons
CouponSchema.virtual("isExpired").get(function () {
  return this.endDate < Date.now();
});

CouponSchema.virtual("daysLeft").get(function () {
  const daysLeft =
    Math.ceil((this.endDate - Date.now()) / (1000 * 60 * 60 * 24)) +
    " " +
    "Days left";
  return daysLeft;
});

// validate
CouponSchema.pre("validate", function (next) {
  if (this.endDate < this.startDate) {
    next(new Error("Invalid end date: End date can't be before start date."));
  }
  next();
});

CouponSchema.pre("validate", function (next) {
  if (this.startDate < Date.now()) {
    next(
      new Error("Invalid start date: Start date can't be before current date.")
    );
  }
  next();
});

CouponSchema.pre("validate", function (next) {
  if (this.discount <= 0 || this.discount > 100) {
    next(
      new Error(
        "Invalid discount coupon: Coupon cannot be less than 0 or greater than 100"
      )
    );
  }
  next();
});

const Coupon = mongoose.model("Coupon", CouponSchema);

module.exports = Coupon;
