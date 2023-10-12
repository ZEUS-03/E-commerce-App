const express = require("express");
const isUserLoggedIn = require("../middlewares/isUserLoggedIn");

const {
  createColorCtrl,
  getSingleColorCtrl,
  deleteColorCtrl,
  getAllColorsCtrl,
  updateColorCtrl,
} = require("../controllers/colorCtrl");

const colorRouter = express.Router();

colorRouter.post("/", isUserLoggedIn, createColorCtrl);
colorRouter.get("/", getAllColorsCtrl);
colorRouter.get("/:id", getSingleColorCtrl);
colorRouter.put("/:id/update", isUserLoggedIn, updateColorCtrl);
colorRouter.delete("/:id", isUserLoggedIn, deleteColorCtrl);

module.exports = colorRouter;
