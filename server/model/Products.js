const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      ref: "Category",
      required: true,
    },
    sizes: {
      type: [String],
      enum: ["S", "M", "L", "XL", "XXL"], // Used to validate values. Only takes values that are mentioned in the array.
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    image: [
      {
        type: String,
        default: "https://placehold.co/600x400/png",
        required: true,
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    totalQty: {
      type: Number,
      required: true,
    },
    totalSold: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// Virtuals
// Getting limited stocks for a product

ProductSchema.virtual("qtyLeft").get(function () {
  let product = this;
  return product.totalQty - product.totalSold;
});

// Getting length of variable
ProductSchema.virtual("totalReviews").get(function () {
  let product = this;
  return this?.reviews?.length;
});

//getting average review on products
ProductSchema.virtual("averageRating").get(function () {
  let totalRating = 0;
  let product = this;

  product?.reviews.forEach((review) => {
    totalRating += review?.rating;
  });

  let averageRating = totalRating / product.reviews.length;
  console.log(averageRating);
  return averageRating;
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
