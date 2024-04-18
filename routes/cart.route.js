"use strict";
const express = require("express");
const router = express.Router();

const cartcontroller = require("../controllers/cart.controller");

  

router.get("/all/:id", cartcontroller.getAllById);
router.post("/new", cartcontroller.createNew);
router.delete("/delete/:id", cartcontroller.deleteById);
router.put("/update/:id", cartcontroller.update)





module.exports = router;
