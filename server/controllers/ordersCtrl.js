const Order = require("../model/Order");
const asyncHandler = require("express-async-handler");

const createOrderCtrl = asyncHandler(async (req, res) => {
  res.json({
    msg: "Order created successfully!",
  });
});

module.exports = createOrderCtrl;
