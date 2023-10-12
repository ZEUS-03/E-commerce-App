const express = require("express");
const dotenv = require("dotenv").config();
const {
  globalErrorHandler,
  invalidRoute,
} = require("../middlewares/GlobalErrorHandler.js");

const { dbConnect } = require("../config/dbConnect.js");

// Routes
const { userRoute } = require("../routes/userRoute.js");
const productRouter = require("../routes/productRoute");
const { categoryRouter } = require("../routes/categoryRoute.js");
const brandRoute = require("../routes/brandRoute");
const colorRoute = require("../routes/colorRoute");
const reviewRoute = require("../routes/reviewRoute");

dbConnect();
const app = express();

app.use(express.json());

app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/color", colorRoute);
app.use("/api/v1/review", reviewRoute);

app.use(invalidRoute);

app.use(globalErrorHandler);

module.exports = app;
