const express = require("express");

const {
  createBrandCtrl,
  updateBrandCtrl,
  getAllBrandsCtrl,
  getSingleBrandCtrl,
  deleteBrandCtrl,
} = require("../controllers/brandCtrl");
const isUserLoggedIn = require("../middlewares/isUserLoggedIn");

const brandRoute = express.Router();

brandRoute.post("/", isUserLoggedIn, createBrandCtrl);
brandRoute.get("/", getAllBrandsCtrl);
brandRoute.get("/:id", getSingleBrandCtrl);
brandRoute.put("/:id/update", updateBrandCtrl);
brandRoute.delete("/:id", isUserLoggedIn, deleteBrandCtrl);

module.exports = brandRoute;
