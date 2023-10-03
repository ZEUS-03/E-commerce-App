const express = require("express");
const {
  createProductCtrl,
  allProducts,
  getSingleProductCtrl,
  updateProductCtrl,
  deleteProductCtrl,
} = require("../controllers/productCtrl");
const isUserLoggedIn = require("../middlewares/isUserLoggedIn");

const productRouter = express.Router();

productRouter.post("/", isUserLoggedIn, createProductCtrl);
productRouter.get("/", allProducts);
productRouter.get("/:id", getSingleProductCtrl);
productRouter.put("/:id/update", isUserLoggedIn, updateProductCtrl);
productRouter.delete("/:id/delete", isUserLoggedIn, deleteProductCtrl);

module.exports = productRouter;
