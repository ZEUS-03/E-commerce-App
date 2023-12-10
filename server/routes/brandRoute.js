const express = require("express");

const {
  createBrandCtrl,
  updateBrandCtrl,
  getAllBrandsCtrl,
  getSingleBrandCtrl,
  deleteBrandCtrl,
} = require("../controllers/brandCtrl");
const isUserLoggedIn = require("../middlewares/isUserLoggedIn");
const isAdmin = require("../middlewares/isAdmin");

const brandRoute = express.Router();

brandRoute.post("/", isUserLoggedIn, createBrandCtrl);
brandRoute.get("/", getAllBrandsCtrl);
brandRoute.get("/:id", getSingleBrandCtrl);
brandRoute.put("/:id/update", isUserLoggedIn, isAdmin, updateBrandCtrl);
brandRoute.delete("/:id", isUserLoggedIn, isAdmin, deleteBrandCtrl);

module.exports = brandRoute;
