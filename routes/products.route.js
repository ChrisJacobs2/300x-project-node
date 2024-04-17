"use strict";
const express = require("express");
const router = express.Router();

const productscontroller = require("../controllers/products.controller");

router.get("/all", ensureAuth, productscontroller.getAll);
router.get("/category/:category", ensureAuth, productscontroller.getAllByCategory);
router.get("/item/:id", ensureAuth, productscontroller.getOneById);
router.post("/new", ensureAuth, productscontroller.createNew);
router.get("/search", ensureAuth, productscontroller.searchByName);
router.delete("/delete/:id", ensureAuth, productscontroller.deleteById);
router.put("/update/:id", ensureAuth, productscontroller.update)

// Implement later

// function ensureAuth(req, res, next) {
//   req.session.returnTo = req.originalUrl;
//   if (!req.isAuthenticated()) {
//     return res.redirect('/auth/login');
//   }
//   //console.log("$$$$$" + req.session.returnTo)
//   next();
// }

module.exports = router;
