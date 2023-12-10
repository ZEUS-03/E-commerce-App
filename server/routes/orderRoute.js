const {
  createOrderCtrl,
  fetchAllOrdersCtrl,
  fetchSingleOrderCtrl,
  updateStatusCtrl,
  getOrdersStatsCtrl,
} = require("../controllers/ordersCtrl");
const express = require("express");
const isUserLoggedIn = require("../middlewares/isUserLoggedIn");

const orderRouter = express.Router();

orderRouter.post("/", isUserLoggedIn, createOrderCtrl);
orderRouter.get("/sales/stats", isUserLoggedIn, getOrdersStatsCtrl);
orderRouter.get("/", isUserLoggedIn, fetchAllOrdersCtrl);
orderRouter.get("/:orderId", isUserLoggedIn, fetchSingleOrderCtrl);
orderRouter.put("/update/:orderId", isUserLoggedIn, updateStatusCtrl);

module.exports = orderRouter;
