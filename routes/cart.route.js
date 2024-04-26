"use strict";
const express = require("express");
const router = express.Router();

const cartcontroller = require("../controllers/cart.controller");

  

router.get("/all", cartcontroller.getAll);
router.delete("/delete/:id", cartcontroller.deleteById);
router.put("/update/:id", cartcontroller.update);
router.delete("/checkout", cartcontroller.checkout);





module.exports = router;
