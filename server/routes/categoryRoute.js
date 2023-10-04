const express = require("express");
const {
  createCategoryCtrl,
  getAllCategoriesCtrl,
  getSingleCategoryCtrl,
  updateCategoryCtrl,
  deleteCategoryCtrl,
} = require("../controllers/categoryCtrl");
const isUserLoggedIn = require("../middlewares/isUserLoggedIn.js");

const categoryRouter = express.Router();

categoryRouter.post("/", isUserLoggedIn, createCategoryCtrl);
categoryRouter.get("/", getAllCategoriesCtrl);
categoryRouter.get("/:id", getSingleCategoryCtrl);
categoryRouter.put("/:id/update", isUserLoggedIn, updateCategoryCtrl);
categoryRouter.delete("/:id/delete", isUserLoggedIn, deleteCategoryCtrl);

module.exports = { categoryRouter };
