const Brand = require("../model/Brand");
const asyncHandler = require("express-async-handler");

const createBrandCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const isBrandExists = await Brand.findOne({ name });
  if (isBrandExists) {
    throw new Error(`Brand ${name} already exists`);
  }
  const brand = await Brand.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });

  res.json({
    status: "Success",
    msg: "Brand created successfully",
    brand,
  });
});

const updateBrandCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const updatedBrand = await Brand.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true }
  );

  res.json({
    status: "Success",
    msg: "Category updated successfully.",
    updatedBrand,
  });
});

const getAllBrandsCtrl = asyncHandler(async (req, res) => {
  const brands = await Brand.find();
  res.json({
    status: "success",
    msg: "Brands fetched Successfully",
    brands,
  });
});

const getSingleBrandCtrl = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  res.json({
    status: "success",
    msg: "Brand fetched successfully!",
    brand,
  });
});

const deleteBrandCtrl = asyncHandler(async (req, res) => {
  await Brand.findByIdAndDelete(req.params.id);

  res.json({
    status: "success",
    msg: "Brand deleted successfully.",
  });
});

module.exports = {
  createBrandCtrl,
  updateBrandCtrl,
  getAllBrandsCtrl,
  getSingleBrandCtrl,
  deleteBrandCtrl,
};
