const express = require("express");
const isUserLoggedIn = require("../middlewares/isUserLoggedIn");
const { createReviewCtrl } = require("../controllers/reviewCtrl");

const reviewRoute = express.Router();

reviewRoute.post("/:productId", isUserLoggedIn, createReviewCtrl);

module.exports = reviewRoute;
