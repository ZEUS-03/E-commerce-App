const asyncHandler = require("express-async-handler");
const Product = require("../model/Products");
const Review = require("../model/Review");

const createReviewCtrl = asyncHandler(async (req, res) => {
  const { product, message, rating } = req.body;

  const { productId } = req.params;

  const productFound = await Product.findById(productId).populate("reviews");
  if (!productFound) {
    throw new Error("Product not found.");
  }
  //check if user already reviewed this product.
  const hasReviewed = productFound?.reviews.find((review) => {
    return review?.user.toString() === req?.userAuthId.toString();
  });

  if (hasReviewed) {
    throw new Error("you have already reviewed this product.");
  }

  //create review
  const review = await Review.create({
    message,
    rating,
    product: productFound?._id,
    user: req.userAuthId,
  });
  // Push review into the product
  productFound.reviews.push(review?._id);
  await productFound.save();

  res.status(201).json({
    status: "success",
    message: "Review created successfully.",
    productFound,
  });
});
module.exports = { createReviewCtrl };
