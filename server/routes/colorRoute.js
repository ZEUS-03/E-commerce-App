const express = require("express");
const isUserLoggedIn = require("../middlewares/isUserLoggedIn");

const {
  createColorCtrl,
  getSingleColorCtrl,
  deleteColorCtrl,
  getAllColorsCtrl,
  updateColorCtrl,
} = require("../controllers/colorCtrl");

const isAdmin = require("../middlewares/isAdmin");

const colorRouter = express.Router();

colorRouter.post("/", isUserLoggedIn, isAdmin, createColorCtrl);
colorRouter.get("/", getAllColorsCtrl);
colorRouter.get("/:id", getSingleColorCtrl);
colorRouter.put("/:id/update", isUserLoggedIn, isAdmin, updateColorCtrl);
colorRouter.delete("/:id", isUserLoggedIn, isAdmin, deleteColorCtrl);

module.exports = colorRouter;
