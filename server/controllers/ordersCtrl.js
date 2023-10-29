const Order = require("../model/Order");
const User = require("../model/User");
const asyncHandler = require("express-async-handler");
const Product = require("../model/Products");
const Stripe = require("stripe");

// stripe instance
const stripe = new Stripe(process.env.STRIPE_KEY);

const createOrderCtrl = asyncHandler(async (req, res) => {
  // 1. Find the user
  const user = await User.findById(req.userAuthId);
  if (!user?.hasShippingAddress) {
    throw new Error("Please add a shipping address!");
  }
  // 2. get the order payload(shipping address, items, totalPrice, etc.)
  const { orderItems, shippingAddress, totalPrice } = req.body;
  // 3. check if the order is not empty
  if (orderItems?.length <= 0) {
    throw new Error(`No item selected for order.`);
  }
  // 4. create order in DB
  const order = await Order.create({
    user: user?._id,
    orderItems,
    shippingAddress,
    totalPrice,
  });

  // 5. update the product quantity
  const products = await Product.find({ _id: { $in: orderItems } }); // Finding array of products in Product modal.
  orderItems.map(async (item) => {
    const product = products?.find((pitem) => {
      return pitem?._id.toString() === item?._id?.toString();
    });
    if (product) {
      product.totalSold += item.qty;
      // console.log(product);
    }
    await product.save();
  });

  // 6. make payment (Stripe)
  // restructuring orderItem object for stripe input

  const orderObject = orderItems.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
          description: item.description,
        },
        unit_amount: item.price * 100,
      },
      quantity: item?.qty,
    };
  });
  const session = await stripe.checkout.sessions.create({
    line_items: orderObject,
    mode: "payment",
    success_url: "http://localhost:5000/success",
    cancel_url: "http://localhost:5000/cancel",
  });
  // 7. Payment WebHook
  // 8. Update the user order
  user.orders.push(order?._id);
  await user.save();

  res.send({
    url: session.url,
  });
});

module.exports = createOrderCtrl;
