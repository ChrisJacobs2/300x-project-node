"use strict";
const express = require("express");
const router = express.Router();

const productscontroller = require("../controllers/products.controller");

router.get("/all", productscontroller.getAll);
router.get("/category/:category", productscontroller.getAllByCategory);
router.get("/item/:id", productscontroller.getOneById);
router.post("/new", productscontroller.createNew);
router.get("/search", productscontroller.searchByName);
router.delete("/delete/:id", productscontroller.deleteById);
router.put("/update/:id", productscontroller.update)



module.exports = router;
