const Product = require("../model/Products");
const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");
const Brand = require("../model/Brand");

// @desc  Create new product
// @route POST /api/v1/products
// @access Private/Admin

const createProductCtrl = asyncHandler(async (req, res) => {
  const files = req.files;

  const { name, description, category, sizes, colors, price, totalQty, brand } =
    req.body;

  const categoryFound = await Category.findOne({ name: category });

  if (!categoryFound) {
    throw new Error("Category does not exits!");
  }

  // brand Exists or not
  const brandFound = await Brand.findOne({ name: brand });

  if (!brandFound) {
    throw new Error(
      "Brand does not exists! Please create brand first or check brand name."
    );
  }

  //product Exists or not

  const productExists = await Product.findOne({ name });
  if (productExists) {
    throw new Error(`Product ${name} already exists`);
  }

  // Extracting files links out of the file object
  let image;
  if (files) {
    image = files.map((element) => {
      return element.path;
    });
  }
  // create product
  const product = await Product.create({
    name,
    description,
    category,
    sizes,
    colors,
    user: req.userAuthId,
    price,
    totalQty,
    brand,
    image,
  });
  // Push product into category
  categoryFound.products.push(product._id);
  await categoryFound.save();

  //Push product into Brand
  brandFound.products.push(product._id);
  await brandFound.save();

  // See response
  res.json({
    status: "success",
    msg: "product created successfully",
    product: product,
  });
});

// Get all products
const allProducts = asyncHandler(async (req, res) => {
  // Query : whenever we use await and method on mongodb query,
  // we cannot further process any more action on the query.
  // So we perform this operation in end.

  let productQuery = Product.find();

  // Product filter by name
  // we use query string i.e. the optional string after ? in URL

  if (req.query.name) {
    /** Searching if URL contains name property */
    productQuery = productQuery.find({
      name: { $regex: req.query.name, $options: "i" },
    });
  }

  // Product filter by brand

  if (req.query.brand) {
    productQuery = productQuery.find({
      brand: { $regex: req.query.brand, $options: "i" },
    });
  }

  // Product filter by category
  if (req.query.category) {
    productQuery = productQuery.find({
      category: { $regex: req.query.category, $options: "i" },
    });
  }

  // Product filter by color
  if (req.query.colors) {
    productQuery = productQuery.find({
      colors: { $regex: req.query.colors, $options: "i" },
    });
  }

  // Product filter by sizes
  if (req.query.sizes) {
    productQuery = productQuery.find({
      sizes: { $regex: req.query.sizes, $options: "i" },
    });
  }

  // Product filter by Price
  if (req.query.price) {
    const priceRange = req.query.price.split("-");

    // $gte = greater or equal
    // $lte = less than or equal
    productQuery = productQuery.find({
      price: { $gte: priceRange[0], $lte: priceRange[1] },
    });
  }

  // Products pagination
  // Page
  const page = parseInt(req.query.page) || 1;

  // Limit
  const limit = parseInt(req.query.limit) || 10;

  // Start Index
  const startIndex = (page - 1) * limit;

  // End Index
  const endIndex = page * limit;

  // Total products
  const total = await Product.countDocuments();

  productQuery = productQuery.skip(startIndex).limit(limit);

  // Pagination
  const pagination = {};

  if (endIndex > total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  const products = await productQuery.populate("reviews");

  res.json({
    status: "success",
    total,
    results: products.length,
    pagination,
    msg: "Products fetched successfully!",
    products,
  });
});

// @desc Get single product
// @route GET api/v1/products/:id
// @access public
const getSingleProductCtrl = asyncHandler(async (req, res) => {
  // console.log(req.params);
  const product = await Product.findById(req.params.id).populate("reviews");

  if (!product) {
    throw new Error("Product not found!");
  }
  res.json({
    status: "Success",
    msg: "Product fetched successfully",
    product,
  });
});

// @desc Update product
// @route api/v1/products/:id/update
// @access Admin

const updateProductCtrl = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
    brand,
  } = req.body;

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      category,
      sizes,
      colors,
      user,
      price,
      totalQty,
      brand,
    },
    {
      new: true,
    }
  );
  res.json({
    status: "success",
    message: "Product updated successfully.",
    product,
  });
});

// @desc Delete product
// @route api/v1/products/:id/delete
// @access Admin

const deleteProductCtrl = asyncHandler(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true, msg: "Product deleted successfully" });
});

module.exports = {
  createProductCtrl,
  allProducts,
  getSingleProductCtrl,
  updateProductCtrl,
  deleteProductCtrl,
};
