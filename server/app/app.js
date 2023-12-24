const express = require("express");
require("dotenv").config();
const cors = require("cors");
const Stripe = require("stripe");
const Order = require("../model/Order.js");

const {
  globalErrorHandler,
  invalidRoute,
} = require("../middlewares/GlobalErrorHandler.js");
// const Stripe = require("stripe");

// stripe instance
// console.log(process.env.STRIPE_KEY);
// const stripe = new Stripe(process.env.STRIPE_KEY);

const { dbConnect } = require("../config/dbConnect.js");

// Routes
const { userRoute } = require("../routes/userRoute.js");
const path = require("path");
const productRouter = require("../routes/productRoute");
const { categoryRouter } = require("../routes/categoryRoute.js");
const brandRoute = require("../routes/brandRoute");
const colorRoute = require("../routes/colorRoute");
const reviewRoute = require("../routes/reviewRoute");
const orderRouter = require("../routes/orderRoute");
const couponRouter = require("../routes/couponRoute");

dbConnect();
const app = express();
app.use(cors()); // accept any request from client
// stripe instance
const stripe = new Stripe(process.env.STRIPE_KEY);
// This is your Stripe CLI webhook secret for testing your endpoint locally.

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    // console.log("test");
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        sig,
        process.env.STRIPE_ENDPOINT_SECRET
      );
      // console.log("event");
    } catch (err) {
      console.log(err.message);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const { orderId } = session.metadata;
      const paymentStatus = session.payment_status;
      const paymentMethod = session.payment_method_types[0];
      const totalAmount = session.amount_total;
      const currency = session.currency;

      // console.log(orderId, paymentStatus, paymentMethod, totalAmount, currency);
      const order = await Order.findByIdAndUpdate(
        JSON.parse(orderId),
        {
          orderTotal: totalAmount / 100,
          paymentStatus,
          paymentMethod,
          currency,
        },
        { new: true }
      );
    } else {
      return;
    }
    response.send();
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//server static files
app.use(express.static("public"));
// Home
app.get("/", (req, res) => {
  res.sendFile(path.join("public", "index.html"));
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/color", colorRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/coupons", couponRouter);

app.use(invalidRoute);

app.use(globalErrorHandler);

module.exports = app;
