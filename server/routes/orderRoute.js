const {
  createOrderCtrl,
  fetchAllOrdersCtrl,
  fetchSingleOrderCtrl,
  updateStatusCtrl,
} = require("../controllers/ordersCtrl");
const express = require("express");
const isUserLoggedIn = require("../middlewares/isUserLoggedIn");

const orderRouter = express.Router();

orderRouter.post("/", isUserLoggedIn, createOrderCtrl);
orderRouter.get("/", isUserLoggedIn, fetchAllOrdersCtrl);
orderRouter.get("/:orderId", isUserLoggedIn, fetchSingleOrderCtrl);
orderRouter.put("/update/:orderId", isUserLoggedIn, updateStatusCtrl);

module.exports = orderRouter;
