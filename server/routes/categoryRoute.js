const express = require("express");
const {
  createCategoryCtrl,
  getAllCategoriesCtrl,
  getSingleCategoryCtrl,
  updateCategoryCtrl,
  deleteCategoryCtrl,
} = require("../controllers/categoryCtrl");
const upload = require("../config/filesUpload");
const isUserLoggedIn = require("../middlewares/isUserLoggedIn.js");
const isAdmin = require("../middlewares/isAdmin.js");

const categoryRouter = express.Router();

categoryRouter.post(
  "/",
  isUserLoggedIn,
  isAdmin,
  // upload.single("file"),
  createCategoryCtrl
);
categoryRouter.get("/", getAllCategoriesCtrl);
categoryRouter.get("/:id", getSingleCategoryCtrl);
categoryRouter.put("/:id/update", isUserLoggedIn, isAdmin, updateCategoryCtrl);
categoryRouter.delete(
  "/:id/delete",
  isUserLoggedIn,
  isAdmin,
  deleteCategoryCtrl
);

module.exports = { categoryRouter };
