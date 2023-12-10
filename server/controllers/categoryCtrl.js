const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");

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
  const category = await Category.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
    image: req?.file?.path,
  });
  res.json({
    status: "Success",
    msg: "Category created successfully!",
    category,
  });
});

// @desc get all Categories
// @route GET api/v1/category/
// @access Public

const getAllCategoriesCtrl = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  res.json({
    status: "Success",
    msg: "Categories fetched successfully!",
    categories,
  });
});

// @desc one all Categories
// @route GET api/v1/category/:id
// @access Public

const getSingleCategoryCtrl = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    throw new Error("no such category exists.");
  }

  res.json({
    status: "Success",
    msg: "category fetched successfully",
    category,
  });
});

// @desc update Category
// @route PUT api/v1/category/:id/update
// @access Admin

const updateCategoryCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    {
      new: true,
    }
  );
  res.json({
    status: "Success",
    msg: "Category updated successfully.",
    updatedCategory,
  });
});

// @desc delete Category
// @route DELETE api/v1/category/:id/delete
// @access Admin

const deleteCategoryCtrl = asyncHandler(async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ status: "Success", msg: "Category deleted successfully" });
});

module.exports = {
  createCategoryCtrl,
  getAllCategoriesCtrl,
  getSingleCategoryCtrl,
  updateCategoryCtrl,
  deleteCategoryCtrl,
};
