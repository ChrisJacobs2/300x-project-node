"use strict";
const express = require("express");
const router = express.Router();

const admincontroller = require("../controllers/admin.controller");


/* router.get("/all", productscontroller.getAll);
router.get("/category/:category", productscontroller.getAllByCategory);
router.get("/item/:id", productscontroller.getOneById); */
router.get("/add", admincontroller.renderAddProductPage);
router.post("/adminnew", admincontroller.adminCreateNew);
/* router.get("/search", productscontroller.searchByName);
router.delete("/delete/:id", productscontroller.deleteById);
router.put("/update/:id", productscontroller.update) */

module.exports = router;