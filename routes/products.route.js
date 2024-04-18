"use strict";
const express = require("express");
const router = express.Router();

const productscontroller = require("../controllers/products.controller");

// Create a cookie for the user if it doesn't have one yet. This is used to identify them.
// If we end up using google auth, I'll eat 50 hot dogs in one sitting. 

// app.use((req, res, next) => {
//     const userId = req.cookies.userId;
//     if (!userId) {
//       const newUserId = generateUniqueUserId();
//       res.cookie('userId', newUserId, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true }); // Set maxAge for 7 days
//     }
//     next(); // Pass control to the next middleware or route
//   });

// We probably won't need this for the products router. Hi Sunny!

router.get("/all", productscontroller.getAll);
router.get("/category/:category", productscontroller.getAllByCategory);
router.get("/item/:id", productscontroller.getOneById);
router.post("/new", productscontroller.createNew);
router.get("/search", productscontroller.searchByName);
router.delete("/delete/:id", productscontroller.deleteById);
router.put("/update/:id", productscontroller.update)





module.exports = router;
