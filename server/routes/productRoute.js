const express = require("express");
const {
  createProductCtrl,
  allProducts,
  getSingleProductCtrl,
  updateProductCtrl,
  deleteProductCtrl,
} = require("../controllers/productCtrl");
const upload = require("../config/filesUpload");
const isUserLoggedIn = require("../middlewares/isUserLoggedIn");
const isAdmin = require("../middlewares/isAdmin");

const productRouter = express.Router();

productRouter.post(
  "/",
  isUserLoggedIn,
  isAdmin,
  upload.array("files"),
  createProductCtrl
);
productRouter.get("/", allProducts);
productRouter.get("/:id", getSingleProductCtrl);
productRouter.put("/:id/update", isUserLoggedIn, isAdmin, updateProductCtrl);
productRouter.delete("/:id/delete", isUserLoggedIn, isAdmin, deleteProductCtrl);

module.exports = productRouter;
