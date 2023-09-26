const express = require("express");
const dotenv = require("dotenv").config();
const {
  globalErrorHandler,
  invalidRoute,
} = require("../middlewares/GlobalErrorHandler.js");

const { dbConnect } = require("../config/dbConnect.js");
const { userRoute } = require("../routes/userRoute.js");
dbConnect();
const app = express();

app.use(express.json());

app.use("/api/v1/users", userRoute);

app.use(invalidRoute);

app.use(globalErrorHandler);

module.exports = app;
