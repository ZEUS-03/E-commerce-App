const mongoose = require("mongoose");

const randomTxt = Math.random().toString(36).substring(7).toLocaleUpperCase();
const randomNumber = Math.floor(1000 + Math.random() * 90000);

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        type: Object,
        required: true,
      },
    ],
    shippingAddress: {
      type: Object,
      required: true,
    },
    orderNumber: {
      type: String,
      required: true,
      default: randomTxt + randomNumber,
    },
    paymentStatus: {
      type: String,
      required: true,
      default: "not paid",
    },
    orderTotal: {
      type: Number,
      default: 0.0,
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "Not specified",
    },
    currency: {
      type: String,
      default: "Not specified",
    },
    // For admin
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "processing", "shipped", "delivered"],
    },
    deliveredA: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
