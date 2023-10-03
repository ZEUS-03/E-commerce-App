const asyncHandler = require("express-async-handler");
const { Category } = require("../model/Category");

// @desc Creates a new Category
// @route POST api/v1/category/
// @access Admin

const createCategoryCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;
  //categroy exists or not
  const isCategoryExists = await Category.findOne({ name });
  if (isCategoryExists) {
    throw new Error(`Category ${name} already exists`);
  }
  // create new category if it doesn't already exist
  const category = await Category.create({ name, user: req.userAuthId });
  res.json({
    status: "Success",
    msg: "Category created successfully!",
    category,
  });
});

module.exports = { createCategoryCtrl };
