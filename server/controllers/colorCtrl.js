const Color = require("../model/Color");
const asyncHandler = require("express-async-handler");

const createColorCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const isColorExists = await Color.findOne({ name });

  if (isColorExists) {
    throw new Error("Color already exists.");
  }

  const color = await Color.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });

  res.json({
    status: "success",
    msg: "Color created successfully.",
    color,
  });
});

const getAllColorsCtrl = asyncHandler(async (req, res) => {
  const allColors = await Color.find();

  res.json({
    status: "success",
    msg: "All colors fetched successfully.",
    allColors,
  });
});

const getSingleColorCtrl = asyncHandler(async (req, res) => {
  const singleColor = await Color.findById(req.params.id);

  res.json({
    status: "success",
    msg: "Single color fetched successfully",
    singleColor,
  });
});

const updateColorCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const updatedColor = await Color.findByIdAndUpdate(
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
    updatedColor,
  });
});

const deleteColorCtrl = asyncHandler(async (req, res) => {
  await Color.findByIdAndDelete(req.params.id);
  res.json({
    status: "success",
    msg: "Deleted successfully!",
  });
});

module.exports = {
  deleteColorCtrl,
  getSingleColorCtrl,
  updateColorCtrl,
  createColorCtrl,
  getAllColorsCtrl,
};
