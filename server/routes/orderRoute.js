const createOrderCtrl = require("../controllers/ordersCtrl");
const express = require("express");
const isUserLoggedIn = require("../middlewares/isUserLoggedIn");

const orderRouter = express.Router();

orderRouter.post("/", isUserLoggedIn, createOrderCtrl);

module.exports = orderRouter;
